import { Component, OnInit } from '@angular/core';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Ingredient } from 'src/app/models/ingredient';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createingredients-admin',
  templateUrl: './createingredients-admin.component.html',
  styleUrls: ['./createingredients-admin.component.css']
})
export class CreateingredientsAdminComponent implements OnInit {
  //*Variables declaration
  private itemsPerPage = 10;
  private totalItems: number = 0;
  private currentPage = 1;
  private totalPages: number;
  private idIngredient: number;
  private index: number;

  private isEdit: boolean = false;
  //*Objects declaration
  private ingredients = [];

  private form: FormGroup;
  constructor(private _ingredientService: IngredientService,private formBuilder: FormBuilder)
  {
  
  }

  ngOnInit() {
    this.getIngredientsPages(0);
    this.formInit();
  }

  private formInit()
  {
    this.form =  this.formBuilder.group({
      name: ['',Validators.required]
    });
  }
  private getIngredientsPages(page: number)
  {
    this._ingredientService.getIngredientsPages(page,this.itemsPerPage).subscribe(response =>
    {
      if(!response.empty)
      {
        console.log(response);
        this.totalItems = response.totalElements;
        //*Get current page of results 
        this.currentPage = response.number + 1;
        this.totalPages = response.totalPages;
        this.ingredients = response.content as Ingredient[];
      }
    
    },
    err =>
    {
      console.log(err);
    }
    );
  }

  private remove(index: number)
  {
    this.index = index;
    console.log(index);
    let id = this.ingredients[index].id;
    this._ingredientService.delete(id).subscribe(response =>
      {
        console.log(response);
        this.ingredients.splice(index,1);
      },
      err =>
      {
        console.log(err);
      });
  }
  private edit(index: number)
  {
    this.index = index;
    this.idIngredient  = this.ingredients[index].id;
    this.form.setValue({name: this.ingredients[index].name });
    this.isEdit = true;
  }

  private getPage(page: number)
  {
    this.getIngredientsPages(page-1);
  }

  private update()
  {
    let ingredient = new Ingredient();
    ingredient.name = this.form.get('name').value;
    this._ingredientService.update(this.idIngredient,ingredient).subscribe(response =>
    {
      console.log(response);
      this.ingredients[this.index] = response; 
      this.form.reset();
      this.isEdit = false;
    },
    err =>
    {
      console.log(err);
    });
  }

  private create()
  {
    let ingredient = new Ingredient();
    ingredient.name = this.form.get('name').value;
    this._ingredientService.create(ingredient).subscribe(response =>
    {
      console.log(response);
      this.ingredients.push(response.ingredient);
      this.form.reset();
    },
    err =>
    {
      console.log(err);
    });
  }
}
