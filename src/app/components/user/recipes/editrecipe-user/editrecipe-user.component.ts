import { Component, OnInit } from '@angular/core';
import { Recipe, RecipesService } from 'src/app/services/recipes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editrecipe-user',
  templateUrl: './editrecipe-user.component.html',
  styleUrls: ['./editrecipe-user.component.css']
})
export class EditrecipeUserComponent implements OnInit {
  //*Variable declarations
  private idRecipe: number;
  constructor(private _recipeService: RecipesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() 
  {
    
  }

}
