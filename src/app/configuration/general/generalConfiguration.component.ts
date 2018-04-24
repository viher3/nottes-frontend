import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { SpinnerComponent } from 'app/shared';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'general-configuration',
  templateUrl: './generalConfiguration.component.html'
})
export class GeneralConfigurationComponent implements OnInit 
{
  constructor(
  	protected toastr: ToastrService,
    protected authHttp: AuthHttp,
    protected translator: TranslateService,
  ) 
  {
    
  }

  ngOnInit()
  {
    	
  }
}