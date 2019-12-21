import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //*Variables declaration
  url:string = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) { }

  getCategoriesCard():Observable<CategoryCard[]>{
    return this.http.get<CategoryCard[]>(this.url+'categories/cards')
  }
}

export interface CategoryCard{
  id : number,
  name : string,
  thumbRoute: string,
  amountRecipes: number
}