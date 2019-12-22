import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  //*Variables declaration
  url:string = 'http://localhost:8080/api/';
  
  constructor(private http: HttpClient) { }

  getRecipeCard():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.url+'recipes/cards');
  }

  getSearchForName(term : string){
    return this.http.get(this.url+'recipes/search/'+term);
  }
}



export interface Recipe{
  id : number,
  name : string,
  userName : string,
  thumbRoute : string,
  createAt : string,
  averangeRanking : number,
  categoryName : string,
  idUser : number
}