import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, UserInformation } from 'src/app/services/user.service';
import { SocialNetwork } from 'src/app/services/profile.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-settings-user',
  templateUrl: './settings-user.component.html',
  styleUrls: ['./settings-user.component.css']
})
export class SettingsUserComponent implements OnInit {
  //*Variables declaration
  private isEditPassword: boolean = false;
  private isEditEmail: boolean = false;
  private isEditInformation: boolean = false;
  private isEditSocial: boolean = false;
  private isEditFacebook: boolean = true;
  private email:string;
  //*Objects declaration
  private information: UserInformation = null;
  private socialNetworksView: any[] = [];
  private newSocialNetworks: SocialNetwork[] = [];
  private oldSocialNetworks: SocialNetwork[] = [];

  //*Form grups declaration
  private passwordForm: FormGroup;
  private emailForm: FormGroup;
  private informationForm: FormGroup;
  private socialnetworksForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private _userService: UserService) { }

  ngOnInit() 
  {
    this.passwordForm = this.formBuilder.group({
      password: ['',[Validators.required,Validators.minLength(6)]],
      confirmPassword: ['',[Validators.required,Validators.minLength(6)]]
    });

    this.emailForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      confirmPassword: ['',[Validators.required, Validators.minLength(6)]]
    });

    

    this.formInformationInit();
    this.socialNetworksFormInit();

    this.getSocialNetworks();
    
  }

  private formInformationInit():void
  {
    this.informationForm = this.formBuilder.group({
      name: ['',Validators.required],
      lastname: ['',Validators.required],
      gender: ['',Validators.required],
      dateBirth: ['',Validators.required],
      country: ['',Validators.required],
      description: ['',Validators.required]
    });
  }

  private socialNetworksFormInit():void
  {
    this.socialnetworksForm = this.formBuilder.group({
      facebook: '',
      instagram: '',
      twitter: '',
      pinterest: '',
      linkedin: '',
      youtube: ''
    });
  }

  private togglePasswordEdit(): void
  {
    this.isEditPassword = !this.isEditPassword;
    this.isEditEmail = false;
    this.isEditInformation = false;
    this.isEditSocial = false;
  }
  private toggleEmailEdit(): void
  {
    this.isEditEmail = !this.isEditEmail;
    if(this.isEditEmail)
    {
      this.getEmail();
      this.isEditPassword = false;
      this.isEditInformation = false;
      this.isEditSocial = false;
    }
 
  }
  private toggleInformationEdit(): void
  {
    this.isEditInformation = !this.isEditInformation;
    if(this.isEditInformation)
    {
      this.getInformation();
      this.isEditEmail = false;
      this.isEditPassword = false;
      this.isEditSocial = false;
    }
    
  }
  private toggleSocialEdit(): void
  {
    this.isEditSocial = !this.isEditSocial;
    this.isEditEmail = false;
    this.isEditPassword = false;
    this.isEditInformation = false;
  }

  private updateInformation(): void
  {
    let idUser = 1;

    this._userService.updateInformation(idUser,this.informationForm.value).subscribe(response =>{
      console.log(response);
    },
    err =>
    {
      console.log(err);
    });
  }

  private getInformation(): void
  {
    let idUser = 1;
    this._userService.getSettingsInformation(idUser).subscribe(data =>
    {
      this.information = data;
      console.log(this.information);
      //*Set user information to from
      this.informationForm.setValue({
        name: this.information.name,
        lastname: this.information.lastname,
        gender: this.information.gender,
        dateBirth: this.information.dateBirth,
        country: this.information.country,
        description: this.information.description      
      });
    },
    err =>
    {
      console.log(err);
    });
  }

  private getEmail(): void
  {
    let idUser = 1;
    this._userService.getEmailById(idUser).subscribe(data =>{
      this.email = data.email;
     // console.log(data.email);
    },
    err =>
    {
      console.log(err);
    });
  }

  private addSocialNetwork(values)
  {
    let idUser = 1;
    let network: string = values.attributes.formcontrolname.value.toUpperCase();
    let link = values.value;
    let socialNetwork: SocialNetwork = 
    {
      id: 0,
      link: link,
      network: network
    }

    this._userService.updateSocialNetworks(idUser, socialNetwork).subscribe(response =>
      {
        console.log(response);
      },
      err =>
      {
        console.log(err);
      }
      );
  }

  private removeSocialNetwork(value)
  {
    let idUser = 1;
    let network: string = value.attributes.formcontrolname.value.toUpperCase();
    this._userService.deleteSocialNetwork(idUser,network).subscribe(response =>
      {
        console.log(response);
        
        if(network == 'FACEBOOK')
        {
          this.socialnetworksForm.reset({facebook: ''});
        }
        if(network == 'PINTEREST')
        {
          this.socialnetworksForm.reset({pinterest: ''});
        }
        if(network == 'INSTAGRAM')
        {
          this.socialnetworksForm.reset({instagram: ''});
        }
        if(network == 'TWITTER')
        {
          this.socialnetworksForm.reset({twitter: ''});
        }
        if(network == 'LINKEDIN')
        {
          this.socialnetworksForm.reset({linkedin: ''});
        }
        if(network == 'YOUTUBE')
        {
          this.socialnetworksForm.reset({youtube: ''});
        }
      });
  }

  private getSocialNetworks()
  {
    let idUser = 1;
    this._userService.getSettingsSocialNetworks(idUser ).subscribe(data =>
      {
        this.socialNetworksView  = data;
       
        let pinterest = data.find(x => x.network === 'PINTEREST');
        let facebook = data.find(x => x.network === 'FACEBOOK');
        let instagram = data.find(x => x.network === 'INSTAGRAM');
        let twitter = data.find(x => x.network === 'TWITTER');
        let linkedin = data.find(x => x.network === 'LINKEDIN');
        let youtube = data.find(x => x.network === 'YOUTUBE');
        
        this.socialnetworksForm.setValue({
          facebook : facebook == undefined ? '' : facebook.link,
          instagram: instagram == undefined ? '' : instagram.link,
          pinterest: pinterest == undefined ? '' : pinterest.link,
          twitter: twitter == undefined ? '' : twitter.link,
          linkedin: linkedin == undefined ? '' : linkedin.link,
          youtube: youtube == undefined ? '' : youtube.link
        });
          
      });
  }
}
