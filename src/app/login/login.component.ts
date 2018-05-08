import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/user/auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { CommonEventsService } from 'app/services/shared/common-events.service'
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(
		private authService: AuthService, 
		private router: Router,
		private common: CommonEventsService,
		private translator: TranslateService
	)
	{ }

	submited: boolean;
	username: string;
	password: string;
	errorMssg: string;

	ngOnInit()
	{
		// check if user is already signed in
		if( this.authService.isLoggedIn() ) this.router.navigateByUrl('dashboard');

		this.submited = false;
	}

	/** 
	 * Handles form submit
	 */
	login()
	{
		this.submited = true;
		this.checkLogin(this.username, this.password);
	}
	
	/** 
	 * Check login credentials
	 * @param 	string 		email
	 * @param 	string 		password
	 */
	private checkLogin(email: string, password: string)
	{
		this.authService.login(email, password)
		.then(
			res => 
			{
				this.router.navigateByUrl('dashboard');
			},
			err => 
			{
				this.submited = false;

				let errMessage = err.error.message.message;

				if(err.error.code == 401 && err.error.message.message == "bad_credentials")
				{
					this.translator.get('components.login.bad_credentials').subscribe( (translation: string) => {
						this.errorMssg = translation;
			        });
				}
				else
				{
					this.errorMssg = errMessage;
				}
			}
		);
	}

}
