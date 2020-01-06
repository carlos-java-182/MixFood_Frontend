import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TagService {
  //*Variables declaration
  url:string = 'http://localhost:8080/api/tags/';

  constructor(private http: HttpClient) { }

  
  
  getTagsShort():Observable<TagShort[]>
  {
    return this.http.get<TagShort[]>(this.url+'short');
  } 

  getTagNameById(id: number):Observable<any>
  {
    return this.http.get(`${this.url}/${id}/name`).pipe(
      catchError(e => 
        {
          return throwError(e);
        })
    );
  }
}

export interface TagShort{
  id: number,
  name: string
}