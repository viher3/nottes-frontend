import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppConfig } from 'app/app.config';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	private loginUrl = AppConfig.settings.api.login_url;

	loginForm: FormGroup;

	constructor()
	{
		this.loginForm = new FormGroup({
			_username: new FormControl(),
			_password: new FormControl()
		});
	}

	ngOnInit() 
	{
		
	}

	login()
	{
		console.log(this.loginForm.value);
	}

}
