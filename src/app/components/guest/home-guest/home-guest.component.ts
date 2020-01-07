import { empty } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { NgModel, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import * as $ from 'jquery';
//*Import services
import { RecipesService,Recipe } from 'src/app/services/recipes.service';
import { CategoryService,CategoryCard } from 'src/app/services/category.service';
import { TagService, TagShort } from 'src/app/services/tag.service';
import { CountryService,Country } from 'src/app/services/country.service';

//import * as data from '../countries.json';


@Component({
  selector: 'app-home-guest',
  templateUrl: './home-guest.component.html',
  styleUrls: ['./home-guest.component.css']
})
export class HomeGuestComponent implements OnInit {
  //*Variables declaration
  showDropDown: boolean = false;
  isSearchIngredientsVisible: boolean = false;
  isSearch: boolean =  false;
  term: string = '';
  categoryId: number = 0;
  test:string  ='hello World!!';
  from: number;
  until: number;
  totalItems: number = 0;
  p: number = 1;
  rate: number = 3.5;
  showAlert: boolean = false;
  
  //*Objects declaration
  recipes: Recipe[];
  recipesRes: Recipe[];
  categories: CategoryCard[];
  searchModel = {searchTerm: '',
  categoryId: null,
  ingredientsId: null
  };
  recipesNames: any;
  //countries: Country[];
  tags: TagShort[];
  
  //*Create FormGroups
  recipeForm: FormGroup;
  searchTermForm: FormGroup;

  paginator: any;
  pages: number[];
  //*Test
  public exampleData: Array<Select2OptionData>;
  public options: Options;
  public value: string[];
  items = [
    {id: 1, name: 'Python'},
    {id: 2, name: 'Node Js'},
    {id: 3, name: 'Java'},
    {id: 4, name: 'PHP', disabled: true},
    {id: 5, name: 'Django'},
    {id: 6, name: 'Angular'},
    {id: 7, name: 'Vue'},
    {id: 8, name: 'ReactJs'},
  ];
  selected = [
    {id: 2, name: 'Node Js'},
    {id: 8, name: 'ReactJs'}
  ];


  public search1 = '';
  
  selectedStatic(result) {
    this.search1 = result;
  }

  constructor(private fb: FormBuilder, 
    private _recipeService: RecipesService,
    private _categoryService: CategoryService,
    private _tagService: TagService,
    private _countryService: CountryService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    ) 
  {
    
  }

  ngOnInit() {
    //*Create form grup for search by term
    // this.searchTermForm = this.formBuilder.group({
    //   searchTerm: ['', Validators.required],
    //   idCategory: ['',Validators.required]
    // });

    this._recipeService.getRecipeCard().subscribe(data => 
    {
      this.recipes = data;
      // this.recipes[0].thumbRoute = 'http://localhost:8080/api/uploads/recipes/' + this.recipes[0].thumbRoute;
      console.log(this.recipes[0].thumbRoute);
    });
  
    this._categoryService.getCategoriesCard(0,5).subscribe(response => 
      {
        if(!response.empty)
        {
          this.categories = response.content as CategoryCard
        }
    });

    this.getTagsShort();
  
    this.value = ['multiple2', 'multiple4'];

    //*Ingredients select config
    this.options = {
      width: '500',
      multiple: true,
      tags: true,
      placeholder: "Select your ingredients...",
      closeOnSelect: false,
      formatNoMatches: (term: string) => 'hey',
      formatSearching: () => 'papa'
    };
  }

  //!Initialize Form
  // initForm(): FormGroup {
  //   return this.recipeForm = this.fb.group({
  //     search: [null]
  //   })
  // }

  //*This function hidde or show the drop down list of search
  toggleDropDown(){
    this.showDropDown = !this.showDropDown;
  }

  //*This function show the search container
  toggleShowSearch(){
    this.isSearchIngredientsVisible = !this.isSearchIngredientsVisible;
  }

  //*This function clean the input value and hidde the list of suggestions
  hiddeDropDown()
  {
    this.showDropDown = false;
  }

  getValue(value)
  {
    this.recipeForm.patchValue({"search": value});
    this.showDropDown = false;
  }

  getSearchValue()
  {
    return this.recipeForm.value.search;
  }

  searchRecipeByIngredients():void
  {
    this.isSearch = true;
  }

  showRecipe(recipe)
  {
    this.router.navigate(['/recipe/',recipe.id]);
  }

  getTagsShort()
  {
    this._tagService.getTagsShort().subscribe(
      data => this.tags = data
    );
  }

  getRecipsCardsResults(term: string, idCategory: number,page: number)
  {
    this._recipeService.getRecipsCardsResults(term,idCategory, page).subscribe(response =>
      {
        if(response.content == 0){
          this.showAlert = true;
          console.log(this.recipesRes == undefined);
        }
        else{
          this.recipesRes = response.content as Recipe[];
          this.paginator = response; 
          this.totalItems = this.paginator.totalElements;
          this.p = this.paginator.number + 1;
        }
      });
  }


  /**
   * This function get the search results and show this results
   * @param term: term for find the names recipe 
   */
  searchRecipe(term){
    this._recipeService.getSearchForName(term).subscribe(data =>
    {
      this.recipesNames = data
      if(this.recipesNames.length == 0)
      {
        this.showDropDown = false;
      } 
      else{
        this.showDropDown = true;
      }
    });
  }

  /**
   * 
   * @param values: form values for search recipes
   */
  searchRecipeByTerm(values):void
  {
    this.isSearch = true;
    let term = values.searchTerm;
    let idCategory = values.idCategory;
    this.getRecipsCardsResults(term,idCategory,0);
  }

  /**
   * 
   * @param page 
   */
  public getPage(page: number):void
  {
    this.getRecipsCardsResults('a',1,page-1);
  }

  private goToRecipesByCategory(id: number):void
  {
    let route = `search/category/${id}/page/1`;
    this.router.navigate([route]);
  }

  private goToRecipesByTag(id: number): void
  {
    let route = `search/tag/${id}/page/1`;
    this.router.navigate([route]);
  }

  private Search(): void
  {
    console.log(this.searchModel);
    
    //*Search by term, category and ingredients
    if(this.searchModel.searchTerm != '' && this.searchModel.categoryId != null && this.searchModel.ingredientsId != null)
    {
      console.log('search all');
    }
    
    //*Search by term
    else if(this.searchModel.searchTerm != '' && this.searchModel.categoryId == null && this.searchModel.ingredientsId == null)
    {
      console.log('kaka')
      this._recipeService.getSearchForName(this.searchModel.searchTerm).subscribe(data =>
        {
          this.recipesNames = data
          console.log(data)
        },
        err =>
        {
          console.log(err);
        }
        );
    }
    //*Search by category 
    else if(this.searchModel.searchTerm == '' && this.searchModel.categoryId != null && this.searchModel.ingredientsId == null)
    {
      console.log('search by category');
    }
    //*Search by ingredients 
    else if(this.searchModel.searchTerm == '' && this.searchModel.categoryId == null && this.searchModel.ingredientsId != null)
    {
      console.log('search by ingredients');
    }
    //*Search by ingredients and term
    else if(this.searchModel.searchTerm != '' && this.searchModel.categoryId == null && this.searchModel.ingredientsId != null)
    {
      console.log('search by term and ingredients');
    }
    //*Search by category and term
    else if(this.searchModel.searchTerm != '' && this.searchModel.categoryId != null && this.searchModel.ingredientsId == null)
    {
      console.log('search by term and ingredients');
    }
  }

 
}
