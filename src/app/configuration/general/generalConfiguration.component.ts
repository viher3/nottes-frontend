import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { SpinnerComponent } from 'app/shared';
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from 'app/user/auth.service';

@Component({
  selector: 'general-configuration',
  templateUrl: './generalConfiguration.component.html',
  styleUrls: ['./generalConfiguration.component.scss']
})
export class GeneralConfigurationComponent implements OnInit 
{
  constructor(
  	protected toastr: ToastrService,
    protected authHttp: AuthHttp,
    protected translator: TranslateService,
    private auth: AuthService
  ) 
  {
    
  }

  public loading : boolean = false;
  public step : string = "init";
  public nickname : string = "";
  public email : string = "";
  public password : string = "";
  public selectedLanguage;
  public languages : Array <any> = [
    { label : "English", value: "en" },
    { label : "Español", value: "es" }

  ];

  private apiUrl : string = AppConfig.settings.api.api_url;

  ngOnInit()
  {
    // get user info
    let user : Array<any> = this.auth.getUser();

    // set user info
    this.nickname = user['nickname'];
    this.email = user['email'];
    this.setSelectedUserLanguage(user['language']);
  }

  saveChanges()
  {
    this.step = "confirm_pwd";
  }

  confirmChanges()
  {
    let language =  this.selectedLanguage.value;
    this.loading = true;

    this.authHttp.put(this.apiUrl + "/configuration/general", 
    {
      "nickname" : this.nickname,
      "email" : this.email,
      "language" : language,
      "password" : this.password
    })
    .subscribe(

      data => {

        this.translator.get('common.changes_saved_success_mssg').subscribe( (translation: string) => {
          this.toastr.success(translation);
        });

        this.loading = false;
        this.step = "init";

        // refresh token with new user data
        this.auth.login(this.email, this.password);
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

  private setSelectedUserLanguage(userLang : string)
  {
    for(let lang of this.languages)
    {
      if(lang["value"] == userLang)
      {
        this.selectedLanguage = lang;
      }
    }
  }
}