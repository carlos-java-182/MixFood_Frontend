import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { CountryService,Country } from 'src/app/services/country.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-navbar-guest',
  templateUrl: './navbar-guest.component.html',
  styleUrls: ['./navbar-guest.component.css']
})
export class NavbarGuestComponent implements OnInit {
  @Input('term') term?: string;
 
  //*
  isMobile: boolean = false;

  //*Objects declaration
  countries: Country[];

  //*Create forms group
  loginForm: FormGroup;
  
  constructor(private router: Router,
              private _countryService: CountryService,
              formBuilder: FormBuilder
              ) { }

  ngOnInit() 
  {
    if(this.term == undefined)
    {
      this.term = '';
    }

    this.countries = this._countryService.getountries();
  }

  showMobileMenu(){
    this.isMobile = !this.isMobile;
  }

  public goToPage(term)
  {
    if(term != '')
    {
      this.router.navigate(['search/'+term+'/page/1']);
    }
  }
}
