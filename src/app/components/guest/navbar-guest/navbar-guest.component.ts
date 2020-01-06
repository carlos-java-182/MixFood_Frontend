import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { CountryService,Country } from 'src/app/services/country.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar-guest',
  templateUrl: './navbar-guest.component.html',
  styleUrls: ['./navbar-guest.component.css']
})
export class NavbarGuestComponent implements OnInit {
  @Input('term') term?: string;
 
  //*
  private isMobile: boolean = false;
  private searchModel = {searchTerm: '',
  categoryId: null,
  ingredientsId: null
  };


  //*Create forms group
  private loginForm: FormGroup;
  
  constructor(private router: Router,
              private _countryService: CountryService,
              private formBuilder: FormBuilder
              ) { }

  ngOnInit() 
  {
    this.loginForm = this.formBuilder.group(
    {
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });

    


    if(this.term == undefined)
    {
      this.term = '';
    }

    //this.countries = this._countryService.getountries();
  }

  showMobileMenu(){
    this.isMobile = !this.isMobile;
  }

  public goToPage(term)
  {
    console.log(term);
    if(term != '')
    {
      this.router.navigate(['search/'+term+'/page/1']);
    }
  }

  public login()
  {

  }
}
