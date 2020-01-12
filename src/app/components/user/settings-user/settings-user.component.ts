import { EmailUpdate } from './../../../services/user.service';
import { PasswordValidation } from 'src/app/helpers/PasswordValidation';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, UserInformation,PasswordChange } from 'src/app/services/user.service';
import { SocialNetwork } from 'src/app/services/profile.service';
import { empty } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings-user',
  templateUrl: './settings-user.component.html',
  styleUrls: ['./settings-user.component.css']
})
export class SettingsUserComponent implements OnInit {
  //*Variables declaration
  private idUser = this._authService.user.id;
  private isEditPassword: boolean = true;
  private isEditEmail: boolean = false;
  private isEditInformation: boolean = false;
  private isEditSocial: boolean = false;
  private isEditFacebook: boolean = false;
  private isPasswordInvalid: boolean = false;
  private oldPasswordisSame: boolean = false; 
  private showAlert: boolean = false;
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
              private _userService: UserService,
              private _authService: AuthService) { }

  ngOnInit() 
  {
    this.passwordForm = this.formBuilder.group({  
      actualPassword: ['',[Validators.required, Validators.minLength(6)]],
      password: ['',[Validators.required,Validators.minLength(6)]],
      confirmPassword: ['',[Validators.required,Validators.minLength(6)]]
    },
    {validators: PasswordValidation.MatchPassword}
    );

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
    this._userService.updateInformation(this.idUser,this.informationForm.value).subscribe(response =>{
      console.log(response);
      this.showAlertMessage();
    },
    err =>
    {
      console.log(err);
    });
  }

  private getInformation(): void
  {
    this._userService.getSettingsInformation(this.idUser).subscribe(data =>
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
    this._userService.getEmailById(this.idUser).subscribe(data =>{
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
    let network: string = values.attributes.formcontrolname.value.toUpperCase();
    let link = values.value;
    let socialNetwork: SocialNetwork = 
    {
      id: 0,
      link: link,
      network: network
    }

    this._userService.updateSocialNetworks(this.idUser, socialNetwork).subscribe(response =>
      {
        console.log(response);
        this.showAlertMessage();
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
    console.log("net: "+ network);
    this._userService.deleteSocialNetwork(this.idUser,network).subscribe(response =>
      {
        console.log(response);
        
        if(network == 'FACEBOOK')
        {
          console.log('fb');
          this.socialnetworksForm.get('facebook').reset();
        }
        if(network == 'PINTEREST')
        {
          this.socialnetworksForm.get('pinterest').reset();
        }
        if(network == 'INSTAGRAM')
        {
          this.socialnetworksForm.get('instagram').reset();
        }
        if(network == 'TWITTER')
        {
          this.socialnetworksForm.get('twiter').reset();
        }
        if(network == 'LINKEDIN')
        {
          this.socialnetworksForm.get('linkedin').reset();
        }
        if(network == 'YOUTUBE')
        {
          this.socialnetworksForm.get('youtube').reset();
        }
      });
  }

  private getSocialNetworks()
  {
    this._userService.getSettingsSocialNetworks(this.idUser).subscribe(data =>
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

  private changePassword()
  {
    let passwords: PasswordChange =
    {
      actualPassword: this.passwordForm.get('actualPassword').value,
      newPassword: this.passwordForm.get('password').value
    }

    console.log(passwords)
    this._userService.updatePassword(passwords).subscribe(response =>
    {
      console.log(response);
      this.showAlertMessage();
    },
    err =>
    {
      console.log(err);
        if(err.status == 404)
        {
          this.isPasswordInvalid = true;
        }
    }
    );

  }

  private changeEmail(event: Event)
  {
    event.preventDefault();
    //*Validate email
  // console.log(this.emailForm.value)
    let body: EmailUpdate = 
    {
      email : this.emailForm.get('email').value,
      password: this.emailForm.get('confirmPassword').value
    };
   
    console.log(body);
    this._userService.updateEmail(body).subscribe(response =>
      {
      console.log(response);
      this.getEmail();
      this.showAlertMessage();
    },
      err => 
      {
       console.log(err);
       
    });
  }

  private validateSamePassword()
  {
    let oldPassword = this.passwordForm.get('actualPassword').value;
    let newPassword = this.passwordForm.get('password').value;

    if(oldPassword == newPassword)
    {
      this.oldPasswordisSame = true;
    }
    else
    {
      this.oldPasswordisSame = false;
    }
  }

  private hiddeWrongPassword()
  {
    if(this.isPasswordInvalid)
    {
      this.isPasswordInvalid = false;
    }
  }

  private showAlertMessage():void 
  {
    this.showAlert = true;
      setTimeout(()=>
      {
        this.showAlert = false;
      },2000);
  }
}
