import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

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
 private idTag: number;
 private index: number;

 private searchTerm: string = '';

 private isEdit: boolean = false;
 private isAlreadyExists: boolean = false;
 //*Objects declaration
 private categories = [];

 private form: FormGroup;
  constructor(private formBuilder: FormBuilder, private _categoryService: CategoryService) { }

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
    this.idTag  = this.categories[index].id;
    this.form.setValue({name: this.categories[index].name });
    this.isEdit = true;
  }

  private getPage(page: number)
  {
    this.getPages(page-1);
  }

  private update(): void 
  {
    let category = new Category();
    category.name = this.form.get('name').value;
    this._categoryService.update(this.idTag,tag).subscribe(response =>
    {
      console.log(response);
      this.categories[this.index] = response; 
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

  private create()
  {
    let category = new Category();
    category.name = this.form.get('name').value;
    console.log(category);
    this._categoryService.create(category).subscribe(response =>
    {
      console.log(response);
      this.categories.push(response.category);
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


}
