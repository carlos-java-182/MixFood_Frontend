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

 
  public createRecipe(recipe: NewRecipe):Observable<ResponseCreate>
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

  public createRecipeIngredient(ingredients: RecipeIngredient[]):Observable<RecipeIngredient[]>
  {
    return this.http.post<RecipeIngredient[]>(this.url+'ingredients',JSON.stringify(ingredients),{headers: this.headers});
  }

  //*This function get the recipes cards for home
  public getRecipeCard():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.url+'cards');
  }
  
  //*This function find the recipes names by search term
  public getSearchForName(term: string){
    return this.http.get(this.url+'search/'+term);
  }
  
  /**
   * 
   * @param id 
   */
  getById(id: number):Observable<Recipe>{
    return this.http.get<Recipe>(this.url+id);
  }

  /**
   * 
   * @param id 
   */
  public getProfile(id: number): Observable<RecipeProfile>
  {
    return this.http.get<RecipeProfile>(`${this.url}${id}/profile`);
  }

  /**
   * 
   * @param id 
   * @param size 
   */
  public getRecipesLatests(id: number, size: number):Observable<RecipeLatest[]>
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

  /**
   * 
   * @param id 
   * @param size 
   */
  public getRecipesLatestsByUser(id: number, size: number):Observable<RecipeLatestUser[]>
  {
    return this.http.get<RecipeLatestUser[]>(this.url+'users/latests/'+id+'/items/'+size);
  }
  /**
   * 
   * @param id 
   * @param size 
   */
  public getRecipesCardsFeatured(id: number, size: number):Observable<RecipeFeatured[]>
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
  public getRecipsCardsResults(term: string, idCategory: number,page: number):Observable<any>
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

  public getRecipesCardsTable(id: number,status: any,page: number,size: number):Observable<any>
  {
    return this.http.get(`${this.url}user/${id}/${status}/page/${page}/items/${size}`).pipe(
      map((response: any)=> 
      {
        (response.content as RecipeCardTable[]).map(
          recipe =>
          {
            recipe.category.name = recipe.category.name.toLocaleUpperCase();
            return recipe;
          });
          return response;
      })
    );
  }

  public getRecipesCardsTableByName(id: number,status: any,name: string,page: number,size: number):Observable<any>
  {
    return this.http.get(`${this.url}user/${id}/${status}/name/${name}/page/${page}/items/${size}`).pipe(
      map((response: any)=> 
      {
        (response.content as RecipeCardTable[]).map(
          recipe =>
          {
            recipe.category.name = recipe.category.name.toLocaleUpperCase();
            return recipe;
          });
          return response;
      })
    );
  }

  /**
   * 
   * @param idRecipe 
   * @param idUser 
   */
  public startLike(idRecipe, idUser)
  {
    let formData = new FormData();
    
    formData.append('idRecipe',idRecipe);
    formData.append('idUser',idUser);

    return this.http.post(`${this.url}/like`,formData).pipe(
      catchError( e =>
      {
        //*Get http response status
        let status = e.status;
        console.log(status);
        return throwError(e);
      })
    );
  }

  /**
   * 
   * @param idRecipe 
   * @param idUser 
   */
  public stopLike(idRecipe: number, idUser: number)
  {
    return this.http.delete(`${this.url}/${idRecipe}/like/${idUser}`).pipe(
      catchError( e =>
      {
        //*Get http response status
        let status = e.status;
        console.log(status);
        return throwError(e);
      })
    );
  }
  /**
   * 
   * @param idRecipe 
   * @param idUser 
   */
  public validateLike(idRecipe: number, idUser: number)
  {
    return this.http.get(`${this.url}/${idRecipe}/like/${idUser}`).pipe(
      catchError( e =>
      {
        //*Get http response status
        let status = e.status;
        //console.log(status);
        return throwError(e);
      })
    );
  }

  public removeRecipe(id: number)
  {
    return this.http.delete(`${this.url}${id}`).pipe(
      catchError( e =>
      {
        //*Get http response status
        let status = e.status;
        return throwError(e);
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

export interface RecipeProfile{
  id : number;
  name : string;
  views: number;
  thumbRoute : string;
  createAt : string;
  description: string;
  averangeRanking : number;
  difficulty: string;
  preparationTime: string;
  totalLikes: number;
  videoFrame: string;
  category: {
    id: number;
    name: string;
  },
  user: {
    id: number;
    name: string;
    lastname: string;
    description: string;
  },
  rankings: Rankings[];
  tags: Tag[];
  images: Images[];
  recipeIngredients: Ingredients[];
}

export interface Ingredients
{
  quantity: string;
  ingredient: 
  {
    name: string;
  }
}

export interface Tag
{
  id: number;
  name: string;
}

export interface Images 
{
  id: number;
  routeImage: string;
}

export interface Rankings
{
  id: number;
  puntuation: number;
  comment: string;
  createAt: string;
  user:
  {
    id: number;
    name: string;
    lastname: string;
  }
}

export interface RecipeCardTable
{
  id: number;
  name: string;
  averangeRanking: number;
  totalLikes: number;
  totalReviews: number;
  views: number;
  thumbRoute: string;
  category:
  {
    id: number;
    name: string;
  }
}

export enum Status
{
  private,
  public
}

