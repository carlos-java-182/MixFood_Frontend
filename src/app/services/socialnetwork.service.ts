import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError, concat } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocialnetworkService {
  //*Variables declaration
  url:string = 'http://localhost:8080/api/socialnetworks';
  //*Create http headers
  headers = new HttpHeaders({'Content-type': 'application/json'});
  constructor(private http: HttpClient) { }

  public getSocialNetworks(id: number):Observable<Socialnetwork[]>
  {
    return this.http.get<Socialnetwork[]>(this.url+'/'+id).pipe(
      catchError(e => 
      {
        console.log(e.error);
        return throwError(e);
      })
    )
  }
}

export interface Socialnetwork
{
  id: number;
  network: string;
  link: string;
}


