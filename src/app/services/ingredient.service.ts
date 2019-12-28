import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  //*Variables declaration
  url:string = 'http://localhost:8080/api/ingredients';

  constructor(private http: HttpClient) { }

  public getIngredientsList():Observable<IngredientList[]>
  {
    return this.http.get<IngredientList[]>(this.url);
  }
}

export interface IngredientList
{
  id: number;
  name: string
}