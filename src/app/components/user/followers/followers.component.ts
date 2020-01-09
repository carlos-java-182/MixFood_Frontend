import { empty } from 'rxjs';
import { Follower } from './../../../services/follower.service';
import { error } from 'protractor';
import { FollowerService, FollowerCard } from 'src/app/services/follower.service';
import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  //*Variables declaration
  private idUser = 1;
  private itemsPerPage = 1;
  private totalItems: number = 0;
  private currentPage = 1;
  private totalPages: number;
  private isResultEmpty: boolean = false;

  //*Objects declaration
  private followers: FollowerCard[];
  constructor(private _followerService: FollowerService) { }

  ngOnInit() 
  {
    this.getFollowers(0);
  }

  private getFollowers(page: number)
  {
    this._followerService.getFollowerByIdUser(1,page,this.itemsPerPage).subscribe(response => 
    {
      if(response.empty)
      {
          this.isResultEmpty = true;
          this.totalItems = 0;
          this.followers = [];
      }
      else
      {
        this.followers = response.content as FollowerCard[];
        this.totalItems = response.totalElements;
        this.isResultEmpty = false;
        //*Get current page of results 
        this.currentPage = response.number + 1;
        this.totalPages = response.totalPages;
      }
      //console.log(this.followers[0].follower.porfileimageRoute);
    },
    err =>
    {
      console.log(err);
    });
  }

  private getPage(page: number)
  {
    this.getFollowers(page-1);
  }

  private delete(id: number, index: number)
  {
    Swal.fire({
      title: 'Are you sure you want to delete this user from your followers?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    })
    .then((result) =>{
      if(result.value)
      {
        this._followerService.deleteFollowing(id).subscribe(response =>
        {
          console.log(response);
          this.followers.splice(1,index);
        },
        err =>
        {
          console.log(err);
        }
        );
      }
    });       
  }
}
