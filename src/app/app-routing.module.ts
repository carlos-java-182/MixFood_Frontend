import { UserprofileComponent } from './components/shared/userprofile/userprofile.component';
import { CategoriesComponent } from './components/shared/categories/categories.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//1.- Importar componente

//*Import components
import { NavbarUserComponent } from './components/user/shared/navbar-user/navbar-user.component';
import { EditprofileUserComponent } from './components/user/profile/editprofile-user/editprofile-user.component';
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
//*Crud example imports


//2.- Asignar ruta al componente
//mipagina.com/path/path/path
const routes: Routes = [
  
  //*User routes
  {component: ProfileUserComponent, path: 'user/profile-user', canActivate:[AuthGuard]},
  {component: EditprofileUserComponent, path: 'user/profile/editprofile-user', canActivate:[AuthGuard]},
  {component: HomeUserComponent, path: 'user/home'},
  {component: SettingsUserComponent, path: 'user/settings', canActivate:[AuthGuard]},
  {component: RecipesUserComponent, path: 'user/recipes', canActivate:[AuthGuard]},
  {component:FavoritesComponent, path: 'user/favorites', canActivate:[AuthGuard]},
  {component: CreaterecipeUserComponent, path: 'user/recipes/createrecipe', canActivate:[AuthGuard]},
  {component: EditrecipeUserComponent, path: 'user/recipes/edit/:id', canActivate:[AuthGuard]},
  {component: RecipesUserComponent, path: 'user/recipes/page/:page/status/:status', canActivate:[AuthGuard]},
  {component: RecipesUserComponent, path: 'user/recipes/page/:page/term/:term/status/:status', canActivate:[AuthGuard]},
  {component: ProfileUserComponent, path: 'user/profile'},
 
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
  {component: HomeAdminComponent, path: 'admin/home', canActivate:[AuthGuard]},
  {component: IngredientsAdminComponent, path: 'admin/ingredients', canActivate:[AuthGuard]},
  {component: CreateingredientsAdminComponent, path: 'admin/ingredients/create', canActivate:[AuthGuard]},
  {component: EditingredientsAdminComponent, path: 'admin/ingredients/ediit/:id', canActivate:[AuthGuard]},
  {component: CategoriesAdminComponent, path: 'admin/categories'},
  {component: CreatecategoriesAdminComponent, path: 'admin/categories/create', canActivate:[AuthGuard]},
  {component: EditcategoriesAdminComponent, path: 'admin/categories/edit/:id', canActivate:[AuthGuard]},
  {component: UsersAdminComponent, path: 'admin/users', canActivate:[AuthGuard]},
  {component: CreatetagsAdminComponent, path: 'admin/users/create', canActivate:[AuthGuard]},
  {component: EditusersAdminComponent, path: 'admin/users/edit/:id', canActivate:[AuthGuard]},
  {component: TagsAdminComponent, path: 'admin/tags', canActivate:[AuthGuard]},
  {component: EdittagsAdminComponent, path: 'admin/tags/edit/:id', canActivate:[AuthGuard]},
  {component:CreatetagsAdminComponent, path: 'admin/tags/create', canActivate:[AuthGuard]},

  //*Shared components
  {component: UserprofileComponent, path: 'profile/:id'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
