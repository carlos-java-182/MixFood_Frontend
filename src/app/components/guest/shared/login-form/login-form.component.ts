import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  //*Create forms group
  private loginForm: FormGroup;
  private isNovalidAuth: boolean = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() 
  {
    this.formInit();
  }

  private login()
  {
    this.isNovalidAuth = true;
  }
  private formInit()
  {
    this.loginForm = this.formBuilder.group(
    {
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }
}
