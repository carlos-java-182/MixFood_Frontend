import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService, PublicUser } from 'src/app/services/profile.service';
import { RecipeLatest, RecipeFeatured, RecipesService, RecipeLatestUser } from 'src/app/services/recipes.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { catchError,map } from 'rxjs/operators';
import { concat } from 'rxjs';
import { CategoryService, CategoryListUser } from 'src/app/services/category.service';
import { FollowerService, NewFollower } from 'src/app/services/follower.service';
import { FavoriteService, Favorite } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css',
  '../../../../assets/css/followersStyles.css',
  '../../../../assets/css/profileStyles.css'
]
})

export class UserprofileComponent implements OnInit {
  //*Variables declaration
  private id: number;
  private idFollower: number;
  private totalLikes: number = 1;
  private isFollowing: boolean = false;
  private isLoggedin: boolean = true;
  private isLiked: boolean = false;
  private isFavorite: boolean = false;
  private userName: string;
  private aboutMe: string;

  private recipeItems: RecipeList;
  private recipesList: any[] = [];

  //*Objects declaration
  private publicUser: PublicUser;
  private recipeFeatured: RecipeFeatured[];
  private recipeLatests: RecipeLatestUser[];
  private categoriesList: CategoryListUser[];
  recipeTrending: any[] = [];
  socialNetworks;
 
  constructor(private activatedRouter: ActivatedRoute,
              private _profileService: ProfileService,
              private _recipeService: RecipesService,
              private _followerService: FollowerService,
              private _categorySerive: CategoryService,
              private _favoriteService: FavoriteService,
              private router: Router) 
              { }
  ngOnInit() 
  {
    this.activatedRouter.params.subscribe(params =>{
      this.id = Number.parseInt(params['id']);
      this.getProfileById(this.id);
    });

    if(this.isLoggedin)
    {
      let idUser = 1;
      let idRecipe = 1;
      this.validateFollowing();
      console.log(this.recipeTrending);

      //*Validate if exists favorite
      this._favoriteService.show(idRecipe,idUser).subscribe(data =>
      {

        this.isFavorite = true;
      },
      err =>
      {
        this.isFavorite = false;
        //console.log(err);   
      });

      //*Validate if exists like
    this._recipeService.validateLike(idRecipe,idUser).subscribe(response =>
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

    this.getFeaturedRecipes(this.id);
    this.getLatestsRecipes();
    this.getCategoriesListUser();

    console.log(this.recipeTrending);
  }

  
  public getProfileById(id: number): void
  {
    this._profileService.getPublicPorfile(id).subscribe(data =>
    {
      this.publicUser = data;
      this.userName = data.name +' '+data.lastname;
      this.aboutMe = data.description;
      this.socialNetworks = data.socialNetworks;
      
    });
    
  }

  public getFeaturedRecipes(id: number){
    this._recipeService.getRecipesCardsFeatured(id,4).subscribe(data =>
      {
        //*Sort recipes by ranking
        data.sort((a)=> a.averangeRanking);
        this.recipeFeatured = data;
        this.recipeTrending.push(data[0]);

        //Add recipes to list
        for(let i = 0; i < data.length; i++)
        {
          let recipeItems: RecipeList = {
            id: data[i].id,
            isFavorite: false,
            isLiked: false
          };

          this.recipesList.push(recipeItems);
        }
        //console.log(this.recipesList);
      });      
  }

  public getCategoriesListUser():void
  {
    this._categorySerive.getCategoriesListUser(this.id,10).subscribe(data =>
    {
        this.categoriesList = data;
    });
  }

  public getLatestsRecipes():void
  {
    this._recipeService.getRecipesLatestsByUser(this.id,5).subscribe(data=>
    {
      this.recipeLatests = data;

      //Add recipes to list
      for(let i = 0; i < data.length; i++)
      {
        let id = data[i].id;
        let idExists = this.recipesList.find(x => x.id === id);
      //  console.log(idExists);
        if(idExists == undefined)
        {
          let recipeItems: RecipeList = {
            id: data[i].id,
            isFavorite: false,
            isLiked: false
          };

          this.recipesList.push(recipeItems);
        //  this.recipesList.push(data[i]);
        }
       
      }
     //console.log(this.recipesList);
    });
  }

  goToLink(url: string): void
  {
    window.open(url, "_blank");
  }

  private validateFollowing(): void
  {
    let idFollower: number = 2;
    this._followerService.validateFollowing(this.id,idFollower).subscribe(response=>
    {
      if(response == null)
      {
        this.isFollowing = false;
      }
      else
      {
        this.idFollower = response.id;
        console.log(idFollower);
        this.isFollowing = true;
      }
    });
  }

  private StartFollowing(): void
  {
    let idFollower = 2;
    //*Create follower
    let follower: NewFollower = 
    {
      follower: 
      {
        id: idFollower
      },
      user:
      {
        id: this.id
      }
    };

    this._followerService.createFollow(follower).subscribe(response =>
    {
      console.log(response);
      this.idFollower = response.id;
      this.isFollowing = true; 
    },
    err =>
    {

    }
    );
  }

  private StopFollowing(): void
  {
    let idFollow = 5;
    this._followerService.deleteFollowing(this.idFollower).subscribe(response =>
    {
        console.log(response);
    });
    this.isFollowing = false;
  }

  private goToRecipe(id: number): void
  {
    this.router.navigate(['recipe/',id])
  }

  public goToRecipesByCategory(id: number):void
  {
    let route = `search/category/${id}/page/1`;
    this.router.navigate([route]);
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

interface RecipeList
{
  id: number;
  isFavorite: boolean;
  isLiked: boolean;
}