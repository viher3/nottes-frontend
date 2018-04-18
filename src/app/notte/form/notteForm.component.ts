import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { NottesEditor } from 'nottes-editor.min.js';
import { TranslateService } from "@ngx-translate/core";
import * as $ from 'jquery';

/*
export interface notte
{
  content?: string,
  created_at?: string,
  creator_user?: JSON,
  id?: number,
  is_decrypted?: boolean,
  is_encrypted?: boolean,
  name?: string,
  tags?: string,
  updated_at?: string
}
*/

@Component({
  selector: 'notteForm',
  templateUrl: './notteForm.component.html'
})
export class NotteFormComponent implements OnInit 
{
  @Input() title : string;
  @Input() saveBtn : string;
  @Input() action : string;
  @Input() id : number;

  constructor(
    private toastr: ToastrService,
    private authHttp: AuthHttp,
    private router: Router,
    private translator: TranslateService
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
  public  editorIsEmpty: boolean = true;
  public  contentIsVisible: boolean = false;
  private formSubmitApiUrl: string;

  ngOnInit()
  {
    this.notte.is_encrypted = false;

    this.loadEditor();

    if(this.action == "edit") 
    {
      this.loadEntity();
    }
  }

  onSubmit(formObj)
  {
    this.submitedForm = true;

    // add editor content to form object
    formObj.form.value.content = this.editor.getContent();

    // check editor is empty
    this.editorIsEmpty = ( ! formObj.form.value.content.length) ? true : false;

    // form validation
    if(formObj.valid && ! this.editorIsEmpty) 
    {
      // transform fields
      formObj.form.value.isEncrypted = formObj.form.value.is_encrypted;
      delete formObj.form.value.is_encrypted;

      this.loading = true;

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

  loadEntity(encryptionPassword: string = "")
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
            $("div#nottes-editor textarea").val(this.notte.content);

            if( ! data.json().is_encrypted || data.json().is_decrypted ) 
            {
              this.contentIsVisible = true;
            }

            this.loading = false;
          },
          err => {

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
            
            this.loading = false;
          }

      );
  }

  private loadEditor()
  {
    this.editor = new NottesEditor("div#nottes-editor", 
    {
      "language"      : "en",
      "image_upload_url"  : AppConfig.settings.api.api_image_upload
    });
  }

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
        this.router.navigateByUrl('notte/' + result.id);

      },
      err => {
        // TODO: create handle server errors method (toastr)
        console.log(err);
        this.loading = false;
      }
    ); 
  }

  private updateNotte(formObj)
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
        this.router.navigateByUrl('notte/' + result.id);

      },
      err => {
        // TODO: create handle server errors method (toastr)
        console.log(err);
        this.loading = false;
      }
    ); 
  }

}