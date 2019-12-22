import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar-guest',
  templateUrl: './navbar-guest.component.html',
  styleUrls: ['./navbar-guest.component.css']
})
export class NavbarGuestComponent implements OnInit {
  isMobile: boolean = false;
  
  constructor() { }

  ngOnInit() {
   

  }

  showMobileMenu(){
    this.isMobile = !this.isMobile;
  }
}
