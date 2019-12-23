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
  //*
  getRecipeCard():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.url+'recipes/cards');
  }
  
  //*
  getSearchForName(term: string){
    return this.http.get(this.url+'recipes/search/'+term);
  }
  
  //*
  getById(id: number):Observable<Recipe>{
    return this.http.get<Recipe>(this.url+'recipes/'+id);
  }

  //*
  getRecipesLatests(id: number):Observable<RecipeLatest[]>
  {
    return this.http.get<RecipeLatest[]>(this.url+'recipes/latests/'+id);
  }

  //*
  getRecipesCardsFeatured(id: number):Observable<Recipe[]>
  {
    return this.http.get<Recipe[]>(this.url+'recipes/cards/featured/'+id);
  }
}

/**
 * Interfaces
 */

export interface RecipeLatest{
  id: number,
  name: string,
  thumbRoute: string,
  averangeRanking: number,
  category: {
    id: number,
    name: string
  }
}

export interface Recipe{
  id : number,
  name : string,
  views: number,
  thumbRoute : string,
  createAt : string,
  averangeRanking : number,
  category: {
    id: number,
    name: string
  },
  user: {
    id: number,
    name: string,
    lastname: string
  },
  tags: []
}