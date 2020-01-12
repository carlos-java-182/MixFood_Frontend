import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryList } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css',
            '../../../../../assets/css/navbarsearchStyles.css']
})
export class NavbarUserComponent implements OnInit {

  @Input('term') term?: string;
  //*Variable declarations
  private categories: CategoryList[] = [];
  private isMobile: boolean = false;
  private showModal: boolean = false;
  //*Create models
  private searchModel = {searchTerm: '',
  categoryId: null,
  ingredientsId: null
  };
  user: User;
  username: string;
  
  constructor(private _authService: AuthService,
    private _recipeService: RecipesService
    ,private router: Router) 
  {
    this.user = new User();
  }

  ngOnInit() 
  {
    this.user = this._authService.user;
    this.username = this.user.username;
  }

  private logout()
  {
    this._authService.logout();
  }

  
  showMobileMenu(){
    this.isMobile = !this.isMobile;
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
