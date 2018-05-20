import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from 'app/user/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'linkForm',
  templateUrl: './linkForm.component.html',
  styleUrls: ['./linkForm.component.scss']
})
export class LinkFormComponent implements OnInit 
{
  @Input() id : number;
  @Input() title : string;
  @Input() saveBtn : string;
  @Input() action : string;
	@Input() link : string;
  @Input() target : string;

  constructor(
    private toastr: ToastrService,
    private authHttp: AuthHttp,
    public router: Router,
    private translator: TranslateService,
    private auth : AuthService
  ) { }

  private apiUrl: string = AppConfig.settings.api.api_url;
  public inputTitle : string;
  public inputUrl : string;
  public inputTags : string;
  public loading : boolean = false;
  public submitedForm : boolean = false;

	ngOnInit()
  {	

  }

  onSubmit(formObj)
  {
    this.submitedForm = true;

    if(formObj.valid)
    {
      this.loading = true;

      // save form
      if(this.action == "create")
      {
        this.createLink(formObj);
      }
      else if(this.action == "edit")
      {
        this.updateLinl(formObj);
      }
    }
  }

  createLink(formObj)
  {
    this.authHttp.post(
      this.apiUrl + "/link", 
      {
        "name" : formObj.form.value.title,
        "content" : formObj.form.value.url,
        "tags" : formObj.form.value.tags
      }
    )
    .subscribe(

      data => {

        var result = data.json();

        // show success alert
        this.translator.get('components.docs.create.success_mss').subscribe( (translation: string) => {
          this.toastr.success(translation);
        });

        // redirect to detail view
        //this.router.navigateByUrl('link/' + result.id);

      },
      err => {

        this.auth.checkJwtHasExpiredInServerRequest(err);
        this.loading = false;
      }
    ); 
  }

  updateLinl(formObj)
  {
    console.log(formObj);
  }
}