import { Component, OnInit } from '@angular/core';
import { Recipe, RecipesService, RecipeIngredient, NewRecipe } from 'src/app/services/recipes.service';
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
  private idRecipe: number = 1;
  private indexList: number = 0;
  private imagesCount: number = 0;
  private indexThumb: number = 0; 


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
          this.imagesModel = data.images;
          //* server route to image
          let imageServer = 'http://localhost:8080/api/uploads/recipes/';
          for(let i = 0; i < data.images.length; i++)
          {
            this.imagesURL.push(imageServer+data.images[i].routeImage);
            if(data.images[i].isPrincial)
            {
              this.selecAsThumb(i);
            }
          }
         
          //*Add ingredients to list
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
    console.log('ID: '+ingredientId);
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


  public updateRecipe():void
  {

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
        id: this.idRecipe,
        name: this.recipeModel.name,
        preparationTime: this.recipeModel.preparationTime,
        description: this.recipeModel.description,
        thumbRoute: 'null',
        preparationSteps: this.recipeModel.preparationSteps,
        difficulty: this.recipeModel.difficulty,
        status: this.recipeModel.status,
        videFrame: this.recipeModel.videFrame,
        category: 
        {
          id: this.recipeModel.categoryId
        },
        user:
        {
          id: 1
        },
        tags: tags  
      }

      //*Send recipe to api for save
      this._recipeService.updateRecipe(newRecipe).subscribe(response =>
      {
        console.log(response);
        this.deleteIngredients();
        this.updateIngredients();    
        this.deleteImages();
        this.updateImages();
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
   * 
   * @param event 
   */
  private onFileSelected(event: any): void
  {
    //this.imagesModel = [];
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
    
      if(elements == 0)
      {
         this.selecAsThumb(0);
      }
      this.isImagesLimit = false;
    }
  }

  /**
   *This function remote image from array
   * @param index: index of image to remove
   */
  public removeImage(index: number): void
  {
    //*Validate if image exits in db
    if(this.imagesModel[index].id != undefined)
    {
      this.removeImages.push(this.imagesModel[index].id);
      console.log(this.removeImages);
    }
    else if(this.imagesModel.length == 0)
    {
      this.selecAsThumb(0);
    }
  
    this.imagesURL.splice(index, 1); 
    this.imagesModel.splice(index, 1);
    this.imagesCount--;
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

  private updateIngredients(): void
  {
    //*Array declaration
    let oldIngredients = [];
    let newIngredients = [];
    let list: RecipeIngredient;

     //*Get all ingredients in array
     for(let i = 0; i < this.ingredientsList.length; i++ )
     {
      
       //*Create object with ingredient data
      if(this.ingredientsList[i].idRI == undefined)
      {
        list = 
        {
          quantity: this.ingredientsList[i].amount,
          unit: this.ingredientsList[i].unit,
          recipe:
          {
            id: this.idRecipe
          },
          ingredient:
          {
            id: this.ingredientsList[i].idIngredient
          }
        }

        //*Add ingredient to list
        newIngredients.push(list);
      }
      else
      {
        list =
        {
          id: this.ingredientsList[i].idRI,
          quantity: this.ingredientsList[i].amount,
          unit: this.ingredientsList[i].unit,
          recipe:
          {
            id: this.idRecipe
          },
          ingredient:
          {
            id: this.ingredientsList[i].idIngredient
          }
        }

        //*Add ingredient to list
        oldIngredients.push(list);      
      }

     }

     console.log(newIngredients)
     //*Validate if exits new ingredients
     if(newIngredients.length > 0)
     {
      this._recipeService.createRecipeIngredient(newIngredients).subscribe(response =>
        {
          console.log(response);
        },
        err =>
        {
          console.log(err);
        });
     }

    this._recipeService.updateIngredientsRecipe(oldIngredients).subscribe(response =>
    {
      console.log(response)
    },
    err =>{
      console.log(err)
    });
  }

  private deleteIngredients():void 
  {
    for(let id of this.removeIngredientsList)
    {
      this._recipeService.deleteIngredientsRecipe(id).subscribe(response =>
        {
          console.log(response);
        },
        err =>
        {
          console.log(err);
        }
      );
    }
  }

  private deleteImages():void 
  {
    for(let id of this.removeImages)
    {
      this._imageService.deleteImageRecipe(id).subscribe(response =>
      {
        console.log(response)
      },
      err =>
      {
        console.log(err);
      });
    }
   
  }

  private updateImages():void 
  {
    this._imageService.uploadImageRecipe(this.imagesModel,1,this.thumbSelectedRoute).subscribe(response =>{console.log(response)},err =>{console.log(err)});
  }

}
