import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { IngredientService, IngredientList } from 'src/app/services/ingredient.service';
import { CategoryService, CategoryCard } from 'src/app/services/category.service';
import { element } from 'protractor';
import { stringify } from 'querystring';
import { ProfileService } from 'src/app/services/profile.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RecipesService, NewRecipe } from 'src/app/services/recipes.service';
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
  userId: number = 1;
  indexList: number = 0;
  imagesCount: number = 0;
  indexThumb: number = 0; 
  isEditIngredient: boolean = false;
  selectedFile: File = null;
  thumbRoute: any
 // recipeStatus: RecipeStatus.public;

  
  //*Objects declaration*//
  //Ingredients list for select
  ingredients: IngredientList[];
  //Categories list for select
  categories: CategoryCard[];
  
  ingredientsList: any[] = [];
  ingredientsRecipe: any[] = [];
  imagesURL: any[] = [];
  
  //*Modes 
  //Ingredients model
  ingredientModel = {id: null, amountIngredient: 'papa'}
  //Recipe model
  recipeModel = {
    name: '', 
    categoryId: null,
    description: '',
    videFrame: '',
    prepHours: '',
    preMinutes: '',
    preparationSteps: ''
  }
  
  //*Array images 
  fileList: File[] = [];

  //*Editor toolbar config
  editorConfig = {
    toolbar: [
      ['bold','italic','underline','strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'align': [] }],            
    ]

  };

  constructor(
    private _ingredientService: IngredientService,
    private _categoryService: CategoryService,
    private _recipeService: RecipesService,
    private formBuilder: FormBuilder) 
       { }

  ngOnInit() 
  {
   

    this.getCategoriesList();    
    this.getIngredientsList();
  }

  public getCategoriesList():void
  {
    this._categoryService.getCategoriesCard().subscribe(data => 
      {
        this.categories = data;
    });
  }

  public getIngredientsList():void
  {
    this._ingredientService.getIngredientsList().subscribe(data =>
      {
        this.ingredients = data;
    });     
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
   
  }

  public createRecipe():void
  {
    //*Create object
    let newRecipe: NewRecipe =
    {
      name: this.recipeModel.name,
      preparationTime: this.recipeModel.prepHours +' '+ this.recipeModel.preMinutes,
      description: this.recipeModel.description,
      thumbRoute: 'route',
      preparationSteps: this.recipeModel.preparationSteps,
      difficulty: '',
      status: '',
      videFrame: this.recipeModel.videFrame,
      category: 
      {
        id: this.recipeModel.categoryId
      },
      user:
      {
        id: this.userId
      }
    }
    console.log(JSON.stringify(newRecipe));

    this._recipeService.createRecipe(newRecipe).subscribe(response => 
      {
        console.log(response);
      });
 //   console.log(newRecipe);
  }

  public createIngredientsRecipe(): void
  {

  }

  public createImagesRecipe(): void{

  }
}
 