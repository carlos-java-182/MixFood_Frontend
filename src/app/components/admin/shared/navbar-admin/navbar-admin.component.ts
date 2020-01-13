import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css',
  '../../../../../assets/css/navbarsearchStyles.css']
})
export class NavbarAdminComponent implements OnInit 
{

  private username: string;
  private isMobile: boolean;

  constructor(private _authService: AuthService) { }

  ngOnInit() 
  {
    this.username = this._authService.user.username;
  }

  private logout()
  {
    this._authService.logout();
  }

    
  showMobileMenu(){
    this.isMobile = !this.isMobile;
  }
}
