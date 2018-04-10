import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { ActivatedRoute } from '@angular/router';
// import $ from "jquery";
import { NottesEditor } from 'nottes-editor.min.js';

@Component({
  selector: 'notte-create',
  templateUrl: './notteCreate.component.html',
  styleUrls: ['./notteCreate.component.scss']
})
export class NotteCreateComponent implements OnInit {

  constructor(
  	private toastr: ToastrService,
  	private authHttp: AuthHttp,
    private route: ActivatedRoute
  ) {
      this.submitedForm = false;
      this.isSaving     = false;
    }

  private apiUrl: string = AppConfig.settings.api.api_url;
  public  notte: JSON;
  public  submitedForm: boolean;
  public  isSaving: boolean;
  public  editor: any;

  ngOnInit()
  {
    this.editor = new NottesEditor("div#nottes-editor", 
    {
      "language"      : "en",
      "image_upload_url"  : "http://localhost:8000/upload/image"
    });
  }

  onSubmit(form)
  {
    this.submitedForm = true;

    console.log(this.title);

    if(form.valid) 
    {
      // TODO      
    }
  }

  checkEncryptionPasswords(form)
  {
    
  }
}
