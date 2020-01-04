import { Component, OnInit } from '@angular/core';
import { RecipesService,RecipeCardTable } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipes-user',
  templateUrl: './recipes-user.component.html',
  styleUrls: ['./recipes-user.component.css']
})
export class RecipesUserComponent implements OnInit {
  //*Objects declaration
  private recipes: RecipeCardTable[];
  
  //*Variables declaration
  private idUser = 1;
  private size = 10;
  private status: string = 'public';

  constructor(private _recipeService: RecipesService) { }


  ngOnInit() {
    let idUser = 1;
    this.getRecipes('public',0);
   
  }

  private getRecipes(status: string,page: number):void{
    this._recipeService.getRecipesCardsTable(this.idUser,this.status,page,this.size).subscribe(response =>
    {
      this.recipes = response.content as RecipeCardTable[];
    },
    err =>
    {
      console.log(err);
    });
  }

  getByStatus():void
  {
    this.getRecipes(this.status,0);
  }

}
