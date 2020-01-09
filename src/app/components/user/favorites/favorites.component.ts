import { Component, OnInit } from '@angular/core';
import { FavoriteService, FavoriteCard } from 'src/app/services/favorite.service';
import  Swal  from 'sweetalert2';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  //*Variables declaration
  private idUser = 1;
  private itemsPerPage = 5;
  private totalItems: number = 0;
  private currentPage = 1;
  private totalPages: number;
  private isResultEmpty: boolean = false;
  
  //*Objects declaration
  private favorites: FavoriteCard[];
  constructor(private _favoriteService: FavoriteService) { }

  ngOnInit() 
  {
    this.getFavorites(0);
  }


  private getFavorites(page: number)
  {
    this._favoriteService.getCardsList(1,page,this.itemsPerPage).subscribe(response =>{
      if(response.empty)
      {
        this.isResultEmpty = true;
        this.totalItems = 0;
        this.favorites = [];
      }
      else
      {
        this.favorites = response.content;
        this.totalItems = response.totalElements;
       this.isResultEmpty = false;
        //*Get current page of results 
        this.currentPage = response.number + 1;
        this.totalPages = response.totalPages;
      }
    },
    err =>
    {
      console.log(err);
    }
    );
  }

  private getPage(page: number)
  {
    this.getFavorites(page-1);
  }

  private removeFavorite(id: number, index: number)
  {
    let idUser = 1;
    Swal.fire({
      title: 'Are you sure you want to delete this recipe from your favorites?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    })
    .then((result) =>{
      if(result.value)
      {
        this._favoriteService.remove(id,idUser).subscribe(response =>
        {
          this.favorites.splice(1,index);
        },
        err=>
        {
          console.log(err);
        });
      }
    });       
  }

}
