import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import $ from "jquery";
import { NottesEditor } from 'nottes-editor.min.js';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'notte-create',
  templateUrl: './notteCreate.component.html',
  styleUrls: ['./notteCreate.component.scss']
})
export class NotteCreateComponent implements OnInit {

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
  public  notte: JSON;
  public  submitedForm: boolean;
  public  isSaving: boolean;
  public  isEncrypted: boolean;
  public  editor: any;
  public  loading: boolean = false;
  public  editorIsEmpty: boolean = true;

  ngOnInit()
  {
    this.editor = new NottesEditor("div#nottes-editor", 
    {
      "language"      : "en",
      "image_upload_url"  : AppConfig.settings.api.api_image_upload
    });

    this.isEncrypted = false;
    
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
      this.loading = true;

      // save
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
  }

}
