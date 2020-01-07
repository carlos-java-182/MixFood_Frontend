import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //*Variables declaration
  url:string = 'http://localhost:8080/api/categories/';
  constructor(private http: HttpClient) { }

  public getCategoriesCard():Observable<CategoryCard[]>
  {
    return this.http.get<CategoryCard[]>(this.url+'cards')
  }

  public getCategoriesList():Observable<any>
  {
    return this.http.get(this.url+'list');
  }

  public getCategoriesListUser(id: number, size: number):Observable<CategoryListUser[]>
  {
    return this.http.get<CategoryListUser[]>(`${this.url}user/list/${id}/items/${size}`);
  }

  public getCategoyNameById(id: number):Observable<any>
  {
    return this.http.get(`${this.url}/name/${id}`).pipe(
      catchError(e => 
        {
          return throwError(e);
        })
    );
  }
}

export interface CategoryCard
{
  id : number,
  name : string,
  thumbRoute?: string,
  amountRecipes: number
}

export interface CategoryListUser
{
  id: number;
  name: string;
}
export interface CategoryList
{
  id: number;
  name: string;
}