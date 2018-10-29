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
  }

  /**
   * Scroll the entities list to the top
   * 
   * @return  [type]    void
   */
  scrollItemsListToTop() : void
  {
    // scroll to top
    $("div.left-item-list div.notte-list-item-main-wrapper").animate({scrollTop:"0px"});
  }
}
