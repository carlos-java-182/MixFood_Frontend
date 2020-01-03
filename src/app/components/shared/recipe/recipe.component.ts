import { Component, OnInit,OnChanges } from '@angular/core';
import * as $ from 'jquery';
import { RecipesService,RecipeLatest,Recipe,RecipeFeatured,RecipeProfile, Images, Ingredients, Tag, Rankings } from 'src/app/services/recipes.service';
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
  private id: number;
  private idUser: number;
  private recipeName: string;
  private recipeCategoryName: string;
  private userName: string;
  private recipeCreateAt: string;
  private recipeDescription: string;
  private preparationTime: string;
  private difficulty: string;
  private totalLikes: number;
  private recipeAverangeRanking: number;
  private views: number;
  private rating: number = 0;
  private totalRankings = 0;
  private isLiked = false;

  //*Objects declaration
  private images: Images[];
  private ingredients: Ingredients[];
  private tags: Tag[];
  private rankings: Rankings[];
  ///ratingComment: number = 0;
  isLogged: boolean = false;
  private arr = [];


  //*Objects declaration
 
  recipesLatests: RecipeLatest[];
  recipesFeatured: RecipeFeatured[];
  categoryList: CategoryCard[];
  recipe: any;
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

    //this.getRecipeById(1);
    this.activatedRoute.paramMap.subscribe(params =>
      {
        this.id = Number.parseInt(params.get('id'));
        this.getRecipeById(this.id);
        this.getCategoriesList();
        this._recipeService.validateLike(1,1).subscribe(response =>
        {
          this.isLiked = false;
        },
        err =>
        {
          this.isLiked = true;  
        }
        );
      });
  }

  //*Get recipe by id param get in rotute
  getRecipeById(id: number):void
  {
    this._recipeService.getProfile(id).subscribe(data =>
    {
      this.recipe;
      this.recipeName = data.name;
      this.recipeCategoryName = data.category.name;
      this.recipeAverangeRanking = data.averangeRanking;
      this.userName = data.user.name+' '+data.user.lastname;
      this.recipeCreateAt = data.createAt;
      this.recipeDescription = data.description;
      this.views = data.views;
      this.difficulty = data.difficulty;
      this.preparationTime = data.preparationTime;
      this.totalLikes = data.totalLikes;
      this.images = data.images;
      this.ingredients = data.recipeIngredients;
      this.tags = data.tags;
      this.rankings = data.rankings;
      this.totalRankings = this.rankings.length;
      this.idUser = data.user.id;

      this.arr.push(1);
      this.getRecipesLatests(this.idUser);
      this.getRecipesCardsFeatured(this.idUser);
    });
    console.log(this.arr);  
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
      //  console.log(this.recipesFeatured);
    });
  }

  getCategoriesList(): void
  {
    this._categoryService.getCategoriesList().subscribe(data =>
    {
      this.categoryList = data;  
    //  console.log("data: "+data);
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
    //    console.log(response);
    });
  }

  private showRecipe(id):void
  {
    this.router.navigate(['/recipe/',id]);
  }

  private StartaLike(): void
  {
    if(this.isLiked)
    {
      this._recipeService.stopLike(this.id ,1).subscribe(response =>
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
      this._recipeService.startLike(this.id,1).subscribe(response =>
      {
        console.log(response);
        this.totalRankings++;
        this.isLiked = true;
      });
    }
    
  }

  private goToRecipe(id: number): void
  {
    this.router.navigate(['recipe/',id])
  }

  private goToRecipesByTag(id: number): void
  {
    let route = `/search/category/${id}/page/1`;
    this.router.navigate([route]);
  }

  public goToRecipesByCategory(id: number):void
  {
    let route = `/search/category/${id}/page/1`;
    this.router.navigate([route]);
  }
  
  public goToProfile(id: number): void
  {
    this.router.navigate(['profile/',id]);
  }
}

