import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  //*Variables declaration
  private url:string = 'http://localhost:8080/api/rankings';
  //*Create http header type json
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }


  public createRanking(ranking: NewRanking): Observable<NewRanking>
  {
    return this.http.post<NewRanking>(this.url,ranking,{headers: this.headers});
  }
}

export interface NewRanking
{
  comment: string,
	punctuation: number,
	user:
	{
    id: number
  },
  recipe:
  {
		id: number
  }
}