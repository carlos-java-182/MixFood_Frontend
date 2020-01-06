import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-card-latest',
  templateUrl: './recipe-card-latest.component.html',
  styleUrls: ['./recipe-card-latest.component.css']
})
export class RecipeCardLatestComponent implements OnInit {
  @Input('recipe') recipe: any;
  constructor() { }

  private index: number = 0;
  ngOnInit() {
  }

}
