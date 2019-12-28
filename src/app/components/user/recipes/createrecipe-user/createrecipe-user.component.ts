import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { IngredientService, IngredientList } from 'src/app/services/ingredient.service';
import { CategoryService, CategoryCard } from 'src/app/services/category.service';
import { element } from 'protractor';
import { stringify } from 'querystring';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-createrecipe-user',
  templateUrl: './createrecipe-user.component.html',
  styleUrls: ['./createrecipe-user.component.css']
})
export class CreaterecipeUserComponent implements OnInit {

  @ViewChild('attachments', {static: false}) 
   attachment: ElementRef;

  //*Variables declaration */
  //Index of ingredient list
  indexList: number = 0;
  imagesCount: number = 0;
  indexThumb: number = 0; 
  isEditIngredient: boolean = false;
  selectedFile: File = null;
  
  //*Objects declaration*//
  //*Ingredients list for select
  ingredients: IngredientList[];
  //*Categories list for select
  categories: CategoryCard[];
  ingredientsList: any[] = [];
  ingredientsRecipe: any[] = [];
  imagesURL: any[] = [];
  //*Ingredients model
  ingredientModel = {id: -1, amountIngredient: 'papa'}

  fileList: File[] = [];
  constructor(
    private _ingredientService: IngredientService,
    private _categoryService: CategoryService) 
       { }

  ngOnInit() {
    this._categoryService.getCategoriesCard().subscribe(data => 
      {
        this.categories = data;
    });

    this._ingredientService.getIngredientsList().subscribe(data =>
      {
        this.ingredients = data;
      });
    this.getIngredientsList();
  }

  public getIngredientsList():void
  {
   
  }

  /**
   * 
   * @param ingredientId: id ingredient
   * @param amount: amount of ingredient
   */
  public addIngredient(ingredientId: number, amount: string):void
  {
    //*Create ingredient and find the name by id
    let ingredient =
    {
      id: ingredientId,
      name: this.ingredients.find(element => element.id === ingredientId).name,
      amount: amount
    }

    //*Add ingredient to list for show in the front
    this.ingredientsList.push(ingredient);

    //*Clear model
    this.clearIngredients();
  }

  /**
   * 
   * @param index 
   */
  public removeIngredient(index: number):void
  {
    this.ingredientsList.splice(index, 1);
  }

  public editIngredient(index: number):void 
  {
    this.indexList = index;

    //*Get ingredient by index
    let ingredient = this.ingredientsList[index];
    
    //*Set ingredient model
    this.ingredientModel.id = ingredient.id;
    this.ingredientModel.amountIngredient = ingredient.amount; 

    //*Shot update button
    this.isEditIngredient = true;
  }

  public updateIngredient():void
  {
    //*Find name ingredient by id
    let name = this.ingredients.find(element => element.id === this.ingredientModel.id).name;

    //*Add changes to list
    this.ingredientsList[this.indexList].name = name;
    this.ingredientsList[this.indexList].amount = this.ingredientModel.amountIngredient;
    
    //*Show add button
    this.isEditIngredient = false;
    
    //*Clear model
    this.clearIngredients();  
  }

  /**
   * This function cleans the ingredient model
   */
  public clearIngredients():void
  {
    this.ingredientModel.id = 0;
    this.ingredientModel.amountIngredient = '';
  }

  public onFileSelected(event: any): void
  {
    //*Get images length
    let elements = event.target.files.length;
    //*Validate max images 
    if(elements > 5)
    {
      alert("STOP!!");
    }
    else
    {
      for(let i = 0; i < elements; i++)
      {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) =>
        {
          this.imagesURL.push(event.target.result);
          console.log(event.target.result);
        }
      }
    }
  }

  public selecAsThumb(index: number): void
  {
    this.indexThumb = index;
  }

  public removeImage(index: number): void
  {
    this.imagesURL.splice(index, 1);
    console.log(this.test);
  }
}
