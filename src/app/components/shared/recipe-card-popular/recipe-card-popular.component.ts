import { Component, OnInit, Input } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { FavoriteService, Favorite } from 'src/app/services/favorite.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recipe-card-popular',
  templateUrl: './recipe-card-popular.component.html',
  styleUrls: ['./recipe-card-popular.component.css']
})
export class RecipeCardPopularComponent implements OnInit {

  @Input('recipe')recipe: any;
  //*Variables declaration
  private isLoggedIn: boolean = false;
  private isLiked: boolean = false;
  private isFavorite: boolean = false;
  private idFavorite: number;
  private totalLikes: number;

  constructor(private _recipeService: RecipesService,
              private _favoriteService: FavoriteService,
              private _authService: AuthService,
              private router: Router
            ) { }

  ngOnInit() 
  {
    //console.log();
    this.totalLikes = this.recipe.totalLikes;
    let idUser = 1;
    this.isLoggedIn = this._authService.isAuthenticated();
    //*Validate if user is authenticated

    if(this.isLoggedIn)
    {
        //*Validate if exists favorite
      this._favoriteService.show(this.recipe.id,idUser).subscribe(data =>
      {
        this.idFavorite = data.id;
        this.isFavorite = true;
      },
      err =>
      {
        
      });
  
      //*Validate if exists like
      this._recipeService.validateLike(this.recipe.id).subscribe(response =>
      {
        this.isLiked = false;
        // console.log(response);
      },
      err =>
      {
        this.isLiked = true;  
        // console.log(err);
      });
    }
    
  
  }

  /**
   **This function sends the user id and recipe to service to create a favorite
   * @param idRecipe: id recipe 
   */
  private addToFavorite(idRecipe: number)
  {
    let idUser = 1;
    let favorite: Favorite = 
    {
      user:
      {
        id: idUser
      },
      recipe:
      {
        id: idRecipe
      }
    };
    this._favoriteService.create(favorite).subscribe(response =>
    {
      this.isFavorite = true;
    },
    err =>
    {
      console.log(err);
    });
    //this.isFavorite = true;
  }

  /**
   **This function sends the user id and recipe to service to delete a favorite 
   * @param id: id Recipe
   */
  private removeFavorite(id: number)
  {
    let idUser = 1;
    this._favoriteService.remove(id, idUser).subscribe(response =>
    {
      this.isFavorite = false;
    },
    err =>
    {

    });
  }

  /**
   **This function validates if there is a like, if it exists call the stopLike function of the service to eliminate the like,
   **with the recipe id and that of the user, if there is no like call the startLike function to create a like.
   * @param idRecipe: id recipe
   */
  private StartaLike(idRecipe: number): void
  {
    let idUser = 1;
    if(this.isLiked)
    {
      this._recipeService.stopLike(idRecipe).subscribe(response =>
      {
        console.log(response);
        this.isLiked = false;
        if(this.totalLikes > 0)
        {
          this.totalLikes--;
        }
      });
    }
    else
    {
      this._recipeService.startLike(idRecipe).subscribe(response =>
      {
        console.log(response);
        this.isLiked = true;
      });
    }
  }

  private goToCategory(id: number): void 
  {
    let path = `search/category/${id}/page/1`;
    this.router.navigate([path]);
  }
}
