import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {
  private recipes: any;
  private page: number;
  private term: string;
  
  constructor(private _recipeservice: RecipesService,
              private activateroute: ActivatedRoute) { }

  ngOnInit() 
  {
    this.activateroute.paramMap.subscribe( params => 
    {
      let page:number = +params.get('page');
      this.term = params.get('term');
      this.page = Number(params.get('page'));
      this.getRecipeCardsByName();
    });
    
  }



  getRecipeCardsByName()
  {
    this._recipeservice.getRecipeCardsByName(this.term,this.page).subscribe(data =>
      {
        
       console.log(data);
      });
  }

  showRecipe(recipe)
  {

  }

}
