import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate 
{
  constructor(private _authServiche: AuthService, private router: Router)
  {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this._authServiche.isAuthenticated())
      {
        console.log('YOU CANT NOT!!!')
        this.router.navigate(['/login']);
        return false;
      }
    
    let role = next.data['role'] as string;
    console.log('ROLE in roles: '+role);
    if(this._authServiche.hasRole(role))
    {
      console.log('YOU HAVE ACCESS!!');
      return true;
    }  
    console.log('ACCESS DENEGATE!!!');
    this.router.navigate(['/login']);
    return false;
  } 
}
