import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import $ from "jquery";
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
    private route: ActivatedRoute,
    private router: Router
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

  onSubmit(formObj)
  {
    // TODO: create loading component directive ...
    this.submitedForm = true;

    // add editor content to form object
    formObj.form.value.content = this.editor.getContent();

    if(formObj.valid) 
    {
      // save
      this.authHttp.post(
        this.apiUrl + "/notte", 
        formObj.form.value
      )
      .subscribe(

        data => {
          var result = data.json();

          console.log(result.id);
          this.router.navigateByUrl('notte/' + result.id);

        },
        err => {
          // TODO: create handle server errors method (toastr)
          console.log(err);
        }
      );   
    }
  }

}
