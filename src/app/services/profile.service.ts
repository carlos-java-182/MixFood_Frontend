import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  //*Variable declaration
  url: string = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) { }

  public getPublicPorfile(id: number):Observable<PublicUser>
  {
    return this.http.get<PublicUser>(this.url+'users/'+id);
  }
}

export interface PublicUser
{
  id: number;
  name: string;
  lastname: string;
  porfileImageRoute: string;
  description: string;
  createAt: string;
  socialNetworks: SocialNetwork[];
}

export interface SocialNetwork
{
  id: number;
  network: string;
  link: string;
}