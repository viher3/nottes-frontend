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

  init() : void
  {
    this._setLoginBodyClass();
  }

  _setLoginBodyClass() : void
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
