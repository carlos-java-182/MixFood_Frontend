import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate 
{

  constructor(private _authServiche: AuthService, private router: Router)
  {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    //*Validate if user is loggedin
    if(this._authServiche.isLoggedIn())
    {
      return true;
      console.log('IN GUARD!!!')
    }
    //*Redirect user to login if this is not logged
    this.router.navigate(['/login']);
    return false;
  }
  
}
