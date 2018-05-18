import { Component, Input } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { AuthService } from 'app/user/auth.service';

@Component({
  selector: 'crud-component',
  templateUrl: './crud.component.html'
})

export class CrudComponent
{
	constructor(
		protected translator: TranslateService,
		protected authHttp: AuthHttp,
		protected toastr: ToastrService,
		protected router: Router,
    	protected auth : AuthService
	){ }

	private entityName : string = "notte";
	private entityNameField : string = "name";
	private entityListUrl : string = "/dashboard";

  	private entityApiUrl: string = AppConfig.settings.api.api_url + "/" + this.entityName;
  	protected loading: boolean = false;

  	deleteEntity(item)
  	{
  		this.translator.get('common.remove_item').subscribe( (translation: string) => {

	  		if( confirm(translation) )
	  		{
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

			          	// redirect to list view
          				this.router.navigateByUrl(this.entityListUrl);

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
	  		}
        });
  	}
}