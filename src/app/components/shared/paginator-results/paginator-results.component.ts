import { Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-paginator-results',
  templateUrl: './paginator-results.component.html',
  styleUrls: ['./paginator-results.component.css']
})
export class PaginatorResultsComponent implements OnInit {
  //*Declare object input
  @Input() public paginator: any;
  @Input() public test: string;
 
  //*Variables declaration
  from: number;
  until: number;

  //*Array declaration
  pages: number[];

  constructor() { }

  ngOnInit() {
   // alert(this.paginator);
  
   // this.pages  = new Array(this.paginator.totalPages).fill(0).map((value,index) => index +1);
 //   alert(this.pages);

  }

  ngOnChanges()
  {    
    
    this.from = Math.min(Math.max(1, this.paginator.number - 4),this.paginator.totalPages - 5);
    this.until = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6);
   
    if(this.paginator.totalPages > 5)
    {
      this.pages = new Array(this.until - this.from + 1).fill(0).map((value,index)=> index + this.from);
    }
    else
    {
      this.pages = new Array(this.paginator.totalPages).fill(0).map((value,index)=> index + 1);
    }
  }

}
