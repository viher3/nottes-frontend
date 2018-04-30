import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { SpinnerComponent } from 'app/shared';
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from 'app/user/auth.service';

@Component({
  selector: 'security-configuration',
  templateUrl: './securityConfiguration.component.html',
  styleUrls: ['./securityConfiguration.component.scss']
})
export class SecurityConfigurationComponent implements OnInit 
{
  constructor(
  	protected toastr : ToastrService,
    protected authHttp : AuthHttp,
    protected translator : TranslateService,
    private auth : AuthService
  ) 
  {
    
  }

  public loading : boolean = false;
  public newPassword : string = "";
  public newPassword2 : string = "";
  public currentPassword : string = "";
  private apiUrl : string = AppConfig.settings.api.api_url;

  ngOnInit(){ }

  formIsValid()
  {
    if( ! this.newPassword.length || ! this.newPassword2.length )
    {
      return "required_fields";
    }
    else if( 
      (this.newPassword != this.newPassword2) &&
      this.newPassword.length &&
      this.newPassword2.length
    )
    {
      return "passwords_dont_match";
    }
    
    return true;
  }

  saveChanges() : void
  {
    this.loading = true;

    this.authHttp.put(this.apiUrl + "/configuration/security/password", 
    {
      "currentPassword" : this.currentPassword,
      "newPassword" : this.newPassword2
    })
    .subscribe(

      data => {

        this.translator.get('components.configuration.password_modified_correctly').subscribe( (translation: string) => {
          this.toastr.success(translation);
        });

        // reset values
        this.newPassword = "";
        this.newPassword2 = "";
        this.currentPassword = "";

        this.loading = false;
      },

      error => {

        this.auth.checkJwtHasExpiredInServerRequest(error);

        let jsonError = JSON.parse(error._body);

        if(jsonError.error == "invalid_password")
        {
          this.translator.get('components.configuration.wrong_password_mssg')
          .subscribe( (translation: string) => {
            this.toastr.error(translation);
          });
        }

        this.loading = false;
      }

    ); 
  }
}