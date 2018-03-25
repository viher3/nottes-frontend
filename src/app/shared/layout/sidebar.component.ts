import { Component } from '@angular/core';
import { AuthService } from 'app/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent 
{
	constructor( private router: Router, private auth: AuthService ){ }

	logout()
	{
		this.auth.logout();
		this.router.navigate(["/login"]);
	}
}