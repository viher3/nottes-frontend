import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from 'app/user/auth.service';
import { NavActionService } from 'app/services/shared/nav-action.service';
import { NottesService } from 'app/services/nottes/nottes.service';
import * as $ from 'jquery';

/**
 * @class         LinkFormComponent
 * @description   LinkForm component.
 * @author        Alberto Vian - alberto@albertolabs.com
 */

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
    private auth : AuthService,
    private navActionService : NavActionService,
    private nottesService : NottesService
  ) { }

  private apiUrl: string = AppConfig.settings.api.api_url;
  public inputTitle : string;
  public inputUrl : string;
  public inputTags : string;
  public loading : boolean = false;
  public submitedForm : boolean = false;

  ngOnInit()
  {
    if(this.action == "edit")
    {
      this.loadEntity();
    }
  }

  /**
   * Form submit
   * 
   * @param    Object   formObj   Form data
   * @return   [type]   void
   */
  onSubmit(formObj) : void
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
        this.updateLink(formObj);
      }
    }
  }

  /**
   * Create a new link entity
   *
   * @param   Object    formObj   Form data
   * @return  [type]    void
   */
  createLink(formObj) : void
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
        this.navActionService.setAction('init');

        // refresh list entities
        this.nottesService.reloadEntitiesEmitter$.emit();
      },
      err => {

        this.auth.checkJwtHasExpiredInServerRequest(err);
        this.loading = false;
      }
    ); 
  }

  loadEntity()
  {
    let entityEndpoint = this.apiUrl + "/notte/" + this.id;

    this.authHttp.get(entityEndpoint).subscribe(

      data => {

        var link = data.json();

        this.inputTitle = link.name;
        this.inputUrl = link.content;
        this.inputTags = link.tags;

        this.loading = false;

      },
      err => {

        this.auth.checkJwtHasExpiredInServerRequest(err);

        let errorBody = JSON.parse(err._body);

        if(err.status == 404 || err.status == 401)
        {
          this.router.navigateByUrl('404');
        }
        
        this.loading = false;
      }

    );
  }

  updateLink(formObj)
  {
    var params = {
      "name" : formObj.form.value.title,
      "content" : formObj.form.value.url,
      "tags" : formObj.form.value.tags
    }

    this.authHttp.put(
      this.apiUrl + "/notte/" + this.id, 
      params
    )
    .subscribe(

      data => {

        var result = data.json();

        // show success alert
        this.translator.get('components.links.edit.success_mss').subscribe( (translation: string) => {
          this.toastr.success(translation);
        });

        // redirect to detail view
        this.router.navigateByUrl('dashboard');

      },
      err => {

        this.auth.checkJwtHasExpiredInServerRequest(err);
        // TODO: create handle server errors method (toastr)
        console.log(err);
        this.loading = false;
      }
    ); 
  }
}