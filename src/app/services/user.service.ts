import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //*Variables declaration
  url:string = 'http://localhost:8080/api/users/';
  //*Create http headers
  headers = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient, private _authService: AuthService) { }

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
 

  getSettingsInformation(id: number):Observable<UserInformation>
  {
    return this.http.get<UserInformation>(`${this.url}settings/information/${id}`,{headers: this.addAuthorizationHeader()});
  }

  getSettingsSocialNetworks(id: number):Observable<SocialNetwork[]>
  {
    return this.http.get<SocialNetwork[]>(`${this.url}settings/socialnetworks/${id}`,{headers: this.addAuthorizationHeader()});
  }

  getEmailById(id: number):Observable<any>
  {
    return this.http.get<any>(`${this.url}settings/email/${id}`,{headers: this.addAuthorizationHeader()});
  }

  updateInformation(id: number, userInformation: UserInformation):Observable<UserInformation>
  {
    return this.http.put<UserInformation>(`${this.url}settings/information/${id}`,JSON.stringify(userInformation),{headers: this.addAuthorizationHeader()});
  }

  // updatePassword(id: number, passwordChange: PasswordChange):Observable<PasswordChange>
  // {
  //   return this.http.put<PasswordChange>(`${this.url}settings/password/${id}`,JSON.stringify(passwordChange),{headers: this.headers});
  // }

  updateSocialNetworks(id: number, socialNetwork: SocialNetwork):Observable<SocialNetwork>
  {
    return this.http.put<SocialNetwork>(`${this.url}settings/socialnetworks/${id}`,JSON.stringify(socialNetwork),{headers: this.addAuthorizationHeader()});
  }

  deleteSocialNetwork(id: number, network)
  {
    return this.http.delete(`${this.url}settings/socialnetworks/${network}/${id}`,{headers: this.addAuthorizationHeader()});
  }

  public updateEmail(body: EmailUpdate):Observable<any>
  {
    return this.http.put(`${this.url}settings/email/${this._authService.user.id}`,body,{headers: this.addAuthorizationHeader()});
  }

  public signUp(user):Observable<any>
  {
    return this.http.post(`${this.url}register`,user,{headers: this.headers});
  }

  public updatePassword(passwords: PasswordChange):Observable<any>
  {
    let id = this._authService.user.id;
    return this.http.put(`${this.url}settings/password/${id}`,passwords,{headers: this.addAuthorizationHeader()});
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