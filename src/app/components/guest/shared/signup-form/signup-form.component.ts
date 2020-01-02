import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from 'src/app/helpers/PasswordValidation';
import { CountryService, Country } from 'src/app/services/country.service';

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

  constructor(private formBuilder: FormBuilder,
              private _countryService: CountryService) { }

  ngOnInit() {
  
    this.countries = this._countryService.getountries();
  

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
    console.log(this.signupForm.value);
  }
}
