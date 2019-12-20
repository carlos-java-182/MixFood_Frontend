import { Component, OnInit } from '@angular/core';

import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { NgModel } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as $ from 'jquery';



@Component({
  selector: 'app-home-guest',
  templateUrl: './home-guest.component.html',
  styleUrls: ['./home-guest.component.css']
})
export class HomeGuestComponent implements OnInit {


  //*Variables declaration
  showDropDown: boolean = false;
  isSearchIngredientsVisible: boolean = false;
 
 
  //*Objects declaration
  recipeForm: FormGroup;

  

  public exampleData: Array<Select2OptionData>;
  public options: Options;
  public value: string[];
  items = [
    {id: 1, name: 'Python'},
    {id: 2, name: 'Node Js'},
    {id: 3, name: 'Java'},
    {id: 4, name: 'PHP', disabled: true},
    {id: 5, name: 'Django'},
    {id: 6, name: 'Angular'},
    {id: 7, name: 'Vue'},
    {id: 8, name: 'ReactJs'},
  ];
  selected = [
    {id: 2, name: 'Node Js'},
    {id: 8, name: 'ReactJs'}
  ];

  public myLocalList = [
    "Burgers",
    "Sandwiches",
    "French Fries",
    "Milkshakes",
    "Taco",
    "Biscuit",
    "Cookies",
    "Hot Dog",
    "Pizza",
    "Pancake"
  ];
  public search1 = '';
  selectedStatic(result) {
    this.search1 = result;
  }


 
  constructor(private fb: FormBuilder) 
  {
    this.initForm();
  }

  initForm(): FormGroup {
    return this.recipeForm = this.fb.group({
      search: [null]
    })
  }

  toggleDropDown(){
    this.showDropDown = !this.showDropDown;
  }

  toggleShowSearch(){
    this.isSearchIngredientsVisible = !this.isSearchIngredientsVisible;
  }

  getValue(value)
  {
    this.recipeForm.patchValue({"search": value});
   this.showDropDown = false;
  }

  getSearchValue()
  {
    return this.recipeForm.value.search;
  }

  searchRecipe(value){
    console.log(value);
  }

  

  ngOnInit() {
   
  



    this.exampleData = [
      {
        id: 'multiple1',
        text: 'Multiple 1'
      },
      {
        id: 'multiple2',
        text: 'Multiple 2'
      },
      {
        id: 'multiple3',
        text: 'Multiple 3'
      },
      {
        id: 'multiple4',
        text: 'Multiple 4'
      }
    ];
    this.value = ['multiple2', 'multiple4'];

    this.options = {
      width: '500',
      multiple: true,
      tags: true,
      placeholder: "Select your ingredients...",
      closeOnSelect: false,
      formatNoMatches: (term: string) => 'hey',
      formatSearching: () => 'papa'
    };
   
  }

}
