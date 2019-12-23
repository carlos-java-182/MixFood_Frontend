import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TagService {
  //*Variables declaration
  url:string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  
  
  getTagsShort():Observable<TagShort[]>
  {
    return this.http.get<TagShort[]>(this.url+'tags/short');
  } 
}

export interface TagShort{
  id: number,
  name: string
}