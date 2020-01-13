import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';

@Component({
  selector: 'app-createtags-admin',
  templateUrl: './createtags-admin.component.html',
  styleUrls: ['./createtags-admin.component.css',
    '../../../../../assets/css/tableStyles.css']
})
export class CreatetagsAdminComponent implements OnInit 
{
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
 private tags = [];

 private form: FormGroup;
  constructor(private formBuilder: FormBuilder, private _tagService: TagService) { }

  ngOnInit() 
  {
    this.getPages(0);
    this.formInit();
  }

  private formInit()
  {
    this.form =  this.formBuilder.group({
      name: ['',Validators.required]
    });
  }

  private getPages(page: number)
  {
    this._tagService.getPages(page,this.itemsPerPage).subscribe(response =>
    {
      if(!response.empty)
      {
        console.log(response);
        this.totalItems = response.totalElements;
        //*Get current page of results 
        this.currentPage = response.number + 1;
        this.totalPages = response.totalPages;
        this.tags = response.content as Tag[];
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
    let id = this.tags[index].id;
    this._tagService.delete(id).subscribe(response =>
      {
        console.log(response);
        this.tags.splice(index,1);
      },
      err =>
      {
        console.log(err);
      });
  }
  private edit(index: number)
  {
    this.index = index;
    this.idTag  = this.tags[index].id;
    this.form.setValue({name: this.tags[index].name });
    this.isEdit = true;
  }

  private getPage(page: number)
  {
    this.getPages(page-1);
  }

  private update(): void 
  {
    let tag = new Tag();
    tag.name = this.form.get('name').value;
    this._tagService.update(this.idTag,tag).subscribe(response =>
    {
      console.log(response);
      this.tags[this.index] = response; 
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
    let tag = new Tag();
    tag.name = this.form.get('name').value;
    console.log(tag);
    this._tagService.create(tag).subscribe(response =>
    {
      console.log(response);
      this.tags.push(response.tag);
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
    this._tagService.getPagesByTerm(0,this.itemsPerPage,term).subscribe(response =>
      {
        if(!response.empty)
        {
          console.log(response);
          this.totalItems = response.totalElements;
          //*Get current page of results 
          this.currentPage = response.number + 1;
          this.totalPages = response.totalPages;
          this.tags = response.content as Tag[];
        }
        else
        {
          this.tags = [];
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
