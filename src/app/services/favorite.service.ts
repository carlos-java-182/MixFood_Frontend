import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  public getCardsList(id: number,page: number,items: number):Observable<any>
  {
    return this.http.get(`${this.url}${id}/page/${page}/items/${items}`).pipe(
      map((response: any) =>
      {
        (response.content as FavoriteCard[]).map(favorite =>
        {
          favorite.recipe.category.name = favorite.recipe.category.name.toUpperCase();
          return favorite;
        });
        return response;
      })
    );
  }


  


}

export interface FavoriteCard
{
  id: number;
  recipe:
  {
    id: number;
    name: string;
    thumRoute: string;
    averangeRanking: number;
    totalLikes: number;
    category:
    {
      id: number;
      name: string;
    };
  }
  user:
  {
    id: number;
    name: string;
    lastname: string;
  };
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

