import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService, PublicUser } from 'src/app/services/profile.service';
import { RecipeLatest, RecipeFeatured, RecipesService, RecipeLatestUser } from 'src/app/services/recipes.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { catchError,map } from 'rxjs/operators';
import { concat } from 'rxjs';
import { CategoryService, CategoryListUser } from 'src/app/services/category.service';
import { FollowerService, NewFollower } from 'src/app/services/follower.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  //*Variables declaration
  private id: number;
  private idFollower: number;
  private isFollowing: boolean = false;
  private isLoggedin: boolean = true;
  private userName: string;
  private aboutMe: string;


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
              private _categorySerive: CategoryService) 
              { }
  ngOnInit() 
  {
    this.activatedRouter.params.subscribe(params =>{
      this.id = Number.parseInt(params['id']);
      this.getProfileById(this.id);
    });

    if(this.isLoggedin)
    {
      this.validateFollowing();
    }
    
    this.getFeaturedRecipes(this.id);
    this.getLatestsRecipes();
    this.getCategoriesListUser();
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
}
