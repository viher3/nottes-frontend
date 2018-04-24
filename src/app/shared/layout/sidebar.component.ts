import { Component } from '@angular/core';
import { AuthService } from 'app/user/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent
{
	constructor( 
		private router: Router, 
		private auth: AuthService, 
		private toastr: ToastrService,
		private translator: TranslateService
	){ }

	logout() : void
	{
		this.auth.logout();

		this.translator.get('components.login.logged_out_mssg').subscribe( (translation: string) => {
            this.toastr.success(translation);
        });
		this.router.navigate(["/login"]);
	}

	isActiveRoute(routeValue : string) : boolean
	{
		if( this.router.url == '/' + routeValue ) return true;
		return false;
	}
}