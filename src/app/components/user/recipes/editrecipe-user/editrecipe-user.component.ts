import { Component, OnInit } from '@angular/core';
import { Recipe, RecipesService } from 'src/app/services/recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IngredientService, IngredientList } from 'src/app/services/ingredient.service';
import { CategoryService, CategoryList } from 'src/app/services/category.service';
import { TagService, TagShort } from 'src/app/services/tag.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-editrecipe-user',
  templateUrl: './editrecipe-user.component.html',
  styleUrls: ['./editrecipe-user.component.css']
})
export class EditrecipeUserComponent implements OnInit {
  //*Variable declarations
  private idRecipe: number;
  private indexList: number = 0;
  private imagesCount: number = 0;


  private isEditIngredient: boolean = false;
  private isImagesLimit: boolean = false;
  private isEdit: boolean = true;

  //*Objects declaration
  private ingredientsList: any[] = [];
  private removeIngredientsList: any[] = [];
  private imagesURL: any[] = [];
  private removeImages = [];
  private selectedFile: File = null;

  private thumbSelectedRoute: string;

    //*Objects declaration*//
  //Ingredients list for select
  private ingredients: IngredientList[];
  //Categories list for select
  private categories: CategoryList[];
  //Tags list for multiple select
  private tags: TagShort[];
  
  //*Models
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

  constructor(private _recipeService: RecipesService,
              private _ingredientService: IngredientService,
              private _categoryService: CategoryService,
              private _tagService: TagService,
              private _imageService: ImageService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() 
  {
    this.getCategoriesList();    
    this.getIngredientsList();
    this.getTagList();

    this.activatedRoute.paramMap.subscribe(params =>
      {
        //*Validate if is create or edit recipe
        this.idRecipe = Number(params.get('id'));
        console.log(this.idRecipe);
        this._recipeService.getRecipeEdit(this.idRecipe).subscribe(data => 
        {
         
          console.log(data);
          //*Set data to form
          this.recipeModel.name = data.name;
          this.recipeModel.difficulty = data.difficulty.toUpperCase();
          this.recipeModel.description = data.description;
          this.recipeModel.videFrame = data.videoFrame;
          this.recipeModel.preparationSteps = data.preparationSteps;
          this.recipeModel.preparationTime = data.preparationTime;
          this.recipeModel.status = data.status;
          this.recipeModel.categoryId = data.category.id;
          this.imagesCount = data.images.length;
         
          //* server route to image
          let imageServer = 'http://localhost:8080/uploads/recipe/';
          for(let item of data.images)
          {
            imageServer  += item.routeImage;    
            this.imagesURL.push(imageServer);
          }
          console.log(this.imagesURL);

         for(let item of data.recipeIngredients)
         {
           //*Create ingredient and find the name by id
            let ingredient =
            {
              idRI: item.id,
              idIngredient: item.ingredient.id,
              name: item.ingredient.name,
              amount: item.quantity,
              unit: item.unit
            }
           this.ingredientsList.push(ingredient);
         }





         console.log(this.ingredientsList);
          //*Create array with tags ids
          let ids = [];
          for(let id of data.tags)
          {
            ids.push(id.id);
          }
          this.tagsModel = ids;
        },
        err =>
        {
          console.log(err);
        });
      }); 
  }

  /**
   **This function get categories for list in select
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
      idIngredient: ingredientId,
      name: this.ingredients.find(element => element.id === ingredientId).name,
      amount: amount,
      unit: unit
    }

    console.log(ingredient);
    //*Add ingredient to list for show in the front
    this.ingredientsList.push(ingredient);
    console.log(this.ingredientsList);
   // this.newIngredientsList.push(ingredient);

    //*Clear model
    this.clearIngredients();
  }

    /**
   * 
   * @param index 
   */
  private removeIngredient(index: number):void
  {
    if(this.ingredientsList[index].idRI != undefined)
    {
      this.removeIngredientsList.push(this.ingredientsList[index].idRI);
      console.log(this.removeIngredientsList);
    }
    this.ingredientsList.splice(index, 1);
  }

  private editIngredient(index: number):void 
  {
    this.indexList = index;

    //*Get ingredient by index
    let ingredient = this.ingredientsList[index];
    console.log(ingredient);
    //*Set ingredient model
    this.ingredientModel.id = ingredient.idIngredient;
    this.ingredientModel.amountIngredient = ingredient.amount; 
    this.ingredientModel.unit = ingredient.unit;

    //*Shot update button
    this.isEditIngredient = true;
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

  private updateIngredient():void
  {
    //*Find name ingredient by id
    let name = this.ingredients.find(element => element.id === this.ingredientModel.id).name;

    //*Add changes to list
    this.ingredientsList[this.indexList].name = name;
    this.ingredientsList[this.indexList].amount = this.ingredientModel.amountIngredient;
    this.ingredientsList[this.indexList].unit = this.ingredientModel.unit;

    
    //*Show add button
    this.isEditIngredient = false;
    
    //*Clear model
    this.clearIngredients();  
  }


  public createRecipe():void
  {
    console.log('remove');
    console.log(this.removeIngredientsList);
    console.log('list');
    console.log(this.ingredientsList);
  }

   /**
   * 
   * @param event 
   */
  private onFileSelected(event: any): void
  {
    //this.imagesURL = [];
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
     // this.selecAsThumb(0);
      this.isImagesLimit = false;
    }
  }

  /**
   *This function remote image from array
   * @param index: index of image to remove
   */
  public removeImage(index: number): void
  {
    //this.removeImages.push(this.images);
    this.imagesURL.splice(index, 1); 
    this.imagesModel.splice(index, 1);
    this.imagesCount--;
    console.log(this.imagesCount);
    console.log(this.imagesModel);
  }


}
