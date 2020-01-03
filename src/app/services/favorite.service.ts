import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  //*Variables declaration
  private url:string = 'http://localhost:8080/api/favorites/';
  //*Create http header type json
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
 
  constructor(private http: HttpClient) { }


  public create(favorite: Favorite):Observable<Favorite>
  {
    return this.http.post<Favorite>(this.url,favorite,{headers: this.headers});
  }

  public remove(idRecipe: number, idUser: number)
  {
    return this.http.delete(`${this.url}recipe/${idRecipe}/user/${idUser}`);
  }
  
  public show(idRecipe: number, idUser: number):Observable<any>
  {
    return this.http.get<any>(`${this.url}recipe/${idRecipe}/user/${idUser}`);
  }


  


}


export interface Favorite
{
  id?: number;
  user:
  {
    id: number;
  },
  recipe: 
  {
    id: number;
  }
}

