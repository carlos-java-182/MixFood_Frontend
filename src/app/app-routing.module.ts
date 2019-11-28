import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeUserComponent } from './components/user/home-user/home-user.component';

//mipagina.com/path/path/path
const routes: Routes = [
  {component: HomeUserComponent, path: 'user/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
