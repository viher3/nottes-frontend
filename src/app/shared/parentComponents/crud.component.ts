import { Component, Input } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';

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
		protected entityName: String,
		protected entityNameField: String
	){ }

  	private entityApiUrl: string = AppConfig.settings.api.api_url + "/" + this.entityName;

  	deleteEntity(id)
  	{

  	}
}