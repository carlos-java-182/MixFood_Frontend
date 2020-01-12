import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

  user: User;
  username: string;
  
  constructor(private _authService: AuthService) 
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

}
