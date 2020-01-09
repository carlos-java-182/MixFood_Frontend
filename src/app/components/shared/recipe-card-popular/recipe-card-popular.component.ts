import { Component, OnInit, Input } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { FavoriteService, Favorite } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-recipe-card-popular',
  templateUrl: './recipe-card-popular.component.html',
  styleUrls: ['./recipe-card-popular.component.css']
})
export class RecipeCardPopularComponent implements OnInit {

  @Input('recipe')recipe: any;
  @Input('isLoggedIn')
  private istLoggedInt?: boolean = false;
  private isLiked: boolean = false;
  private isFavorite: boolean = false;
  private isLoggedin: boolean = true; 
  private idFavorite: number;
  private totalLikes: number;

  constructor(private _recipeService: RecipesService,
              private _favoriteService: FavoriteService,
            ) { }

  ngOnInit() 
  {
    //console.log();
    this.totalLikes = this.recipe.totalLikes;
    let idUser = 1;
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
    this._recipeService.validateLike(this.recipe.id,idUser).subscribe(response =>
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
      this._recipeService.stopLike(idRecipe ,idUser).subscribe(response =>
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
      this._recipeService.startLike(idRecipe,idUser).subscribe(response =>
      {
        console.log(response);
        this.isLiked = true;
      });
    }
  }
}
