import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'notte-create',
  templateUrl: './notteCreate.component.html',
  styleUrls: []
})
export class NotteCreateComponent implements OnInit {

  constructor(
  	private toastr: ToastrService,
  	private authHttp: AuthHttp,
    private route: ActivatedRoute
  ) { }

  private apiUrl: string = AppConfig.settings.api.api_url;
  public  notte: JSON;

  ngOnInit()
  {

  }

}
