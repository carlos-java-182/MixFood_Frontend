import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
   //*Variables declaration
  url:string = 'http://localhost:8080/api/images/';
  //*Create http headers
  headers = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  /**
   * 
   * @param images 
   * @param id 
   * @param principalImage 
   */
  public uploadImageRecipe(images:any, id, principalImage: string)
  {
    //*Create object FormData 
    let formData = new FormData();

    //*Get images and add to formData
    for(let i = 0; i < images.length; i++)
    {
      formData.append("images",images[i]);
    }
     
    //*Add params to formData
    formData.append("id", id);
    formData.append("principalImage",principalImage);
    return this.http.post(`${this.url}upload/`,formData).pipe(
    catchError( e =>
      {
        //*Get http response status
        let status = e.status;
        console.log(status);
        return throwError(e);
    })
    )

  }

  public uploadImageUser(id, file: File):Observable<any>
  {
    let formData = new FormData();
    formData.append('file',file);
    formData.append('id',id);
    return this.http.post(`${this.url}uploads/users`,formData);
  }

}
