import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { CountryService,Country } from 'src/app/services/country.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecipesService } from 'src/app/services/recipes.service';
import { CategoryService, CategoryList } from 'src/app/services/category.service';
import { throwIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-navbar-guest',
  templateUrl: './navbar-guest.component.html',
  styleUrls: ['./navbar-guest.component.css']
})
export class NavbarGuestComponent implements OnInit {
  @Input('term') term?: string;
 
  //*Variable declarations
  private categories: CategoryList[];
  private isMobile: boolean = false;
  //*Create models
  private searchModel = {searchTerm: '',
  categoryId: null,
  ingredientsId: null
  };


  //*Create forms group
  private loginForm: FormGroup;
  
  constructor(private router: Router,
              private _countryService: CountryService,
              private _recipeService: RecipesService,
              private _categoryService: CategoryService,
              private formBuilder: FormBuilder
              ) { }

  ngOnInit() 
  {
    this.loginForm = this.formBuilder.group(
    {
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });

    this._categoryService.getCategoriesList().subscribe(data =>
    {
      this.categories = data;
    });
    


    if(this.term == undefined)
    {
      this.term = '';
    }

    //this.countries = this._countryService.getountries();
  }

  showMobileMenu(){
    this.isMobile = !this.isMobile;
  }

  public goToPage(term)
  {
    
  }

  public login()
  {

  }

  private search()
  {
    let route: string;
    console.log(this.searchModel);
    //*Search by term, category and ingredients
    if(this.searchModel.searchTerm != '' && this.searchModel.categoryId != null && this.searchModel.ingredientsId != null)
    {
      console.log('search all');
    }
    
    //*Search by term
    else if(this.searchModel.searchTerm != '' && this.searchModel.categoryId == null && this.searchModel.ingredientsId == null)
    {
      this._recipeService.getSearchForName(this.searchModel.searchTerm).subscribe(data =>
        {
          route = `/search/${this.searchModel.searchTerm}/page/1`;
          this.router.navigate([route]);
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
      route = `search/category/${this.searchModel.categoryId}/page/0`;
      this.router.navigate([route]);
    }
    //*Search by ingredients 
    else if(this.searchModel.searchTerm == '' && this.searchModel.categoryId == null && this.searchModel.ingredientsId != null)
    {
      console.log('search by ingredient');
      route = `search/ingredient/${this.searchModel.ingredientsId}/page/0`;
      this.router.navigate([route]);
    }
    //*Search by ingredients and term
    else if(this.searchModel.searchTerm != '' && this.searchModel.categoryId == null && this.searchModel.ingredientsId != null)
    {
      console.log('search by term and ingredients');
    }
    //*Search by category and term
    else if(this.searchModel.searchTerm != '' && this.searchModel.categoryId != null && this.searchModel.ingredientsId == null)
    {
      console.log('search by term and categories');
      route = `search/category/${this.searchModel.searchTerm}/${this.searchModel.categoryId}/page/0`;
      this.router.navigate([route]);
    }
  }
}
