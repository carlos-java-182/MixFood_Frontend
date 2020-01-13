import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css',
  '../../../../../assets/css/tableStyles.css']
})
export class CreateUserComponent implements OnInit {
  //*Variables declaration
  private itemsPerPage = 10;
  private totalItems: number = 0;
  private currentPage = 1;
  private totalPages: number;
  private index: number;
  private searchTerm: string = '';
  private status: boolean = true;
  private role: number = 1;
  private idUser: number;
  
 private isEdit: boolean = false;
 private isAlreadyExists: boolean = false;
  form: FormGroup;
  users:any [];
  constructor(private _userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() 
  {
    this.getPages(0);
    this.formInit();
  }

  private formInit(): void
  {
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      role: ['1',Validators.required],
      status: [true,Validators.required]
    });
  }
  
  private getPages(page: number)
  {
    this._userService.getPaginate(this.status,page,this.itemsPerPage).subscribe(response =>
    {
      console.log(response.content);
      if(!response.empty)
      {
        // console.log(response);
        this.totalItems = response.totalElements;
        //*Get current page of results 
        this.currentPage = response.number + 1;
        this.totalPages = response.totalPages;
        this.users = response.content;
      }
      else
      {
        this.totalItems = 0;
        this.users = [];
        this.totalItems = 0;
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
    let id = this.users[index].id;
    this._userService.delete(id).subscribe(response =>
      {
        console.log(response);
        this.users.splice(index,1);
      },
      err =>
      {
        console.log(err);
      });
  }
  private edit(index: number)
  {
    this.index = index;
    this.idUser  = this.users[index].id;
    this.form.setValue({
      name: this.users[index].name,
      lastname: this.users[index].lastname,
      email: this.users[index].email,
      password: '',
      role: '',
      status: this.users[index].enabled
    });
    this.isEdit = true;
  }

  private delete()
  {

  }

  private create()
  {
    let user = new User;
    user.name = this.form.get('name').value;
    user.lastname = this.form.get('lastname').value;
    user.email = this.form.get('email').value;
    user.password = this.form.get('password').value;
    user.enabled = this.form.get('status').value;
    this._userService.create(user).subscribe(response =>
    {
      console.log(response);
      this.users.push(user);
      this.form.reset();
    },
    err =>
    {
      console.log(err);
    });
  }

  private update(): void 
  {
    console.log(this.form.value);
    let user = new User();
    user.name = this.form.get('name').value;
    user.lastname = this.form.get('lastname').value;
    user.email = this.form.get('email').value;
    if(this.form.get('password').value == '')
    {
      user.password = 'null';
    }
    user.enabled = this.form.get('status').value;
    this._userService.update(this.idUser,user).subscribe(response =>
    {
      console.log(response);
      this.users[this.index] = response; 
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

  private hiddeAlreadyExists(): void
  {
    if(this.isAlreadyExists)
    {
      this.isAlreadyExists = false;
    }
  }

  private getPagesByterm(page: number, term: string)
  {
    this._userService.getPaginateByTerm(this.status,term,page,this.itemsPerPage).subscribe(response =>
    {
      console.log(response.content);
      if(!response.empty)
      {
        // console.log(response);
        this.totalItems = response.totalElements;
        //*Get current page of results 
        this.currentPage = response.number + 1;
        this.totalPages = response.totalPages;
        this.users = response.content;
      }
      else
      {
        this.totalItems = 0;
        this.users = [];
        this.totalItems = 0;
      }
    },
    err =>
    {
      console.log(err);
    }
    );
  }

  private search(term: string)
  {
    this.getPagesByterm(0,term);
  }

  private getPage(page: number)
  {
    if(this.searchTerm !='')
    {
      this.getPagesByterm(page,this.searchTerm);
    }
    else 
    {
      this.getPages(page-1);
    }
  }


}
