import { Component, OnInit, ViewChild, ElementRef,OnChanges } from '@angular/core';

import { IngredientService, IngredientList } from 'src/app/services/ingredient.service';
import { CategoryService, CategoryCard, CategoryList } from 'src/app/services/category.service';
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
  private userId: number = 1;
  private indexList: number = 0;
  private imagesCount: number = 0;
  private indexThumb: number = 0; 
  private descriptionLength = 200;
  private isEditIngredient: boolean = false;
  private isImagesLimit: boolean = false;
  private selectedFile: File = null;
  private thumbSelectedRoute: string;
 // recipeStatus: RecipeStatus.public;
  private fileModel:string = null;
  
  //*Objects declaration*//
  //Ingredients list for select
  private ingredients: IngredientList[];
  //Categories list for select
  private categories: CategoryList[];
  //Tags list for multiple select
  private tags: TagShort[];
  
  private ingredientsList: any[] = [];
  private ingredientsRecipe: any[] = [];
  private imagesURL: any[] = [];
  
  //*Modes 
  //Ingredients model
  private ingredientModel = {id: null, amountIngredient: '',unit: null}
  private tagsModel = [];
  private imagesModel: any[] = [];
  //Recipe model
  private recipeModel = {
    name: '', 
    categoryId: null,
    description: '',
    videFrame: '',
    preparationTime: '',
    preparationSteps: '',
    status: 'public',
    difficulty: 'null'
  }

  //Recipe status model
  private recipeStatus = [
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
  private imagesList: FileList;

  //*Editor toolbar config
  private editorConfig = {
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

  
  OnChanges()
  {
    alert();
  }
  /**
   * 
   */
  private getCategoriesList():void
  {
    this._categoryService.getCategoriesList().subscribe(data => 
      {
        this.categories = data;
    });
  }

  private getIngredientsList():void
  {
    this._ingredientService.getIngredientsList().subscribe(data =>
      {
        this.ingredients = data;
    });     
  }

  private getTagList():void
  {
    this._tagService.getTagsShort().subscribe(data =>
      {
        this.tags = data;
    });
  }

  /**
   * 
   * @param ingredientId: id ingredient
   * @param amount: amount of ingredient
   */
  private addIngredient(ingredientId: number, amount: string, unit: string):void
  {
    //*Create ingredient and find the name by id
    let ingredient =
    {
      id: ingredientId,
      name: this.ingredients.find(element => element.id === ingredientId).name,
      amount: amount,
      unit: unit
    }

    console.log(ingredient);
    //*Add ingredient to list for show in the front
    this.ingredientsList.push(ingredient);

    //*Clear model
    this.clearIngredients();
  }

  /**
   * 
   * @param index 
   */
  private removeIngredient(index: number):void
  {
    this.ingredientsList.splice(index, 1);
  }

  private editIngredient(index: number):void 
  {
    this.indexList = index;

    //*Get ingredient by index
    let ingredient = this.ingredientsList[index];
    
    //*Set ingredient model
    this.ingredientModel.id = ingredient.id;
    this.ingredientModel.amountIngredient = ingredient.amount; 
    this.ingredientModel.unit = ingredient.unit;

    //*Shot update button
    this.isEditIngredient = true;
  }

  private updateIngredient():void
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
  private clearIngredients():void
  {
    this.ingredientModel.id = null;
    this.ingredientModel.amountIngredient = '';
    this.ingredientModel.unit = null;
  }

  /**
   * 
   * @param event 
   */
  private onFileSelected(event: any): void
  {
    this.imagesURL = [];
    this.imagesModel = [];
    //*Get images length
    let elements = event.target.files.length;
    //*Validate max images 
    if(elements > 5)
    {
      this.isImagesLimit = true;
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
        this.imagesCount++;
      }
      console.log(this.imagesCount);
      this.selecAsThumb(0);
      this.isImagesLimit = false;
    }
  }

  /**
   * 
   * @param index 
   */
  private selecAsThumb(index: number): void
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
    this.imagesCount--;
    console.log(this.imagesCount);
    console.log(this.imagesModel);
  }

  public createRecipe():void
  {
    console.log('HERE!');
    if(this.recipeModel.preparationSteps != '')
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
        preparationTime: this.recipeModel.preparationTime,
        description: this.recipeModel.description,
        thumbRoute: 'null',
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
        
        //*Clear model
        Swal.fire('Success!','The recipe: '+response.recipeName+' was created.','success');  
        this.router.navigate(['/recipe/',response.id]);
      },
      err =>
      {
        console.log(err);
      }
      );
    }
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
        quantity: this.ingredientsList[i].amount+' '+this.ingredientsList[i].unit,
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

  /**
   * 
   * @param id 
   */
  public createImagesRecipe(id: number): void{
    
    this._imageService.uploadImage(this.imagesModel,id,this.thumbSelectedRoute).subscribe(response=>
    {
        console.log(response);
    });
  }

  tester():void{
    this.router.navigate(['/home']);
  }

  private countCharacters(value)
  {
    let count = 200 - value.length;
    this.descriptionLength = count;
    // console.log(count);
  }
}
 