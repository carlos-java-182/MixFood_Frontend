import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  //*Variables declaration
  url:string = 'http://localhost:8080/api/ingredients';
  //*Create http header type json
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient,
              
              private _authService: AuthService) { }

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

  public getIngredientsList():Observable<IngredientList[]>
  {
    return this.http.get<IngredientList[]>(this.url,{headers: this.addAuthorizationHeader()});
  }
}

export interface IngredientList
{
  id: number;
  name: string
}