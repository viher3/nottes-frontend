import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
  	private toastr: ToastrService,
  	private authHttp: AuthHttp
  ) { }

  private apiUrl: string = AppConfig.settings.api.api_url;
  public  nottes: Array;

  ngOnInit()
  {
  	this.loadEntities();
  }

  loadEntities()
  {
	 this.authHttp.get(this.apiUrl + "/notte")
      .subscribe(
        data => {
          this.nottes = data.json(); 
        },
        err => {
          console.log(err)
        },
        () => console.log('Request Complete')
    );

  }

}
