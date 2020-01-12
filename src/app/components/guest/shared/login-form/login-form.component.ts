import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { access } from 'fs';
import {User} from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  //*Create forms group
  private loginForm: FormGroup;
  private isNovalidAuth: boolean = false;
  private user: User;

  constructor(private formBuilder: FormBuilder,
              private _authService: AuthService,
              private router: Router) 
              {
                this.user = new User();
               }

  ngOnInit() 
  {
    this.formInit();
  }

  private login(values)
  {
    // let user: User = 
    // {
    //  email: this.loginForm.get('email').value,
    //  password: this.loginForm.get('password').value 
    // }
    this.user.email = 'carlos3@mixfood.com';
    this.user.password = 'password' ;
    // this.user.email = 'york@mixfood.com';
    // this.user.password = '123456' ;
    // this.user.email = this.loginForm.get('email').value;
    // this.user.password = this.loginForm.get('password').value ;

    this._authService.login(this.user).subscribe(response=>
    {
      this._authService.saveToken(response.access_token);
      this._authService.saveUser(response.access_token); 
      let user = this._authService.user;  
      let auth = this._authService.isAuthenticated();
     // console.log(sessionStorage);
      //console.log(auth);  
      console.log('You are logged!!');
      this.router.navigate(['/user/profile']);
    },
    err =>
    {
      if(err.status == 400)
      {
        alert('Auth invalid!');
      }
    });
    
    //this.isNovalidAuth = true;
  }

 
 

  /**
   **This function initialize the form in the wiew
   */
  private formInit()
  {
    //*Create form group and add specify validations
    this.loginForm = this.formBuilder.group(
    {
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }
}
