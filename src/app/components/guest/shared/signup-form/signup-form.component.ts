import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from 'src/app/helpers/PasswordValidation';
import { CountryService, Country } from 'src/app/services/country.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  //*Create forms group
  signupForm: FormGroup;

  //*Objects declaration
  countries: Country[];
  user: User;
  private isEmailInUse: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private _countryService: CountryService,
              private _userService: UserService) 
              {
                this.user = new User(); 
              }

  ngOnInit() 
  {
    this.countries = this._countryService.getountries();
    this.formInit();
  }


  private formInit():void
  {
    this.signupForm = this.formBuilder.group({
      name: ['',Validators.required],
      lastName: ['',Validators.required],
      gender: ['',Validators.required],
      dateBirth: ['',Validators.required],
      country: [null,Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',[Validators.required,Validators.minLength(6)]]
    },
    {
      validator: PasswordValidation.MatchPassword
    }
    );
  }

  signup()
  {
    this.user.email = 'carlos4@mixfood.com';
    this.user.password = 'password';
    this.user.country = 'mexico';
    this.user.dateBirth = '1980-01-01';
    this.user.gender = 'MALE';
    this.user.name = 'Carlos';
    this.user.lastname = 'Villasenor';

    this._userService.signUp(this.user).subscribe(response => 
      {
        console.log(response);
      
      },
      err =>
      {
        console.log(err);
        if(err.status == 404)
        {
          this.isEmailInUse = true;
        }
      })
  //  console.log(this.signupForm.value);
  }
}
