import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  private showLoader: boolean = true;

  constructor() { }

  ngOnInit()
  {
    setTimeout(() => 
    {
      this.showLoader = false;
    },
    1000);
  }

}
