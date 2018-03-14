import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppConfig } from 'app/app.config';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	private loginUrl = AppConfig.settings.api.login_url;

	loginForm: FormGroup;

	constructor(private http: HttpClient)
	{
		this.loginForm = new FormGroup({
			_username: new FormControl(),
			_password: new FormControl()
		});
	}

	ngOnInit()
	{
		this.submited = false;
	}

	private checkLogin(email: string, password: string)
	{
		let result = this.http.post<User>(this.loginUrl, {
			"_username" : email, 
			"_password" : password
		})
		.subscribe(
	        res => {

	          	console.log(res);
	        	let jwtToken = res.token;

	        },
	        err => {

	          	console.log(err);
	        	alert(err.error.message);
	        }
	    );
	}

	login()
	{
		this.submited = true;
		//this.checkLogin(this.login.username, this.login.password);
	}

}
