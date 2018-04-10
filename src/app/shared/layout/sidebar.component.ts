import { Component } from '@angular/core';
import { AuthService } from 'app/user/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent
{
	constructor( 
		private router: Router, 
		private auth: AuthService, 
		private toastr: ToastrService,
		private translator: TranslateService
	){ }

	logout()
	{
		this.auth.logout();

		this.translator.get('components.login.logged_out_mssg').subscribe( (translation: string) => {
            this.toastr.success(translation);
        });
		this.router.navigate(["/login"]);
	}
}