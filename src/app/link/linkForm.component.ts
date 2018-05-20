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

  public url : string;
  public tags : string;
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
    
    console.log(formObj);
  }

  updateLinl(formObj)
  {
    console.log(formObj);
  }
}