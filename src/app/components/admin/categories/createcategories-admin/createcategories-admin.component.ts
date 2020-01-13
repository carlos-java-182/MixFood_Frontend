import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-createcategories-admin',
  templateUrl: './createcategories-admin.component.html',
  styleUrls: ['./createcategories-admin.component.css']
})
export class CreatecategoriesAdminComponent implements OnInit {

   //*Variables declaration
 private itemsPerPage = 10;
 private totalItems: number = 0;
 private currentPage = 1;
 private totalPages: number;
 private idCategory: number;
 private index: number;

 private searchTerm: string = '';
 private imageURL: string;

 private isChangeImage: boolean = false;
 private isEdit: boolean = false;
 private isAlreadyExists: boolean = false;
 //*Objects declaration
 private categories = [];

 private form: FormGroup;
 private image: File;
  constructor(private formBuilder: FormBuilder,
    private _categoryService: CategoryService,
    private _imageService: ImageService) { }

  ngOnInit() 
  {
    this.getPages(0);
    this.formInit();
  }

  private formInit()
  {
    this.form =  this.formBuilder.group({
      name: ['',Validators.required],
      image: ['',Validators.required]
    });
  }

  private getPages(page: number)
  {
    this._categoryService.getPages(page,this.itemsPerPage).subscribe(response =>
    {
      if(!response.empty)
      {
        console.log(response);
        this.totalItems = response.totalElements;
        //*Get current page of results 
        this.currentPage = response.number + 1;
        this.totalPages = response.totalPages;
        this.categories = response.content as Category[];
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
    let id = this.categories[index].id;
    this._categoryService.delete(id).subscribe(response =>
      {
        console.log(response);
        this.categories.splice(index,1);
      },
      err =>
      {
        console.log(err);
      });
  }
  private edit(index: number)
  {
    this.index = index;
    this.idCategory  = this.categories[index].id;
    this.form.setValue({
      name: this.categories[index].name,
      image: ''
    });
    this.imageURL = this.categories[index].thumbRoute;
    this.isEdit = true;
    this.isChangeImage = false;
  }

  private getPage(page: number)
  {
    this.getPages(page-1);
  }

  private update(): void 
  {
    console.log('in update')
    console.log(this.form.value);
    let category = new Category();
    category.name = this.form.get('name').value;
    
    if(this.form.get('image').value != '' )
    {
      this._imageService.uploadImageCategory(this.idCategory, this.image).subscribe(response =>
        {
          console.log(response);
        },
        err =>
        {
          console.log(err)
        });
    }

    if(this.categories[this.index].name != category.name)
    {
      this._categoryService.update(this.idCategory,category).subscribe(response =>
        {
          console.log(response);
          this.categories[this.index] = response; 
          if(category.thumbRoute != '')
          {
          }
    
          this.form.reset();
          this.isEdit = false;
        },
        err =>
        {
          if(err.status == 404)
          {
            this.isAlreadyExists = true;
          }
          console.log(err);
        });
    }
   
  }

  private create()
  {
    let category = new Category();
    category.name = this.form.get('name').value;
    console.log(category);
    this._categoryService.create(category).subscribe(response =>
    {
      console.log(response);
      this.categories.push(response.category);
      this._imageService.uploadImageCategory(response.id, this.image).subscribe(response =>{
        console.log(response);
      },
      err =>
      {
        console.log(err);
      });
      this.form.reset();
    },
    err =>
    {
      if(err.status == 404)
      {
        this.isAlreadyExists = true;
      }
      console.log(err);
    });
  }

  private search(term: string): void
  {
    console.log(term);
    this.searchTerm = term;
    this._categoryService.getPagesByTerm(0,this.itemsPerPage,term).subscribe(response =>
      {
        if(!response.empty)
        {
          console.log(response);
          this.totalItems = response.totalElements;
          //*Get current page of results 
          this.currentPage = response.number + 1;
          this.totalPages = response.totalPages;
          this.categories = response.content as Category[];
        }
        else
        {
          this.categories = [];
          this.totalPages = 0;
          this.totalItems = 0;
        }
      },
      err =>
      {
        console.log(err);
      })
  }

  private hiddeAlreadyExists(): void
  {
    if(this.isAlreadyExists)
    {
      this.isAlreadyExists = false;
    }
  }

  private onFileSelected(event: any): void
  {
    
    //*Declare object reader for read file
    const reader = new FileReader();

    console.log('In file')
    this.imageURL = '';
    this.image = null;
    //*Get image
    this.image = event.target.files[0];

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) =>
    {
      this.imageURL = event.target.result;
    }
    console.log(event.target.files[0]);
    this.isChangeImage = true;
  }


}
