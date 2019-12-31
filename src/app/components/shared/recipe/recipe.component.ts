import { Component, OnInit,OnChanges } from '@angular/core';
import * as $ from 'jquery';
import { RecipesService,RecipeLatest,Recipe,RecipeFeatured } from 'src/app/services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RankingService, NewRanking } from 'src/app/services/ranking.service';
import { CategoryService, CategoryCard } from 'src/app/services/category.service';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  //*Variables declaration
  id: number;
  ///ratingComment: number = 0;
  isLogged: boolean = false;

  //*Objects declaration
  recipe: any
  recipesLatests: RecipeLatest[];
  recipesFeatured: RecipeFeatured[];
  categoryList: CategoryCard[];
  commentForm: FormGroup;

  constructor(private _recipeService: RecipesService,
              private _rankingService: RankingService,
              private _categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() 
  {
    //*Create form group for new comment
    this.commentForm = this.formBuilder.group({
      comment: ['',Validators.required],
      rating: ['',Validators.required]
    });

    this.activatedRoute.paramMap.subscribe(params =>
      {
        this.id = Number.parseInt(params.get('id'));
        this.getRecipeById(this.id);
      /*  this.activatedRoute.params.subscribe(param => 
          {
            this.id = param['id'];
          });*/
         
      })

  
    //*Call functions for get data
 //   this.getRecipeById();
    this.getRecipesLatests(1);
    this.getRecipesCardsFeatured(1);
    this.getCategoriesList();

  }

  //*Get recipe by id param get in rotute
  getRecipeById(id: number):void
  {
    this._recipeService.getById(id).subscribe(data =>
    {
      this.recipe = data;
      console.log(this.recipe);
    });  
  } 

  //*Get Latests recipes by id and create object with data response
  getRecipesLatests(id: number):void
  {
    this._recipeService.getRecipesLatests(id,5).subscribe(data =>
    {
      this.recipesLatests = data;
    });
  }

  //*Get Featured recipeds and create object with data response
  getRecipesCardsFeatured(id: number):void
  {
    this._recipeService.getRecipesCardsFeatured(id,5).subscribe(data =>
    {
        this.recipesFeatured = data;
        console.log(this.recipesFeatured);
    });
  }

  getCategoriesList(): void
  {
    this._categoryService.getCategoriesList().subscribe(data =>
    {
      this.categoryList = data;  
      console.log("data: "+data);
    });
  }

  /**
   * 
   * @param values 
   */
  private createComment(values):void
  {
    let newRanking: NewRanking;
    newRanking =
    {
      comment: values.comment,
      punctuation: values.rating,
      user:
      {
        id: 1
      },
      recipe: {
        id: 1
      }
    };
    
    this._rankingService.createRanking(newRanking).subscribe(response => {
        console.log(response);
    });
  }

  private showRecipe(id):void
  {
    this.router.navigate(['/recipe/',id]);
  }


}
