import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudComponent, EncryptionPasswordComponent } from 'app/shared';
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from 'app/user/auth.service';
import { NottesService } from 'app/services/nottes/nottes.service';
import { NavActionService } from 'app/services/shared/nav-action.service';

/**
 * @class         NotteDetailComponent
 * @description   NotteDetail component.
 * @author        Alberto Vian - alberto@albertolabs.com
 */

@Component({
  selector: 'notte-detail',
  templateUrl: './notteDetail.component.html',
  styleUrls: ['./notteDetail.component.scss']
})
export class NotteDetailComponent extends CrudComponent {

  @Input()  notte : any;
  @Input()  contentIsVisible : boolean = false;
  @Output() contentIsVisibleChange = new EventEmitter<boolean>();

  constructor(
    protected translator: TranslateService,
  	protected toastr: ToastrService,
  	protected authHttp: AuthHttp,
    protected router: Router,
    protected auth : AuthService,
    protected nottesService: NottesService,
    private   route: ActivatedRoute,
    protected navActionService : NavActionService
  ) 
  {
    super(translator, authHttp, toastr, router, auth, nottesService, navActionService);
  }
  
  public  loading: boolean = false;
  private apiUrl: string = AppConfig.settings.api.api_url;
  private submitedForm: boolean = false;
  private encryptionPassword: string;

  /**
   * Get entered encryption password for the current notte
   *
   * @param   String  $event  Entered encryption password
   * @return  [type]  void
   */
  receiveEncryptionPassword($event) 
  {
    this.submitedForm = true;

    // get password
    this.encryptionPassword = $event;

    // reload entity
    this.nottesService.loadEntity(this.notte.id, this.encryptionPassword).subscribe(

      data => {

        this.notte = data.json();

        if( ! data.json().is_encrypted || data.json().is_decrypted ) 
        {
          this.contentIsVisible = true;
        }

        this.loading = false;

        // emit 'contentIsVisibleChange' event
        this.contentIsVisibleChange.emit(true);
      },
      err => {

        this.auth.checkJwtHasExpiredInServerRequest(err);

        let errorBody = JSON.parse(err._body);

        if(err.status == 404 || err.status == 401)
        {
          // this.router.navigateByUrl('404');
        }
        else if(err.status == 500 && errorBody.error == "wrong_encryption_password")
        {
          // wrong encryption password
          this.translator.get('components.docs.detail.wrong_encryption_password').subscribe( (translation: string) => {
            this.toastr.error(translation);
          });
        }
        
        this.loading = false;
      }
    );
  }

  /**
   * Load the edit view
   */
  editEntity() : void
  {
    // redirect to detail view
    this.navActionService.setAction('editNotte');
  }
}
