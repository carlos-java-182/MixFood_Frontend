import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NavbarUserComponent } from './components/user/shared/navbar-user/navbar-user.component';
import { HomeUserComponent } from './components/user/home-user/home-user.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CmptestComponent } from './components/admin/cmptest/cmptest.component';
import { NavbarAdminComponent } from './components/admin/shared/navbar-admin/navbar-admin.component';
import { ProfileUserComponent } from './components/user/profile/profile-user/profile-user.component';
import { CreaterecipeUserComponent } from './components/user/recipes/createrecipe-user/createrecipe-user.component';
import { EditrecipeUserComponent } from './components/user/recipes/editrecipe-user/editrecipe-user.component';
import { NavbarGuestComponent } from './components/guest/navbar-guest/navbar-guest.component';
import { HomeGuestComponent } from './components/guest/home-guest/home-guest.component';

import { SearchresultsGuestComponent } from './components/guest/searchresults-guest/searchresults-guest.component';
import { CategoriesGuestComponent } from './components/guest/categories-guest/categories-guest.component';
import { SignupGuestComponent } from './components/guest/signup-guest/signup-guest.component';
import { ForgotpasswordGuestComponent } from './components/guest/forgotpassword-guest/forgotpassword-guest.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { IngredientsAdminComponent } from './components/admin/ingredients/ingredients-admin/ingredients-admin.component';
import { CreateingredientsAdminComponent } from './components/admin/ingredients/createingredients-admin/createingredients-admin.component';
import { EditingredientsAdminComponent } from './components/admin/ingredients/editingredients-admin/editingredients-admin.component';
import { CategoriesAdminComponent } from './components/admin/categories/categories-admin/categories-admin.component';
import { CreatecategoriesAdminComponent } from './components/admin/categories/createcategories-admin/createcategories-admin.component';
import { EditcategoriesAdminComponent } from './components/admin/categories/editcategories-admin/editcategories-admin.component';
import { UsersAdminComponent } from './components/admin/users/users-admin/users-admin.component';
import { CreatetagsAdminComponent } from './components/admin/tags/createtags-admin/createtags-admin.component';
import { EditusersAdminComponent } from './components/admin/users/editusers-admin/editusers-admin.component';
import { TagsAdminComponent } from './components/admin/tags/tags-admin/tags-admin.component';
import { EdittagsAdminComponent } from './components/admin/tags/edittags-admin/edittags-admin.component';
import { SearchrecipeGuestComponent } from './components/guest/searchrecipe-guest/searchrecipe-guest.component';
import { EditprofileUserComponent } from './components/user/profile/editprofile-user/editprofile-user.component';
import { RecipesUserComponent } from './components/user/recipes/recipes-user/recipes-user.component';
import { LoginComponent } from './components/guest/login-guest/login.component';

//*Depencences 
import { NgSelect2Module } from 'ng-select2';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxTypeaheadModule} from 'ngx-typeahead';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
//import { NgxTypeAheadComponent } from 'ngx-typeahead/src/modules/ngx-typeahead.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';  
import { CarouselModule } from 'ngx-owl-carousel-o';
import {TimeAgoPipe} from 'time-ago-pipe';
import { RecipeComponent } from './components/shared/recipe/recipe.component';
import { ReadComponent } from './components/admin/crud/read/read.component';
import { CreateComponent } from './components/admin/crud/create/create.component';
import { EditComponent } from './components/admin/crud/edit/edit.component';
import { ShowComponent } from './components/admin/crud/show/show.component';
import { SearchresultsComponent } from './components/shared/searchresults/searchresults.component';
import { PaginatorResultsComponent } from './components/shared/paginator-results/paginator-results.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BarRatingModule } from "ngx-bar-rating";
import { UserprofileComponent } from './components/shared/userprofile/userprofile.component';
import { QuillModule } from 'ngx-quill';
import { SignupFormComponent } from './components/guest/shared/signup-form/signup-form.component';
import { ComparePasswordsValidatorDirective } from './directives/compare-passwords-validator.directive';
import { RecipeCardPopularComponent } from './components/shared/recipe-card-popular/recipe-card-popular.component';
import { RecipeCardLatestComponent } from './components/shared/recipe-card-latest/recipe-card-latest.component';
import { SettingsUserComponent } from './components/user/settings-user/settings-user.component';
import { FavoritesComponent } from './components/user/favorites/favorites.component';
import { AuthComponent } from './services/auth/auth.component';
import { RecipeCardPrincipalComponent } from './components/shared/recipe-card-principal/recipe-card-principal.component';
import { FormRecipeComponent } from './components/user/shared/form-recipe/form-recipe.component';
import { CategoriesComponent } from './components/shared/categories/categories.component';
import { LoginFormComponent } from './components/guest/shared/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarUserComponent,
    HomeUserComponent,
    FooterComponent,
    CmptestComponent,
    NavbarAdminComponent,
    ProfileUserComponent,
    CreaterecipeUserComponent,
    EditrecipeUserComponent,
    NavbarGuestComponent,
    HomeGuestComponent,
    SearchresultsGuestComponent,
    CategoriesGuestComponent,
    SignupGuestComponent,
    ForgotpasswordGuestComponent,
    HomeAdminComponent,
    IngredientsAdminComponent,
    CreateingredientsAdminComponent,
    EditingredientsAdminComponent,
    CategoriesAdminComponent,
    CreatecategoriesAdminComponent,
    EditcategoriesAdminComponent,
    UsersAdminComponent,
    CreatetagsAdminComponent,
    EditusersAdminComponent,
    TagsAdminComponent,
    EdittagsAdminComponent,
    SearchrecipeGuestComponent,
    EditprofileUserComponent,
    RecipesUserComponent,
    LoginComponent,
    TimeAgoPipe,
    RecipeComponent,
    ReadComponent,
    CreateComponent,
    EditComponent,
    ShowComponent,
    SearchresultsComponent,
    PaginatorResultsComponent,
    UserprofileComponent,
    SignupFormComponent,
    ComparePasswordsValidatorDirective,
    RecipeCardPopularComponent,
    RecipeCardLatestComponent,
    SettingsUserComponent,
    FavoritesComponent,
    AuthComponent,
    RecipeCardPrincipalComponent,
    FormRecipeComponent,
    CategoriesComponent,
    LoginFormComponent

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelect2Module,
    NgSelectModule,
    NgxTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    //NgbModule,
    CarouselModule ,
    NgxPaginationModule,
    BarRatingModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
