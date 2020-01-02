import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { catchError,map } from 'rxjs/operators';
import  Swal  from 'sweetalert2';
import { error } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  //*Variables declaration
  url:string = 'http://localhost:8080/api/recipes/';
  //*Create http headers
  headers = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }
 
  createRecipe(recipe: NewRecipe):Observable<ResponseCreate>
  {
    return this.http.post<any>(this.url,recipe,{headers: this.headers}).pipe(
      map((response: any) => response as ResponseCreate),
      catchError( e =>
      {
        //*Get http response status
        let status = e.status;
        console.log(status);
        Swal.fire('An error occurred while creating the recipe',e.error.message,'error');
        return throwError(e);
      })
    )

  }

  createRecipeIngredient(ingredients: RecipeIngredient[]):Observable<RecipeIngredient[]>
  {
    return this.http.post<RecipeIngredient[]>(this.url+'ingredients',JSON.stringify(ingredients),{headers: this.headers});
  }

  //*This function get the recipes cards for home
  getRecipeCard():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.url+'cards');
  }
  
  //*This function find the recipes names by search term
  getSearchForName(term: string){
    return this.http.get(this.url+'search/'+term);
  }
  
  //*
  getById(id: number):Observable<Recipe>{
    return this.http.get<Recipe>(this.url+id);
  }

  //*
  getRecipesLatests(id: number, size: number):Observable<RecipeLatest[]>
  {
    return this.http.get<RecipeLatest[]>(this.url+'latests/'+id+'/items/'+size).pipe(
      catchError(e =>
        {
          console.log("ERRORS")
          console.log(e.message);
          return throwError(e);
        })
    );
  }

  public getRecipesLatestsByUser(id: number, size: number):Observable<RecipeLatestUser[]>
  {
    return this.http.get<RecipeLatestUser[]>(this.url+'users/latests/'+id+'/items/'+size);
  }
  //*
  getRecipesCardsFeatured(id: number, size: number):Observable<RecipeFeatured[]>
  {
    return this.http.get<RecipeFeatured[]>(this.url+'cards/featured/'+id+'/items/'+size).pipe(
      map((response: any) => response as RecipeFeatured[]),
      catchError(e =>
        {
          console.log("ERRORS")
          console.log(e.message);
          return throwError(e);
        })
    );

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
   return this.http.get<any>(this.url+'cards/search/'+term+'/'+idCategory+'/page/'+page);
  }

  /**
   * 
   * @param term 
   * @param page 
   */
  public getRecipeCardsByName(term: string, page: number):Observable<any>
  {
    return this.http.get(`${this.url}cards/search/${term}/page/${page}`).pipe(
      map((response:any) =>
      {
        (response.content as Recipe[]).map( recipe =>
        {
          recipe.category.name = recipe.category.name.toUpperCase();
          return recipe;
        });
        return response;
      })
    );
  }

  /**
   **This function 
   * @param id 
   * @param page 
   */
  public getRecipeCardsByCategory(id: number, page: number):Observable<any>
  {
    return this.http.get(`${this.url}cards/category/${id}/page/${page}`).pipe(
      map((response:any) =>
      {
        (response.content as Recipe[]).map( recipe =>
        {
          recipe.category.name = recipe.category.name.toUpperCase();
          return recipe;
        });
        return response;
      })
    );
  }

  /**
   **This function 
   * @param id 
   * @param page 
   */
  public getRecipeCardsByTag(id: number, page: number):Observable<any>
  {
    return this.http.get(`${this.url}cards/tag/${id}/page/${page}`).pipe(
      map((response:any) =>
      {
        //console.log(response.content[0].recipes);
        (response.content[0].recipes as Recipe[]).map( recipe =>
        {
          recipe.category.name = recipe.category.name.toUpperCase();
          return recipe;
        });
        return response;
      })
    );
  }
}

/**
 **Inter faces
 */

export interface ResponseCreate
{
  recipeName: string;
  message: string;
  id: number;
}

export interface RecipeLatest{
  id: number;
  name: string;
  thumbRoute: string;
  averangeRanking: number;
  totalLikes: number;
  user: {
    id: number;
    name: string;
    lastname: string;
  }
  category: {
    id: number;
    name: string;
  }
}

export interface RecipeLatestUser{
  id: number;
  name: string;
  thumbRoute: string;
  averangeRanking: number;
  category: {
    id: number;
    name: string;
  }
}

export interface RecipeFeatured{
  id: number;
  name: string;
  thumbRoute: string;
  averangeRanking: number;
  totalLikes: number;
  description: string;
  createAt: string;
  user: {
    id: number;
    name: string;
    lastname: string;
  }
  category: {
    id: number;
    name: string;
  }
}

export class RecipeIngredient{
  quantity: string;
	recipe:
	{
		id: number
	};
	ingredient:
	{
		id: number
	};
}


export interface NewRecipe
{
  name: string;
  preparationTime: string;
	description: string;
	thumbRoute: string;
  preparationSteps: any;
  difficulty: string;
  status: any;
  videFrame?: string,
	category: 
	{
		id: number
	};
	user:
	{
		id: number
  };
  tags: Tags[]
}

export interface Tags
{
  id: number;
}

export interface Images
{
  routeImage: string
}

export interface Recipe{
  id : number;
  name : string;
  views: number;
  thumbRoute : string;
  createAt : string;
  averangeRanking : number;
  totalLikes: number;
  category: {
    id: number;
    name: string;
  },
  user: {
    id: number;
    name: string;
    lastname: string;
  },
  tags: [];
}