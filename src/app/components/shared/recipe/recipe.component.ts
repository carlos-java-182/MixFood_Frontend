import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { RecipesService,RecipeLatest,Recipe } from 'src/app/services/recipes.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  //*Variables declaration
  id: number;
  isLogged: boolean = false;
  //*Objects declaration
  recipe: any
  recipesLatests: RecipeLatest[];
  recipesFeatured: Recipe[];

  constructor(private _recipeService: RecipesService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit() 
  {
    this.activateRoute.params.subscribe(param => 
    {
      this.id = param['id'];
    });
   
    //*Call functions for get data
    this.getRecipeById();
    this.getRecipesLatests(1);
    this.getRecipesCardsFeatured(1);

  }

  //*Get recipe by id param get in rotute
  getRecipeById():void
  {
    this._recipeService.getById(this.id).subscribe(data =>
    {
      this.recipe = data;
    });  
  } 

  //*Get Latests recipes by id and create object with data response
  getRecipesLatests(id: number):void
  {
    this._recipeService.getRecipesLatests(id).subscribe(data =>
    {
      this.recipesLatests = data;
    });
  }

  //*Get Featured recipeds and create object with data response
  getRecipesCardsFeatured(id: number):void
  {
    this._recipeService.getRecipesCardsFeatured(id).subscribe(data =>
    {
        this.recipesFeatured = data;
        console.table(this.recipesFeatured);
    });
  }


}
