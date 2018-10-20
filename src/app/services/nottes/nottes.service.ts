import { Injectable, EventEmitter } from '@angular/core';
import { AuthService } from 'app/user/auth.service';
import { AuthHttp } from 'angular2-jwt';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'app/app.config';
import { TranslateService } from "@ngx-translate/core";
import { Observable } from 'rxjs/Observable';

/**
 * @class         NottesService
 * @description   Nottes service
 * @author        Alberto Vian - alberto@albertolabs.com
 */

@Injectable()
export class NottesService
{
  private loading : boolean = false;
  public  contentIsVisible: boolean = false;
  public  submitedForm: boolean = false;
  public  encryptionPassword: string;
  public  notte: JSON;
  public  apiUrl : string = AppConfig.settings.api.api_url;
  private entityApiUrl: string = AppConfig.settings.api.api_url + "/notte";
  public  reloadEntitiesEmitter$ : EventEmitter<any>;

  constructor(
  	protected toastr: ToastrService,
    protected authHttp: AuthHttp,
    protected translator: TranslateService,
    protected auth : AuthService,
    protected http : HttpClient
  ) 
  {
    this.reloadEntitiesEmitter$ = new EventEmitter();
  }

  /**
   * Load a notte entity
   *
   * @param   Number      id                        Entity Id
   * @param   String      encryptionPassword        Encryption password for the notte
   * @return  Observable
   */
  loadEntity(id : number, encryptionPassword: string = "")
  {
    // get API endpoint
    let entityEndpoint = this.apiUrl + "/notte/" + id + "?format=html";

    // decrypt if password is provided
    if(encryptionPassword.length) 
    {
      entityEndpoint += "&pwd=" + encodeURI( btoa(encryptionPassword) );
    }

    return this.authHttp.get(entityEndpoint);
  }
}
