import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'notte-detail',
  templateUrl: './notteDetail.component.html',
  styleUrls: ['./notteDetail.component.scss']
})
export class NotteDetailComponent implements OnInit {

  constructor(
  	private toastr: ToastrService,
  	private authHttp: AuthHttp
  ) { }

  private apiUrl: string = AppConfig.settings.api.api_url;
  public  notte: JSON;

  ngOnInit()
  {
  	this.loadEntity();
  }

  loadEntity()
  {
    
  }

}
