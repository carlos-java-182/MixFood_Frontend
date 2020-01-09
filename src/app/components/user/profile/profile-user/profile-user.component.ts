import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { CategoryService, CategoryListUser } from 'src/app/services/category.service';
import { FollowerService } from 'src/app/services/follower.service';
import { RecipesService, RecipeFeatured, RecipeLatestUser } from 'src/app/services/recipes.service';
import { ProfileService, PublicUser } from 'src/app/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  //*Variables delcaration
  //Booleans for shwo options 
  private isShowRecipes: boolean =  false;
  private isShowFavorites: boolean = false;
  private isShowSettings: boolean = true;
  private isShowFollowers: boolean = false;
  private isShowProfile: boolean = false;
  private isProfileImageHover: boolean = false;
  
  //User info
  private userName: string;
  private aboutMe: string;
  private profileImageRoute: string;
  
  private idUser: number = 1;
  //*Objects declaration
  private publicUser: PublicUser;
  private recipeFeatured: RecipeFeatured[];
  private recipeLatests: RecipeLatestUser[];
  private categoriesList: CategoryListUser[];
  private recipeItems: RecipeList;
  private recipesList: any[] = [];
  recipeTrending: any[] = [];
  socialNetworks;
  private selectedImage: File = null;
  
  constructor(private activatedRouter: ActivatedRoute,
  private _profileService: ProfileService,
  private _recipeService: RecipesService,
  private _followerService: FollowerService,
  private _categorySerive: CategoryService,
  private _favoriteService: FavoriteService,
  private _imagesService: ImageService,
  private router: Router) 
  { }

  ngOnInit() 
  {
    this.getProfileById(this.idUser);
    this.getFeaturedRecipes(this.idUser);
    this.getLatestsRecipes();
    this.getCategoriesListUser();  
  }

  private getProfileById(id: number): void
  {
    this._profileService.getPublicPorfile(id).subscribe(data =>
    {
      this.publicUser = data;
      this.userName = data.name +' '+data.lastname;
      this.aboutMe = data.description;
      this.socialNetworks = data.socialNetworks;
      this.profileImageRoute = data.porfileimageRoute;
    });
  }


  private getFeaturedRecipes(id: number): void
  {
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

  private getLatestsRecipes():void
  {
    this._recipeService.getRecipesLatestsByUser(this.idUser,5).subscribe(data=>
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

  private getCategoriesListUser():void
  {
    this._categorySerive.getCategoriesListUser(this.idUser,10).subscribe(data =>
    {
        this.categoriesList = data;
    });
  }




  //**This funtions show the options */
  private showProfile()
  {
    this.isShowProfile = true; 
    this.isShowFavorites = false;
    this.isShowRecipes = false;
    this.isShowSettings = false;
    this.isShowFollowers = false;
  }
  private showRecipes()
  {
    this.isShowRecipes = true;
    this.isShowProfile = false;
    this.isShowFavorites = false;
    this.isShowSettings = false;
    this.isShowFollowers = false;
  }
  private showFavorites()
  {
    this.isShowFavorites = true;
    this.isShowProfile = false;
    this.isShowRecipes = false;
    this.isShowSettings = false;
    this.isShowFollowers = false;
  }
  private showSettings()
  { 
    this.isShowSettings = true;
    this.isShowFavorites = false;
    this.isShowRecipes = false;
    this.isShowProfile = false;
    this.isShowFollowers = false;
  }
  private showFollowers()
  {
    this.isShowFollowers = true;
    this.isShowFavorites = false;
    this.isShowRecipes = false;
    this.isShowSettings = false;
    this.isShowProfile = false;
  }

  private hiddeOptionProfileImage()
  {
    this.isProfileImageHover = false;
  }
  private showOptionProfileImage()
  {
    this.isProfileImageHover = true;
  }

  private onFileSelected(event)
  {
    //*Declare object reader for read file
    const reader = new FileReader();
    
    //*Get image
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);

    this._imagesService.uploadImageUser(this.idUser,this.selectedImage).subscribe(response =>
    {
      this.profileImageRoute = response.imageRoute;
    },err => {
      console.log(err)
    });
  }

}


interface RecipeList
{
  id: number;
  isFavorite: boolean;
  isLiked: boolean;
}