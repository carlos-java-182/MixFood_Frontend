import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService, PublicUser } from 'src/app/services/profile.service';
import { RecipeLatest, RecipeFeatured, RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  //*Variable declaration
  private id: number;
  
  //*Objects declaration
  private publicUser: PublicUser;
  private recipeFeatured: RecipeFeatured[];
  private recipeTrending: RecipeFeatured;
 
  constructor(private activatedRouter: ActivatedRoute,
              private _profileService: ProfileService,
              private _recipeService: RecipesService) { }
  ngOnInit() 
  {
    this.activatedRouter.params.subscribe(params =>{
      this.id = Number.parseInt(params['id']);
      this.getProfileById(this.id);
    })
    this.getFeaturedRecipes(this.id);
  }

  public getProfileById(id: number): void
  {
    this._profileService.getPublicPorfile(id).subscribe(data =>{
      this.publicUser = data;
    });
  }

  public getFeaturedRecipes(id: number): void{
    this._recipeService.getRecipesCardsFeatured(id).subscribe(data =>
      {
        //*Sort recipes by ranking
        data.sort((a)=> a.averangeRanking);
        this.recipeFeatured = data;
        this.recipeTrending = data[0];
      });
  }



}
