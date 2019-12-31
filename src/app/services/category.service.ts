import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  public getCategoriesList():Observable<CategoryCard[]>
  {
    return this.http.get<CategoryCard[]>(this.url+'list');
  }

  public getCategoriesListUser(id: number, size: number):Observable<CategoryListUser[]>
  {
    return this.http.get<CategoryListUser[]>(`${this.url}user/list/${id}/items/${size}`);
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