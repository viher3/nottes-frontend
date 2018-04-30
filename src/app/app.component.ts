import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/user/auth.service';

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
  		private translate: TranslateService,
      private authService: AuthService
  	)
  	{ 
  		translate.addLangs(["en", "es"]);

  		// this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');

      // set lang by user preferences
      translate.use(this.getUserLanguage());
  	}

  	ngOnInit()
  	{
      // check if user is already signed in
      if( ! this.authService.isLoggedIn() || localStorage.getItem("id_token") == null ) 
      {
        this.router.navigate(["/login"]);
      }

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
            let title = "";

            if(typeof event['title'] !== 'undefined')
            {
              // get translation
              this.translate.get('title.' + event['title']).subscribe( (translation: string) => {
                title = " - " + translation;
              });
            }

	      		this.title.setTitle("Nottes" + title);
	      	});
  	}

    getUserLanguage()
    {
      let user = this.authService.getUser();
      
      if(typeof user.language !== "undefined")
      {
        return user.language;
      }
      
      return 'en';
    }

}
