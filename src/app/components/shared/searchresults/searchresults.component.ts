import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {
  recipes: any;
  constructor(private _recipeservice: RecipesService,
              private activateroute: ActivatedRoute) { }

  ngOnInit() 
  {
    this.activateroute.paramMap.subscribe( params => {
      let page:number = +params.get('page');
      if(!page)
      {
        page = 0;
      }
      this.getRecipsCardsResults('al',1,0);
    }
    );
    
  }

  getRecipsCardsResults(term: string, idCategory: number,page: number)
  {
    this._recipeservice.getRecipsCardsResults(term,idCategory, page).subscribe(data =>
      {
        this.recipes = data;
       console.table(this.recipes);
      });
  }

  showRecipe(recipe)
  {

  }

}
