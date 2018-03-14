import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router){ }

	ngOnInit()
	{
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
				this.router.navigateByUrl('user');
			},
			err => {
				this.submited = false;
				this.errorMssg = err.error.message;
			}
		);
	}

}
