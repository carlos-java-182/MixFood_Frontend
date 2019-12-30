import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { IngredientService, IngredientList } from 'src/app/services/ingredient.service';
import { CategoryService, CategoryCard } from 'src/app/services/category.service';
import { element } from 'protractor';
import { stringify } from 'querystring';
import { ProfileService } from 'src/app/services/profile.service';
import { FormGroup, FormControl, Validators, FormBuilder, RangeValueAccessor } from '@angular/forms';
import { RecipesService, NewRecipe, RecipeIngredient } from 'src/app/services/recipes.service';

import  Swal  from 'sweetalert2';
import { TagService, TagShort } from 'src/app/services/tag.service';
import { ImageService } from 'src/app/services/image.service';
import { Router } from '@angular/router';

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
  thumbSelectedRoute: string;
 // recipeStatus: RecipeStatus.public;

  
  //*Objects declaration*//
  //Ingredients list for select
  ingredients: IngredientList[];
  //Categories list for select
  categories: CategoryCard[];
  //Tags list for multiple select
  tags: TagShort[];
  
  ingredientsList: any[] = [];
  ingredientsRecipe: any[] = [];
  imagesURL: any[] = [];
  
  //*Modes 
  //Ingredients model
  ingredientModel = {id: null, amountIngredient: ''}
  tagsModel = [];
  imagesModel: any[] = [];
  //Recipe model
  recipeModel = {
    name: '', 
    categoryId: null,
    description: '',
    videFrame: '',
    prepHours: '',
    preMinutes: '',
    preparationSteps: '',
    status: ''
  }

  //Recipe status model
  recipeStatus = [
    {
      id: 'option1',
      name: 'Public',
      value: 'public'
    },
    {
      id: 'option2',
      name: 'Private',
      value: 'private'
    }
  ]
  
  //*Array images 
  imagesList: FileList;

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
    private _tagService: TagService,
    private _recipeService: RecipesService,
    private _imageService: ImageService,
    private router: Router,
    private formBuilder: FormBuilder) 
       { }

  ngOnInit() 
  {

    this.getCategoriesList();    
    this.getIngredientsList();
    this.getTagList();
  }

  /**
   * 
   */
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

  public getTagList():void
  {
    this._tagService.getTagsShort().subscribe(data =>
      {
        this.tags = data;
      })
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
    this.ingredientModel.id = null;
    this.ingredientModel.amountIngredient = '';
  }

  public onFileSelected(event: any): void
  {
    this.imagesURL = [];
    this.imagesModel = [];
    //*Get images length
    let elements = event.target.files.length;
    //*Validate max images 
    if(elements > 5)
    {
      alert("STOP!!");
    }
    else
    {
      //*Get images and add to arrray for show thumbs
      for(let i = 0; i < elements; i++)
      {
        this.imagesModel.push(event.target.files[i]);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) =>
        {
          this.imagesURL.push(event.target.result);
        }
      }
    
     // console.log(this.imagesModel);
      //this.imagesList = event.target.files;
    }
  }

  public selecAsThumb(index: number): void
  {
    this.indexThumb = index;
    this.thumbSelectedRoute = this.imagesModel[index].name;
  }

  /**
   *This function remote image from array
   * @param index: index of image to remove
   */
  public removeImage(index: number): void
  {
    this.imagesURL.splice(index, 1); 
    this.imagesModel.splice(index, 1);
    console.log(this.imagesModel);
  }

  public createRecipe():void
  {
    //*Variable declaration
   
    //*Create object tags
    let tags = [];
    for(let i = 0; i < this.tagsModel.length; i++)
    {
      let tag = {id: this.tagsModel[i]}
      tags.push(tag);
    }

    //*Create object recipe
    let newRecipe: NewRecipe =
    {
      name: this.recipeModel.name,
      preparationTime: this.recipeModel.prepHours +' '+ this.recipeModel.preMinutes,
      description: this.recipeModel.description,
      thumbRoute: 'kaka',
      preparationSteps: this.recipeModel.preparationSteps,
      difficulty: '',
      status: this.recipeModel.status,
      videFrame: this.recipeModel.videFrame,
      category: 
      {
        id: this.recipeModel.categoryId
      },
      user:
      {
        id: this.userId
      },
      tags: tags  
    }

    //*Send recipe to api for save
    this._recipeService.createRecipe(newRecipe).subscribe(response =>
      {
        let id: number = response.id;
        //*Create ingredients recipe 
        this.createIngredientsRecipe(id);
        this.createImagesRecipe(id);
        this.router.navigate(['/user/createrecipe']);
        Swal.fire('Success!','The recipe: '+response.recipeName+' was created.','success');       
     
      }
      );
  }

  /**
   **This function creates the recipe ingredients
   * @param id: id recipe
   */
  public createIngredientsRecipe(id: number): void
  {
    //*Array declaration
    let recipeIngredient = [];
    
    //*Get all ingredients in array
    for(let i = 0; i < this.ingredientsList.length; i++ )
    {
      //*Create object with ingredient data
      let list: RecipeIngredient =
      {
        quantity: this.ingredientsList[i].amount,
        recipe:
        {
          id: id
        },
        ingredient:
        {
          id: this.ingredientsList[i].id
        }
      }
      //*Add object to list
      recipeIngredient.push(list);
    }

    //*Send ingredients to apii
    this._recipeService.createRecipeIngredient(recipeIngredient).subscribe(response =>
      {
        console.log(response);
      });
  }

  public createImagesRecipe(id: number): void{
    
    this._imageService.uploadImage(this.imagesModel,id,'principal').subscribe(response=>
      {
        console.log(response);
      })
  }

  tester():void{
    this.router.navigate(['/home']);
  }
}
 