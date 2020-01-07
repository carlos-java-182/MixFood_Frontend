import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { empty } from 'rxjs';
import { CategoryService, CategoryCard } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-categories-guest',
  templateUrl: './categories-guest.component.html',
  styleUrls: ['./categories-guest.component.css']
})
export class CategoriesGuestComponent implements OnInit {

  private categories: CategoryCard[];
  private currentPage: number = 0;
  private totalItems: number;
  private numberOfElement: number;
  private itemsPerPage: number = 10;
  private totalPages: number;
  constructor(private _categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() 
  {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.currentPage = Number(params.get('page'))-1;
      if(params.get('page') != undefined)
      {
        this.getCategories(this.currentPage,this.itemsPerPage);
      }
      else
      {
        this.getCategories(0,this.itemsPerPage);
      }
    });   
  }

  private getCategories(page: number, items: number): void
  {
    this._categoryService.getCategoriesCard(page, items).subscribe(response =>
    {
      if(!response.empty)
      {
        this.categories = response.content as CategoryCard[];
        this.totalItems = response.totalElements;
        this.totalPages = response.totalPages;
        this.currentPage = response.number + 1;
     //   console.log(response );
      }
      else 
      {

      }
    });
  }

  private goToCategory(id: number): void 
  {
    let path = `search/category/${id}/page/1`;
    this.router.navigate([path]);
  }

  private getPage(page: number)
  {
    this.router.navigate(['categories/page/',page]);
  }

  
}
