import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { ListComponent } from 'app/shared';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends ListComponent implements OnInit {

  constructor(
  	private toastr: ToastrService,
    private authHttp: AuthHttp,
    protected translator: TranslateService
  ) 
  {
    super(translator);
  }

  private apiUrl: string = AppConfig.settings.api.api_url;

  ngOnInit()
  {
  	this.loadEntities();
  }

  loadEntities()
  {
	  this.authHttp.get(this.apiUrl + "/notte").subscribe(

      data => {
        this.listElements = data.json(); 
      },
      err => {
        console.log(err);
      }

    );
  }

}