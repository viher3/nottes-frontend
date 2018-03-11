import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppConfig } from 'app/app.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	private loginUrl = AppConfig.settings.api.login_url;

	ngOnInit() {}

	login()
	{
		
	}

}
