import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //*Variables declaration
  url:string = 'http://localhost:8080/api/categories/';
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

  public getCategoriesCard(page: number, items: number):Observable<any>
  {
    return this.http.get(`${this.url}cards/page/${page}/items/${items}`)
  }

  public getCategoriesListLimit():Observable<any>
  {
    return this.http.get(this.url+'listlimit');
  }

  public getCategoriesList():Observable<CategoryList[]>
  {
    return this.http.get<CategoryList[]>(this.url+'list');
  }

  public getCategoriesListUser(id: number, size: number):Observable<CategoryListUser[]>
  {
    return this.http.get<CategoryListUser[]>(`${this.url}user/list/${id}/items/${size}`);
  }

  public getCategoyNameById(id: number):Observable<any>
  {
    return this.http.get(`${this.url}name/${id}`).pipe(
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

  public create(category: Category):Observable<any>
  {
    return this.http.post(this.url,category,{headers: this.addAuthorizationHeader()})
  }
  
  public update(id: number, category: Category):Observable<any>
  {
    return this.http.put(`${this.url}${id}`,category,{headers: this.addAuthorizationHeader()})
  }
  
  public delete(id: number):Observable<any>
  {
    return this.http.delete(`${this.url}${id}`,{headers: this.addAuthorizationHeader()});
  }


  
}

export interface CategoryCard
{
  id : number,
  name : string,
  thumbRoute?: string,
  amountRecipes: number
}

export interface CategoryListUser
{
  id: number;
  name: string;
}
export interface CategoryList
{
  id: number;
  name: string;
}