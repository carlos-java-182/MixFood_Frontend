import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarUserComponent } from './components/user/shared/navbar-user/navbar-user.component';
import { HomeUserComponent } from './components/user/home-user/home-user.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CmptestComponent } from './components/admin/cmptest/cmptest.component';
import { NavbarAdminComponent } from './components/admin/shared/navbar-admin/navbar-admin.component';
import { ProfileUserComponent } from './components/user/profile-user/profile-user.component';
import { CreaterecipeUserComponent } from './components/user/createrecipe-user/createrecipe-user.component';
import { EditrecipeUserComponent } from './components/user/editrecipe-user/editrecipe-user.component';
import { NavbarGuestComponent } from './components/guest/navbar-guest/navbar-guest.component';
import { HomeGuestComponent } from './components/guest/home-guest/home-guest.component';

import { SearchresultsGuestComponent } from './components/guest/searchresults-guest/searchresults-guest.component';
import { CategoriesGuestComponent } from './components/guest/categories-guest/categories-guest.component';
import { SignupGuestComponent } from './components/guest/signup-guest/signup-guest.component';
import { ForgotpasswordGuestComponent } from './components/guest/forgotpassword-guest/forgotpassword-guest.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { IngredientsAdminComponent } from './components/admin/ingredients-admin/ingredients-admin.component';
import { CreateingredientsAdminComponent } from './components/admin/createingredients-admin/createingredients-admin.component';
import { EditingredientsAdminComponent } from './components/admin/editingredients-admin/editingredients-admin.component';
import { CategoriesAdminComponent } from './components/admin/categories-admin/categories-admin.component';
import { CreatecategoriesAdminComponent } from './components/admin/createcategories-admin/createcategories-admin.component';
import { EditcategoriesAdminComponent } from './components/admin/editcategories-admin/editcategories-admin.component';
import { UsersAdminComponent } from './components/admin/users-admin/users-admin.component';
import { CreatetagsAdminComponent } from './components/admin/createtags-admin/createtags-admin.component';
import { EditusersAdminComponent } from './components/admin/editusers-admin/editusers-admin.component';
import { TagsAdminComponent } from './components/admin/tags-admin/tags-admin.component';
import { EdittagsAdminComponent } from './components/admin/edittags-admin/edittags-admin.component';
import { SearchrecipeGuestComponent } from './components/guest/searchrecipe-guest/searchrecipe-guest.component';
import { EditprofileUserComponent } from './components/user/editprofile-user/editprofile-user.component';



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

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
