import { Component } from '@angular/core';
import { AuthService } from 'app/user/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent
{
	constructor( 
		private router: Router, 
		private auth: AuthService, 
		private toastr: ToastrService 
	){ }

	logout()
	{
		this.auth.logout();
		this.toastr.success('You have been logged out correctly.');
		this.router.navigate(["/login"]);
	}
}