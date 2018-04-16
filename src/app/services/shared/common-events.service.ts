import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Injectable()
export class CommonEventsService
{
  constructor(
  	private router: Router
  ) 
  {
    this.init();
  }

  init()
  {
    this._setLoginBodyClass();
  }

  _setLoginBodyClass()
  {
    if(this.router.url == "/login")
    {
      $("body").addClass("login-body");
    }
    else
    {
      $("body").removeClass("login-body");
    }
  }
}
