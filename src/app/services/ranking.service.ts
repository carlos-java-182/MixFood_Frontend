import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  //*Variables declaration
  private url:string = 'http://localhost:8080/api/rankings';
  //*Create http header type json
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,private _authService: AuthService) { }

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

  public createRanking(ranking: NewRanking): Observable<any>
  {
    return this.http.post<NewRanking>(this.url,ranking,{headers: this.addAuthorizationHeader()});
  }

  public getRankingComments(id: number, page: number, items: number):Observable<any>
  {
    return this.http.get(`${this.url}/comments/${id}/page/${page}/${items}`,{headers: this.addAuthorizationHeader()});
  }

  public validateUserLoggedRanking(idRecipe: number):Observable<any>
  {
    let id = this._authService.user.id;
    return this.http.get(`${this.url}/validate/${idRecipe}/user/${id}`,{headers: this.addAuthorizationHeader()});
  }
}

export interface RankingComment
{
  id: number;
  comment: string;
  punctuation: number;
  createAt: string;
  user:
  {
    id: number;
    name: string;
    lastname: string;
    porfileimageRoute: string;
  }
}

export interface NewRanking
{
  comment: string,
	punctuation: number,
	user:
	{
    id: number
  },
  recipe:
  {
		id: number
  }
}