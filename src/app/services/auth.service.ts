import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  //*Variables declaration
  private _user: User;
  private _token: string;
  private urlEndPoint: string = 'http://localhost:8080/oauth/token';
  constructor(private http: HttpClient, private router: Router
              ) { }

  public login(user: User):Observable<any>
  {
    //*Create credentials
    const CREDENTIALS = btoa('angularapp' + ':' + '123456');
    //*Create headers
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded','Authorization': 'Basic ' + CREDENTIALS});
    //*Create object URL 
    let params = new URLSearchParams();
    //*Add params
    params.set('grant_type','password');
    params.set('username',user.email);
    params.set('password',user.password);

    return this.http.post<any>(this.urlEndPoint,params.toString(),{headers: httpHeaders});
  }

  public isLoggedIn()
  {
    return true;
  }

  public isNoAuthorized(e): boolean
  {
    if(e.status == 401)
    {
      if(this.isAuthenticated())
      {
        this.logout();
      }
      alert('NOT IS AUTH');
      return true;
    }
    
    if(e.status == 403)
    {
      console.log('Denegaded Access');
      return true;
    }
    return false;
  }

  public saveToken(accessToken: string):void
  {
    this._token = accessToken;
    console.log(this._token);
    sessionStorage.setItem('token',accessToken);
  }

  
  /**
   **This function save token in sessionStorage
   * @param accessToken: Security token
   */
  public saveUser(accessToken: string):void 
  {

    //*Get token
    let payload = this.getDataToken(accessToken);
    this._user = new User();
    
    //*Add token data to user
    this._user.id = payload.id;
    this._user.username = payload.username;
    this._user.email = payload.email;
    this._user.roles = payload.authorities;
    this._user.name = payload.name;
    this._user.lastname = payload.lastname;
    this._user.porfileimageRoute = payload.profileImage;
    console.log('ROLES'+ payload.authorities)
   
    //*Add user data on sessionStorage and this is convert to json
    sessionStorage.setItem('user',JSON.stringify(this._user));
  }

  public getDataToken(accessToken: string):any
  {
    //*Validate if token exits and convert to json
    if(accessToken != null)
    {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  /**
   **Get the info user if this is logged
   */
  public get user(): User
  {
    if(this._user != null)
    {
      return this._user;
    }
    else if(this._user == null && sessionStorage.getItem('user') != null)
    {
      console.log('again')
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this.user;
    }
    return new User();
  }

  /**
   **This function get the token if extist
   */
  public get token(): string
  {
    if(this._token != null)
    {
      return this._token;
    }
    else if(this._token == null && sessionStorage.getItem('token') != null)
    {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  public isAuthenticated(): boolean
  {
    let payload = this.getDataToken(this.token);
    console.log('token: '+ payload.user_name);
    if(payload != null && payload.user_name.length > 0)
    {
      return true;
    }
    return false;
  }

  /**
   **This function clear the objects and session 
   */
  public logout():void 
  {
    this._user = null;
    this._token = null;
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  public hasRole(role: string): boolean
  {
    console.log('IN HASH')
    console.log(this.user.roles);
    if(this.user.roles.includes(role))
    {
      return true;
    }
    return false;
  }
}


