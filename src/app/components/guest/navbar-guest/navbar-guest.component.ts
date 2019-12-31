import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-guest',
  templateUrl: './navbar-guest.component.html',
  styleUrls: ['./navbar-guest.component.css']
})
export class NavbarGuestComponent implements OnInit {
  @Input('term') term?: string;
 
  isMobile: boolean = false;
  
  constructor(private router: Router) { }

  ngOnInit() 
  {
    if(this.term == undefined)
    {
      this.term = '';
    }
  }

  showMobileMenu(){
    this.isMobile = !this.isMobile;
  }

  public goToPage(term)
  {
    this.router.navigate(['search/'+term+'/page/1']);
  }
}
