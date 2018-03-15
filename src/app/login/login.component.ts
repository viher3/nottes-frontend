import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/user/auth.service';
import { Router } from '@angular/router';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router){ }

	submited: boolean;
	username: string;
	password: string;

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
		this.checkLogin(this.login.username, this.login.password);
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
			res => {
				this.router.navigateByUrl('dashboard');
			},
			err => {
				this.submited = false;
				this.errorMssg = err.error.message;
			}
		);
	}

}
