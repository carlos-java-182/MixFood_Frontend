import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  private isShowRecipes: boolean =   false;
  private isShowFavorites: boolean =   false;
  private isShowSettings: boolean =   false;
  private isShowFollowers: boolean =   false;
  private isShowProfile: boolean =   false;
  constructor() { }

  ngOnInit() {
  }

  private showProfile()
  {
    this.isShowProfile = true; 
    this.isShowFavorites = false;
    this.isShowRecipes = false;
    this.isShowSettings = false;
    this.isShowFollowers = false;
  }
  private showRecipes()
  {
    this.isShowRecipes = true;
    this.isShowProfile = false;
    this.isShowFavorites = false;
    this.isShowSettings = false;
    this.isShowFollowers = false;
  }
  private showFavorites()
  {
    this.isShowFavorites = true;
    this.isShowProfile = false;
    this.isShowRecipes = false;
    this.isShowSettings = false;
    this.isShowFollowers = false;
  }
  private showSettings()
  { 
    this.isShowSettings = true;
    this.isShowFavorites = false;
    this.isShowRecipes = false;
    this.isShowProfile = false;
    this.isShowFollowers = false;
  }
  private showFollowers()
  {
    this.isShowFollowers = true;
    this.isShowFavorites = false;
    this.isShowRecipes = false;
    this.isShowSettings = false;
    this.isShowProfile = false;
  }

}
