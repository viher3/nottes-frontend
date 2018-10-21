import { Injectable, EventEmitter } from '@angular/core';
import { AuthService } from 'app/user/auth.service';
import { AuthHttp } from 'angular2-jwt';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'app/app.config';
import { TranslateService } from "@ngx-translate/core";
import { Observable } from 'rxjs/Observable';
import { NavActionService } from 'app/services/shared/nav-action.service';

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

  private entityName : string = "notte";
  private entityNameField : string = "name";
  private entityListUrl : string = "/dashboard";
  private entityApiUrl: string = AppConfig.settings.api.api_url + "/notte";
  
  public reloadEntitiesEmitter$ : EventEmitter<any>;
  public deleteItemEvent : EventEmitter<boolean>

  constructor(
  	protected toastr: ToastrService,
    protected authHttp: AuthHttp,
    protected translator: TranslateService,
    protected auth : AuthService,
    protected http : HttpClient,
    protected navActionService : NavActionService
  ) 
  {
    this.reloadEntitiesEmitter$ = new EventEmitter();
    this.deleteItemEvent = new EventEmitter();
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

  /**
   * Remove an entity
   *
   * @param   Object      item    Entity object
   * @return  [type]      void
   */ 
  removeEntity(item : any) : void
  {
    this.translator.get('common.remove_item').subscribe( (translation: string) => {

      if( ! confirm(translation) ) return;

      // delete request
      this.authHttp.delete(
          this.entityApiUrl + "/" + item.id
        )
        .subscribe(

          data => {

            // show success alert
            this.translator.get('components.list.delete.success_mssg', { itemName: item[this.entityNameField] })
            .subscribe( (translation: string) => {
              this.toastr.success(translation, null, { enableHtml: true });
            });

            // remove item from list
            $("div.left-item-list").find("#item_" + item.id).remove();

            // Emits the deleteItem event
            this.deleteItemEvent.emit(true);

            // redirect to detail view
            this.navActionService.setAction('init');
          },
          err => {

            this.auth.checkJwtHasExpiredInServerRequest(err);
            this.translator.get('components.list.delete.error_mssg', { itemName: item[this.entityNameField] })
            .subscribe( (translation: string) => {
                this.toastr.error(translation, null, { enableHtml: true });
              });

              this.loading = false;

              // TODO: create handle server errors method (toastr)
              console.log(err);
          }
      );
    });
  }

  /**
   * Reload all entities
   */
  reloadEntities() : void
  {
    // TODO ...
  }
}
