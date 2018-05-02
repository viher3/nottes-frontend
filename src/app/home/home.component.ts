import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/user/auth.service';
import { Router } from '@angular/router';
import { CommonEventsService } from 'app/services/shared/common-events.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    public router: Router,
    private common: CommonEventsService
  ){ }

  ngOnInit() 
  {
    if(this.router.url == "/")
    {
      this.router.navigateByUrl('dashboard');
    }
  }

  isNotteDetailUrl()
  {
    let regex = /\/notte\/\d/;

    if( regex.test(this.router.url) )
    {
      return true;
    }

    return false;
  }

}
