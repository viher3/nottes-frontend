import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  	constructor(
  		private route: ActivatedRoute, 
  		private router: Router, 
  		private title: Title,
  		private translate: TranslateService
  	)
  	{ 
  		translate.addLangs(["en", "es"]);

  		// this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // set lang by browser
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
  	}

  	ngOnInit()
  	{
  		// load <title> value using the provided route data
  		this.router.events
	      .filter((event) => event instanceof NavigationEnd)
	      .map(() => this.route)
	      .map((route) => {
	        while (route.firstChild) route = route.firstChild;
	        return route;
	      })
	      .filter((route) => route.outlet === 'primary')
	      .mergeMap((route) => route.data)
	      .subscribe((event) => 
	      	{
	      		let title = (typeof event['title'] !== 'undefined') ? " - " + event['title'] : "";
	      		this.title.setTitle("Nottes" + title)
	      	});

	  	// redirect to login page
	  	if(localStorage.getItem("id_token") == null)
	  	{
	  		this.router.navigate(["/login"]);
	  	}
  	}

}
