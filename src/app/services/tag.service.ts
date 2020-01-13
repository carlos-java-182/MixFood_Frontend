import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Tag } from '../models/tag';
@Injectable({
  providedIn: 'root'
})
export class TagService {
  //*Variables declaration
  url:string = 'http://localhost:8080/api/tags/';

  constructor(private http: HttpClient,private _authService: AuthService) { }
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  //*Auth authorization header for private routes
  private addAuthorizationHeader()
  {
    //*Validate if exits token
    let token = this._authService.token;
    if(token != null)
    {
      return this.headers.append('Authorization', 'Bearer '+ token);
    }
    return this.headers;
  }
  
  getTrends():Observable<any>
  {
    return this.http.get(`${this.url}trendings/page/0/items/10`);
  }
  
  getTagsShort():Observable<TagShort[]>
  {
    return this.http.get<TagShort[]>(this.url+'short');
  } 

  getTagNameById(id: number):Observable<any>
  {
    return this.http.get(`${this.url}/${id}/name`).pipe(
      catchError(e => 
        {
          return throwError(e);
        })
    );
  }

  public getPages(page: number, items: number):Observable<any>
  {
    return this.http.get(`${this.url}page/${page}/items/${items}`,{headers: this.addAuthorizationHeader()});
  }

  public getPagesByTerm(page: number, items: number,term: string):Observable<any>
  {
    return this.http.get(`${this.url}page/${page}/items/${items}/term/${term}`,{headers: this.addAuthorizationHeader()});
  }

  public create(ingredient: Tag):Observable<any>
  {
    return this.http.post(this.url,ingredient,{headers: this.addAuthorizationHeader()})
  }
  
  public update(id: number, ingredient: Tag):Observable<any>
  {
    return this.http.put(`${this.url}${id}`,ingredient,{headers: this.addAuthorizationHeader()})
  }
  
  public delete(id: number):Observable<any>
  {
    return this.http.delete(`${this.url}${id}`,{headers: this.addAuthorizationHeader()});
  }
}

export interface TagShort{
  id: number,
  name: string
}