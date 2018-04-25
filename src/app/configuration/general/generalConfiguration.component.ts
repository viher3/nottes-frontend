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

  public selectedLanguage : Array <any> = [];
  public languages : Array <any> = [
    { label : "English", value: "en" },
    { label : "Español", value: "es" }
  ];

  ngOnInit()
  {
    	// get current user lang
      let userLang = this.getCurrentUserLanguage();
      this.setSelectedUserLanguage(userLang);
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

  private getCurrentUserLanguage()
  {
    let user : Array<any> = this.auth.getUser();
    return user['language'];
  }
}