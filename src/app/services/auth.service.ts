import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  private url: string = 'http://localhost:8080/oauth/token';

  constructor(private http: HttpClient,
              ) { }

  public login(user: User):Observable<any>
  {
    //*Create credentials
    const CREDENTIALS = btoa('mixfood' + ':' + '123456');
    //*Create headers
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded','Authorization': 'Basic ' + CREDENTIALS});
    //*Create object URL 
    let params = new URLSearchParams();
    //*Add params
    params.set('grant_type','password');
    params.set('username',user.email);
    params.set('password',user.password);

    return this.http.post<any>(this.url,params.toString(),{headers: httpHeaders});
  }

  public isLoggedIn()
  {
    return true;
  }


}

export interface User 
{
  email: string;
  password: string;
}
