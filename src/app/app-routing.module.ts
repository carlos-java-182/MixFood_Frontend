import { UserprofileComponent } from './components/shared/userprofile/userprofile.component';
import { CategoriesComponent } from './components/shared/categories/categories.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//1.- Importar componente

//*Import components
import { NavbarUserComponent } from './components/user/shared/navbar-user/navbar-user.component';
import { CreaterecipeUserComponent } from './components/user/recipes/createrecipe-user/createrecipe-user.component';
import { EditrecipeUserComponent } from './components/user/recipes/editrecipe-user/editrecipe-user.component';
import { HomeUserComponent } from './components/user/home-user/home-user.component';

import { NavbarGuestComponent } from './components/guest/navbar-guest/navbar-guest.component';
import { HomeGuestComponent } from './components/guest/home-guest/home-guest.component';
import { SearchrecipeGuestComponent } from './components/guest/searchrecipe-guest/searchrecipe-guest.component';
import { SearchresultsGuestComponent } from './components/guest/searchresults-guest/searchresults-guest.component';
import { CategoriesGuestComponent } from './components/guest/categories-guest/categories-guest.component';
import { LoginComponent } from './components/guest/login-guest/login.component';
import { SignupGuestComponent } from './components/guest/signup-guest/signup-guest.component';
import { ForgotpasswordGuestComponent } from './components/guest/forgotpassword-guest/forgotpassword-guest.component';

import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { NavbarAdminComponent } from './components/admin/navbar-admin/navbar-admin.component';
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
import { RecipeComponent } from './components/shared/recipe/recipe.component';
import { ReadComponent } from './components/admin/crud/read/read.component';
import { EditComponent } from './components/admin/crud/edit/edit.component';
import { CreateComponent } from './components/admin/crud/create/create.component';
import { ShowComponent } from './components/admin/crud/show/show.component';
import { SearchresultsComponent } from './components/shared/searchresults/searchresults.component';

import { SettingsUserComponent } from './components/user/settings-user/settings-user.component';
import { RecipesUserComponent } from './components/user/recipes/recipes-user/recipes-user.component';
import { FavoritesComponent } from './components/user/favorites/favorites.component';
import { AuthGuard } from './guards/auth.guard';
import {ProfileUserComponent} from './components/user/profile/profile-user/profile-user.component';
import { RoleGuard } from './guards/role.guard';
import { CreateUserComponent } from './components/admin/users/create-user/create-user.component';
import { Error404Component } from './components/shared/error404/error404.component';

//*Crud example imports


//2.- Asignar ruta al componente
//mipagina.com/path/path/path
const routes: Routes = [
  
  //*User routes
  // {component: ProfileUserComponent, path: 'user/profile-user', canActivate:[AuthGuard]},
  {component: HomeUserComponent, path: 'user/home'},
  {component: RecipesUserComponent, path: 'user/recipes', canActivate:[AuthGuard, RoleGuard]},
  {component: CreaterecipeUserComponent, path: 'user/recipes/create',canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
  {component: EditrecipeUserComponent, path: 'user/recipes/edit/:id', canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
  {component: RecipesUserComponent, path: 'user/recipes/page/:page/status/:status', canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
  {component: RecipesUserComponent, path: 'user/recipes/page/:page/term/:term/status/:status', canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
  {component: ProfileUserComponent, path: 'user/profile',canActivate: [AuthGuard, RoleGuard],data: {role: 'ROLE_USER'}},
 
  //*Guest routes
  {component: HomeGuestComponent, path: ''},
  
  {component: CategoriesGuestComponent, path: 'categories'},
  {component: CategoriesGuestComponent, path: 'categories/page/:page'},
  {component: LoginComponent, path: 'login'},
  {component: SignupGuestComponent, path: 'signup'},
  {component: ForgotpasswordGuestComponent, path: 'forgotpassword'},
  {component: RecipeComponent, path: 'recipe/:id'},

  //*Search components
  {component: SearchresultsComponent, path: 'search/:term/page/:page'},
  {component: SearchresultsComponent, path: 'search/category/:idCategory/page/:page'},
  {component: SearchresultsComponent, path: 'search/:term/category/:idCategory/page/:page'},
  {component: SearchresultsComponent, path: 'search/tag/:idTag/page/:page'},
  {component: SearchresultsComponent, path: 'search/ingredient/:ingredient/page/:page'},

  //*Admin routes
  {component: HomeAdminComponent, path: 'admin/home', canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},

  {component: CreateingredientsAdminComponent, path: 'admin/ingredients', canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},

  {component: CreatecategoriesAdminComponent, path: 'admin/categories', canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},

  {component: CreateUserComponent, path: 'admin/users', canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},

  {component:CreatetagsAdminComponent, path: 'admin/tags', canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},

  //*Shared components
  {component: UserprofileComponent, path: 'profile/:id'},
  {component: Error404Component, path: 'error404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
