import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from 'app/user/auth.service';
import * as $ from 'jquery';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NavActionService } from 'app/services/shared/nav-action.service';
import { NottesService } from 'app/services/nottes/nottes.service';

/**
 * @class         NotteFormComponent
 * @description   NotteForm component.
 * @author        Alberto Vian - alberto@albertolabs.com
 */

@Component({
  selector: 'notteForm',
  templateUrl: './notteForm.component.html'
})
export class NotteFormComponent implements OnInit 
{
  @Input()  title : string;
  @Input()  saveBtn : string;
  @Input()  action : string;
  @Input()  id : number;
  @Output() loadingEvent = new EventEmitter<boolean>();

  constructor(
    private toastr: ToastrService,
    private authHttp: AuthHttp,
    public router: Router,
    private translator: TranslateService,
    private auth : AuthService,
    private navActionService : NavActionService,
    private nottesService : NottesService
  ) {
      this.submitedForm = false;
      this.isSaving     = false;
    }

  private apiUrl: string = AppConfig.settings.api.api_url;
  public  editor: any;
  public  notte: any = [];
  public  submitedForm: boolean;
  public  isSaving: boolean;
  public  is_encrypted: boolean = false;
  public  loading: boolean = false;
  public  contentIsVisible: boolean = false;
  private formSubmitApiUrl: string;
  public  encryptionPassword: string;
  public  encryptionpwd: string;
  public  encryptionpwd2: string;

  ngOnInit()
  {
    this.notte.is_encrypted = false;

    this.initEditor();

    if(this.action == "edit") 
    {
      this.loadEntity();
    }
    else if(this.action == "create")
    {
      this.contentIsVisible = true;
    }
  }

  /**
   * Initialize wysiwyg editor
   */
  initEditor() : void
  {
    ClassicEditor
      .create( 
        document.querySelector( '#notte-editor'),
        {
          removePlugins: ['ImageUpload'],
          /*
          ckfinder: {
            uploadUrl: 'http://localhost:8080/upload/image'
          }
          */
        }
      )
      .then( editor => 
      {
        this.editor = editor;
      })
      .catch( err => 
      {
        console.error( err.stack );
      });

      //console.log(ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName ));
  }

  /**
   * Check if editor is empty
   */
  editorIsEmpty() : boolean
  {
    var initData = '<p>&nbsp;</p>';
    var editorData = this.editor.data.get();

    if( editorData.replace(initData, "") == '' )
    {
      return true;
    }

    return false;
  }

  /**
   * Submit the form
   *
   * @param   Object  formObj   Form data
   * @return  [type]  void
   */
  onSubmit(formObj) : void
  {
    this.submitedForm = true;

    // add editor content to form object
    formObj.form.value.content = this.editor.data.get();

    // form validation
    if(formObj.valid && ! this.editorIsEmpty() ) 
    {
      // transform fields
      formObj.form.value.isEncrypted = formObj.form.value.is_encrypted;
      delete formObj.form.value.is_encrypted;

      this.loadingEvent.emit(true);

      // save form
      if(this.action == "create")
      {
        this.createNewNotte(formObj);
      }
      else if(this.action == "edit")
      {
        this.updateNotte(formObj);
      }
    }
  }

  /**
   * Load entity data
   *
   * @param   String  encryptionPassword  Encryption password
   * @return  [type]  void
   */
  loadEntity(encryptionPassword: string = "") : void
  {
      let entityEndpoint = this.apiUrl + "/notte/" + this.id;

        if(encryptionPassword.length) 
        {
          entityEndpoint += "?pwd=" + encodeURI( btoa(encryptionPassword) );
        }

        this.authHttp.get(entityEndpoint).subscribe(

          data => {

            this.notte = data.json(); 

            // add content to editor textarea
            this.editor.data.set(this.notte.content)
            //$("div#nottes-editor textarea").val();

            if( ! data.json().is_encrypted || data.json().is_decrypted) 
            {
              this.contentIsVisible = true;
            }

            this.loadingEvent.emit(false);
          },
          err => {

            this.auth.checkJwtHasExpiredInServerRequest(err);

            let errorBody = JSON.parse(err._body);

            if(err.status == 404 || err.status == 401)
            {
              this.router.navigateByUrl('404');
            }
            else if(err.status == 500 && errorBody.error == "wrong_encryption_password")
            {
              // wrong encryption password
              this.translator.get('components.docs.detail.wrong_encryption_password').subscribe( (translation: string) => {
                this.toastr.error(translation);
              });
            }
            

            this.loadingEvent.emit(false);
          }

      );
  }

  /**
   * Receives the encryption password and reloads the entity with that password
   *
   * @param   String  $event  Encryption password
   * @return  [type]  void
   */
  receiveEncryptionPassword($event) : void
  {
    // get password
    this.encryptionPassword = $event;

    // reload entity
    this.loadEntity(this.encryptionPassword);

    // TODO: set password in encryption pwd fields
    this.encryptionpwd = this.encryptionPassword;
    this.encryptionpwd2 = this.encryptionPassword;
  }

  /**
   * Create a new notte (document)
   *
   * @param   Object  formObj   Data sent by the form
   * @return  [type]  void
   */
  private createNewNotte(formObj)
  {
    this.authHttp.post(
      this.apiUrl + "/notte", 
      formObj.form.value
    )
    .subscribe(

      data => {

        var result = data.json();

        // show success alert
        this.translator.get('components.docs.create.success_mss').subscribe( (translation: string) => {
          this.toastr.success(translation);
        });

        // redirect to detail view
        this.navActionService.setAction('init');

        // refresh list entities
        this.nottesService.reloadEntitiesEmitter$.emit(result.id);
      },
      err => {

        this.auth.checkJwtHasExpiredInServerRequest(err);
        // TODO: create handle server errors method (toastr)
        console.log(err);
        this.loadingEvent.emit(false);
      }
    ); 
  }

  /**
   * Update a notte (document)
   *
   * @param   Object  formObj   Data sent by the form
   * @return  [type]  void
   */
  private updateNotte(formObj) : void
  {
    this.authHttp.put(
      this.apiUrl + "/notte/" + this.id, 
      formObj.form.value
    )
    .subscribe(

      data => {

        var result = data.json();

        // show success alert
        this.translator.get('components.docs.edit.success_mss').subscribe( (translation: string) => {
          this.toastr.success(translation);
        });

        // redirect to detail view
        this.navActionService.setAction('init');

        // refresh list entities
        this.nottesService.reloadEntitiesEmitter$.emit(result.id);
      },
      err => {

        this.auth.checkJwtHasExpiredInServerRequest(err);
        // TODO: create handle server errors method (toastr)
        console.log(err);
        this.loadingEvent.emit(false);
      }
    ); 
  }

}
