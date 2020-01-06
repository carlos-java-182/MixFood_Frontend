import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card-principal',
  templateUrl: './recipe-card-principal.component.html',
  styleUrls: ['./recipe-card-principal.component.css']
})
export class RecipeCardPrincipalComponent implements OnInit {
  @Input('recipe') 
  private recipe: Recipe;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  private goToCategory(id: number): void 
  {
    let path = `search/category/${id}/page/1`;
    this.router.navigate([path]);
  }

  private goToTag(id: number): void 
  {
    let path = `search/tag/${id}/page/1`;
    this.router.navigate([path]);
  }

}
