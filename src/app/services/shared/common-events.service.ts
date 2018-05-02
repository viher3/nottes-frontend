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
    this._scrollTop();
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

  _scrollTop()
  {
    $(window).scroll(function()
    {
        if ($(this).scrollTop() > 100)
        {
            $('.scrollTop').fadeIn();
        }
        else
        {
            $('.scrollTop').fadeOut();
        }
    });

    $('.scrollTop').on('click', function(e)
    {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 600);
    });
  }
}
