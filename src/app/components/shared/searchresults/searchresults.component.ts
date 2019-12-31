import { Component, OnInit } from '@angular/core';
import { RecipesService, Recipe } from 'src/app/services/recipes.service';
import { ActivatedRoute,Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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
  private term: string;
  private message: string;
  private paginator: any;
  private isResultEmpty: boolean = false;

  //*Objects declaration
  private recipes: Recipe[];
  constructor(private _recipeservice: RecipesService,
              private activateroute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() 
  {
    this.activateroute.paramMap.subscribe( params => 
    {
      this.page = Number(params.get('page')) -1;
      //*Validate search type
      //Search by category
      if(params.get('idCategory') != undefined)
      {
        console.log('category');
        let id = params.get('idCategory');
      }
      //Search by term
      else if(params.get('term') != undefined)
      {
        let term = params.get('term');
        this.getRecipeCardsByName(term);
      }
      //Search by tag
      else if(params.get('idTag') != undefined)
      {
        console.log('Tags')
        let id = params.get('idTag');
        
      }
    });  
  }

  /**
   **This function get recipes from api
   * @param term: Search term
   */
  getRecipeCardsByName(term: string)
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
          //*Get paginator
          this.paginator = response;
          //*Get total results
          this.totalItems = this.paginator.totalElements;
          //*Get current page of results 
          this.currentPage = this.paginator.number + 1;
          console.log(this.recipes);
        }
      });
  }

  showNotFoundMessage(message: string, term: string):void
  {
    this.isResultEmpty = true;
    this.message = message;
    this.term = term;
  }

  getPage(page):void
  {
    //*Create route
    let route = 'search/'+this.term+'/page/'+page;
    //*Navigate to new page results with params
    this.router.navigate([route]);
  }
}
