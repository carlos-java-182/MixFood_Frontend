import { Component, OnInit } from '@angular/core';
import { RecipesService, Recipe } from 'src/app/services/recipes.service';
import { ActivatedRoute,Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { CategoryService } from 'src/app/services/category.service';
import { TagService } from 'src/app/services/tag.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {
  //*Variables declaration
  private page: number;
  private totalItems: number;
  private currentPage: number;
  private id: number;
  private totalPages: number;
  private term: string;
  private message: string;
  private categoryName: string;
  private tagName: string;

  private isLoggedIn: boolean = this._authService.isAuthenticated();
  private isResultEmpty: boolean = false;
  private isSearchByCategory: boolean = false;
  private isSearchByTerm: boolean = false;
  private isSearchByTag: boolean = false;

  private paginator: any;

  //*Objects declaration
  private recipes: Recipe[];
  constructor(private _recipeservice: RecipesService,
              private _categoryService: CategoryService,
              private activateroute: ActivatedRoute,
              private _authService: AuthService,
              private _tagService: TagService,
              private router: Router) { }

  ngOnInit() 
  {
    
   
   // this.showLoader = false;

    this.activateroute.paramMap.subscribe( params => 
    {
      this.page = Number(params.get('page'))-1;
      //*Validate search type
      //Search by category
      if(params.get('idCategory') != undefined)
      {
        this.id = Number(params.get('idCategory'));
        this.getRecipeCardsByCategory(this.id, this.page);
        this.getCategoyNameById(this.id);
        this.isSearchByCategory = true;
      }
      //Search by term
      else if(params.get('term') != undefined)
      {
        this.term = params.get('term');
        this.getRecipeCardsByName(this.term);
        this.isSearchByTerm = true;
      }
      //Search by tag
      else if(params.get('idTag') != undefined)
      {
        this.id = Number(params.get('idTag'));
        this.getRecipeCardsByTag(this.id, this.page);
        this.getTagNameById(this.id);
        this.isSearchByTag = true;
      }
    });  
  }

  /**
   **This function get recipes from api
   * @param term: Search term
   */
  public getRecipeCardsByName(term: string)
  {
    this._recipeservice.getRecipeCardsByName(term,this.page).subscribe(response =>
      {
        //*Validate empty results
        if(response.empty)
        {
          this.showNotFoundMessage("No results were found with the name: ",term);
        }
        else
        {
          //*Add results content to object
          this.recipes = response.content as Recipe[];
          console.log(this.recipes);
          //*Get paginator
          this.paginator = response;
          //*Get total results
          this.totalItems = this.paginator.totalElements;
          //*Get current page of results 
          this.currentPage = this.paginator.number + 1;
          this.totalPages = this.paginator.totalPages;
          console.log(this.paginator);
        }
      });
  }

  public getRecipeCardsByCategory(id: number, page: number)
  {
    this._recipeservice.getRecipeCardsByCategory(id,page).subscribe(response =>  
    {
      //*Validate empty results
      if(response.empty)
      {
        this.showNotFoundMessage("No results were found with the category: ",'');
      }
      else
      {
        //*Add results content to object
        this.recipes = response.content as Recipe[];
        //*Get paginator
        this.paginator = response;
        //*Get total results
        this.totalItems = this.paginator.totalElements;
        //*Get current page of results 
        this.currentPage = this.paginator.number + 1;
        //*Get total pages
        this.totalPages = this.paginator.totalPages;
      }
    },
    err =>
    {
      console.log(err);
    });
  }

  public getRecipeCardsByTag(id: number, page: number)
  {
    this._recipeservice.getRecipeCardsByTag(id,page).subscribe(response =>
    {
      if(response.empty)
      {
        this.showNotFoundMessage("No results were found with the category: ",'');
      }
      else
      {
        //*Add results content to object
        this.recipes = response.content[0].recipes as Recipe[];
        //*Get paginator
        this.paginator = response;
        //*Get total results
        this.totalItems = this.paginator.totalElements;
        //*Get current page of results 
        this.currentPage = this.paginator.number + 1;
        //*Get total pages
        this.totalPages = this.paginator.totalPages;
      }
    });
  }

  public showNotFoundMessage(message: string, term: string):void
  {
    this.isResultEmpty = true;
    this.message = message;
    this.term = term;
  }

  public getCategoyNameById(id: number): void
  {
    this._categoryService.getCategoyNameById(id).subscribe(data =>
      {
        this.categoryName = data.name;
      },
      err =>
      {
        console.log(err);
    });
  }

  public getTagNameById(id: number): void
  {
    this._tagService.getTagNameById(id).subscribe(data =>
    {
      this.tagName = data.name;
    },
    err =>
    {
      console.log(err);
    }
    );
  }

  public getPage(page: number):void
  {
    let route: string;
    //*Validate search type and create route 
    if(this.isSearchByTerm)
    {
      route = 'search/'+this.term+'/page/'+page;
    }
    else if(this.isSearchByCategory)
    {
      route = `search/category/${this.id}/page/${page}`;
    }
    else if(this.isSearchByTag)
    {
      route = `search/tag/${this.id}/page/${page}`;
    }

    //*Navigate to new page results with params
    this.router.navigate([route]);
  }

  private showRecipe(recipe): void
  {
    this.router.navigate(['/recipe/',recipe.id]);
  }
}
