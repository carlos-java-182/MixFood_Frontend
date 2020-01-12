import { CategoryList } from './../../../services/category.service';
import { TagService, TagShort } from 'src/app/services/tag.service';
import { Component, OnInit,OnChanges } from '@angular/core';
import * as $ from 'jquery';
import { RecipesService,RecipeLatest,Recipe,RecipeFeatured,RecipeProfile, Images, Ingredients, Tag, Rankings } from 'src/app/services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RankingService, NewRanking, RankingComment } from 'src/app/services/ranking.service';
import { CategoryService, CategoryCard } from 'src/app/services/category.service';
import { DomSanitizer } from '@angular/platform-browser';
import { isDate } from 'util';
import { AuthService } from 'src/app/services/auth.service';
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
  private preparationSteps: string;
  private preparationTime: string;
  private difficulty: string;
  private userImage: string;

  private totalLikes: number;
  private recipeAverangeRanking: number;
  private views: number;
  private rating: number = 0;
  private totalRankings = 0;
  private isLiked = false;
  private currentPageRankings: number = 0;
  private totalPagesRankings: number;

  private isAlreadyComent: boolean = false;
  private isRankingsAvailable: boolean = false;
  private isCommented: boolean = false;
  private showAlert: boolean = false;
  private isLoggedIn: boolean = this._authService.isAuthenticated();

  //private videoFrame: string;
  //*Objects declaration
  private recipe: RecipeProfile;
  private images: Images[] = [];
  private ingredients: Ingredients[] = [];
  private tags: Tag[] = [];
  private tagsTrends: TagShort[] = [];
  public rankings: RankingComment[] = [];
  ///ratingComment: number = 0;
  private isLoggedIn: boolean = true;
  private showMoreRankigns: boolean = false;
  private arr = [];
  private videoFrame: any;

  //*Objects declaration 
  recipesLatests: RecipeLatest[];
  recipesFeatured: RecipeFeatured[];
  categoryList: CategoryList[];
  commentForm: FormGroup;

  constructor(private _recipeService: RecipesService,
              private _rankingService: RankingService,
              private _tagService: TagService,
              private _categoryService: CategoryService,
              private _authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private _sanitizer: DomSanitizer
              ) { }

  ngOnInit() 
  {

    this.videoFrame = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/watch?v=SLZDNUdQmJ8');

    //*Create form group for new comment
    this.commentForm = this.formBuilder.group({
      comment: ['',Validators.required],
      rating: ['',Validators.required]
    });

    //this.getRecipeById(1);
    this.activatedRoute.paramMap.subscribe(params =>
      {
        this.id = Number.parseInt(params.get('id'));
        
        //*Validate if user is logged
        if(this._authService.isAuthenticated)
        {
          console.log('USER IN ')
          //*Get id user 
          let idUser = this._authService.user.id;
          //*Update views number
          this._recipeService.updateViews(this.id,idUser).subscribe(response =>
          {
            console.log(response);
          },
          err =>
          {
            console.log(err);
            if(err.status == 404)
            {
              console.log(err.error.message);
            }      
          });

          //*Validate if exist a like of the user logged 
          this._recipeService.validateLike(this.id).subscribe(response =>
          {
            this.isLiked = false;
          },
          err =>
          {
            this.isLiked = true;  
          }
          );
          
          this._rankingService.validateUserLoggedRanking(this.id).subscribe(response =>
          {
            console.log('NOP')
            console.log(response);
          },
          err =>
          {
            this.isCommented = true;
            console.log(err);
          });
         }
        else 
        {
          this.isLoggedIn = false;
        }

        this.getRecipeById(this.id);
        this.getCategoriesList();
        this.getRankingComments(this.id);
        this.getTrends();

      });

     // this.getRecipeById(1);
  }

  private getTrends(): void
  {
    this._tagService.getTrends().subscribe(response =>
      {
        this.tagsTrends = response.content as TagShort[];
      },
      err =>
      {
        console.log(err);
      }
      );
  }


  //*Get recipe by id param get in rotute
  private getRecipeById(id: number):void
  {
    this._recipeService.getProfile(id).subscribe(data =>
    {
      this.recipe = data;
    //  console.log(this.recipe);
      
      this.recipeName = data.name;
      this.recipeCategoryName = data.category.name;
      this.recipeAverangeRanking = data.averangeRanking;
      this.userName = data.user.name+' '+data.user.lastname;
      this.recipeCreateAt = data.createAt;
      this.recipeDescription = data.description;
      this.userImage = data.user.porfileimageRoute;
      this.views = data.views;
      this.difficulty = data.difficulty;
      this.preparationTime = data.preparationTime;
      this.preparationSteps = data.preparationSteps;
      this.totalLikes = data.totalLikes;
      this.images = data.images;
      this.ingredients = data.recipeIngredients;
      this.tags = data.tags;
     
    ///  console.log(this.images);
      this.totalRankings = this.rankings.length;
      this.idUser = data.user.id;

      this.arr.push(1);
      this.getRecipesLatests(this.idUser);
      this.getRecipesCardsFeatured(this.idUser);
    });
    //console.log(this.arr);  
  } 

  //*Get Latests recipes by id and create object with data response
  private getRecipesLatests(id: number):void
  {
    this._recipeService.getRecipesLatests(id,5).subscribe(data =>
    {
      this.recipesLatests = data;
    });
  }

  //*Get Featured recipeds and create object with data response
  private getRecipesCardsFeatured(id: number):void
  {
    this._recipeService.getRecipesCardsFeatured(id,5).subscribe(data =>
    {
        this.recipesFeatured = data;
      //  console.log(this.recipesFeatured);
    });
  }

  private goToCategory(id: number): void 
  {
    let path = `search/category/${id}/page/1`;
    this.router.navigate([path]);
  }


  private getCategoriesList(): void
  {
    this._categoryService.getCategoriesListLimit().subscribe(response =>
    {
      this.categoryList = response.content as CategoryList[];  
    },
    err =>
    {
      console.log(err);
    });
  }

  /**
   * 
   * @param values 
   */
  private createComment(values):void
  {
   // console.log(values['comment']);
    if(values['comment'] != '' && values['ranking'] != '')
    {
      let newRanking: any;
      newRanking =
      {
        comment: values.comment,
        punctuation: values.rating,
        user:
        {
          id: this._authService.user.id,
          name: this._authService.user.name,
          lastname: this._authService.user.lastname,
          porfileimageRoute: this._authService.user.porfileimageRoute

        },
        recipe: 
        {
          id: this.id
        }
      };
      
      this._rankingService.createRanking(newRanking).subscribe(response => 
      {
        console.log(response);
        this.rankings.push(response.ranking as RankingComment);
        this.isCommented = true;
        this.showAlert = true;
        this.commentForm.reset();
      },
      err =>
      {
        console.log(err);
      });
      this.isAlreadyComent = true;
    }
  }

  private showRecipe(id):void
  {
    this.router.navigate(['/recipe/',id]);
  }

  private StartaLike(): void
  {
    if(this.isLiked)
    {
      this._recipeService.stopLike(this.id).subscribe(response =>
      {
        console.log(response);
        this.isLiked = false;
        if(this.totalLikes > 0)
        {
          this.totalLikes--;
        }
      }
      );
    }
    else
    {
      this._recipeService.startLike(this.id).subscribe(response =>
      {
        console.log(response);
        this.totalRankings++;
        this.isLiked = true;
      },
      err =>
      {
        console.log(err);
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

  private getRankingComments(id: number)
  {
    this._rankingService.getRankingComments(id,this.currentPageRankings,10).subscribe(response=>
    {
      console.log("Elements: "+response.numberOfElements)
      if(response.numberOfElements > 0)
      {
        this.rankings = response.content as RankingComment[];
        this.totalPagesRankings = response.totalPages;
        for(let i = 0; i< response.numberOfElements; i++)
        {
          this.rankings.push(response.content[i] as RankingComment);
        }
        this.showMoreRankigns = true;
      }
    },
    err =>
    {
      console.log(err);
    });
  }
  
  private showMoreRankings()
  {
    this.currentPageRankings++;
    if(this.currentPageRankings < this.totalPagesRankings)
    {
      this._rankingService.getRankingComments(this.id,this.currentPageRankings,10).subscribe(response=>
      {
        for(let i = 0; i< response.numberOfElements; i++)
        {
          this.rankings.push(response.content[i] as RankingComment);
        }
        //console.log(response)
      },
      err =>
      {
        console.log(err);
      });
    }
    else
    {
      this.showMoreRankigns = false;
    }
    

  }

  private goToTag(id: number): void 
  {
    let path = `search/tag/${id}/page/1`;
    this.router.navigate([path]);
  }

  private getTags(): void
  {
    this._tagService.getTagsShort().subscribe(data =>
    {
      this.tags = data;
      console.log(data);
    },
    err =>
    {
      console.log(err);
    });
  }
}

