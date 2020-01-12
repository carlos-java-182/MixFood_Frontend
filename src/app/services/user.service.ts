import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //*Variables declaration
  url:string = 'http://localhost:8080/api/users/';
  //*Create http headers
  headers = new HttpHeaders({'Content-type': 'application/json'});
  constructor(private http: HttpClient) { }

  getSettingsInformation(id: number):Observable<UserInformation>
  {
    return this.http.get<UserInformation>(`${this.url}settings/information/${id}`);
  }

  getSettingsSocialNetworks(id: number):Observable<SocialNetwork[]>
  {
    return this.http.get<SocialNetwork[]>(`${this.url}settings/socialnetworks/${id}`);
  }

  getEmailById(id: number):Observable<any>
  {
    return this.http.get<any>(`${this.url}settings/email/${id}`);
  }

  updateInformation(id: number, userInformation: UserInformation):Observable<UserInformation>
  {
    return this.http.put<UserInformation>(`${this.url}settings/information/${id}`,JSON.stringify(userInformation),{headers: this.headers});
  }

  updatePassword(id: number, passwordChange: PasswordChange):Observable<PasswordChange>
  {
    return this.http.put<PasswordChange>(`${this.url}settings/password/${id}`,JSON.stringify(passwordChange),{headers: this.headers});
  }

  updateSocialNetworks(id: number, socialNetwork: SocialNetwork):Observable<SocialNetwork>
  {
    return this.http.put<SocialNetwork>(`${this.url}settings/socialnetworks/${id}`,JSON.stringify(socialNetwork),{headers: this.headers});
  }

  deleteSocialNetwork(id: number, network)
  {
    return this.http.delete(`${this.url}settings/socialnetworks/${network}/${id}`);
  }

  public updateEmail(id: number, body: EmailUpdate):Observable<any>
  {
    return this.http.put(`${this.url}settings/email/${id}`,JSON.stringify(body),{headers: this.headers});
  }

  public signUp(user):Observable<any>
  {
    return this.http.post(`${this.url}register`,user,{headers: this.headers});
  }

 
  
}

export interface EmailUpdate
{
  password: string;
  email: string;
}

export interface UserInformation
{
  id?: number;
  name: string;
  lastname: string;
  gender: string;
  dateBirth: string;
  country: string;
  description: string;
}

export interface SocialNetwork
{
  id?: number;
  link: string;
  network: string;
}

export interface PasswordChange
{
  actualPassword: string;
  newPassword: string;
}