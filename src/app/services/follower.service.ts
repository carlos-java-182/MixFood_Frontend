import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  //*Variables declaration
  private url:string = 'http://localhost:8080/api/followers';
  //*Create http header type json
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  public createFollow(follower: NewFollower): Observable<NewFollower>
  {
    return this.http.post<NewFollower>(this.url,follower,{headers: this.headers});
  }

}


export interface NewFollower
{
  follower:
  {
    id: number;
  };

  user:{
    id: number;
  }
}