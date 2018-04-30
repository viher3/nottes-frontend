import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/user/auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private router: Router
  ){ }

  ngOnInit() 
  {
    if(this.router.url == "/")
    {
      this.router.navigateByUrl('dashboard');
    }

    this.scrollTop();
  }

  scrollTop()
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
