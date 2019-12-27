import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  //*Variables declaration
  url:string = 'http://localhost:8080/api/';
  
  constructor(private http: HttpClient) { }
  
  //*This function get the recipes cards for home
  getRecipeCard():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.url+'recipes/cards');
  }
  
  //*This function find the recipes names by search term
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
  getRecipesCardsFeatured(id: number):Observable<RecipeFeatured[]>
  {
    return this.http.get<RecipeFeatured[]>(this.url+'recipes/cards/featured/'+id);
  }

/**
 * *This function find the recipe cards by term, category
 * @param term: recipe name
 * @param idCategory:  category of recipe 
 * @param page: page number shown
 */
  getRecipsCardsResults(term: string, idCategory: number,page: number):Observable<any>
  {
  /*  return this.http.get(this.url+'recipes/cards/search/'+term+'/'+idCategory+'/page/'+page).pipe(
      tap((response: any) =>{
        (response.content as Recipe[]).forEach(recipe =>
          {

          });
      }),map(response =>{
        let recipe = response.content as Recipe[];
        return recipe.map( recipe =>{

        })
      })
    )*/
   return this.http.get<any>(this.url+'recipes/cards/search/'+term+'/'+idCategory+'/page/'+page);
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
  user: {
    id: number,
    name: string,
    lastname: string
  }
  category: {
    id: number,
    name: string
  }
}

export interface RecipeFeatured{
  id: number,
  name: string,
  thumbRoute: string,
  averangeRanking: number,
  description: string,
  user: {
    id: number,
    name: string,
    lastname: string
  }
  category: {
    id: number,
    name: string
  }
}

export class Test{

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