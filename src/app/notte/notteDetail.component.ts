import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'notte-detail',
  templateUrl: './notteDetail.component.html',
  styleUrls: ['./notteDetail.component.scss']
})
export class NotteDetailComponent implements OnInit {

  constructor(
  	private toastr: ToastrService,
  	private authHttp: AuthHttp,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  private apiUrl: string = AppConfig.settings.api.api_url;
  public  notte: JSON;
  private id: number;

  ngOnInit()
  {
    this.route.params.subscribe(params => 
    {
      this.id = +params["id"];
    });

  	this.loadEntity();
  }

  loadEntity()
  {
    this.authHttp.get(this.apiUrl + "/notte/" + this.id).subscribe(

      data => {
        this.notte = data.json(); 
      },
      err => {

        if(err.status == 404 || err.status == 401)
        {
          this.router.navigateByUrl('404');
        }
        
        console.log(err);
      }

    );
  }

}
