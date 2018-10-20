import { Component, EventEmitter } from '@angular/core';
import { AuthService } from 'app/user/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from "@ngx-translate/core";
import { NavActionService } from 'app/services/shared/nav-action.service';

/**
 * @class         SidebarComponent
 * @description   Sidebar component.
 * @author        Alberto Vian - alberto@albertolabs.com
 */

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent
{
	constructor( 
		private router : Router, 
		private auth : AuthService, 
		private toastr : ToastrService,
		private translator : TranslateService,
		private navActionService : NavActionService
	){
		let user = auth.getUser();
		this.username = user.nickname;
	}

	public action : string = "init";
	public username : string;
	public isSidebarToggled : boolean = false;

	public menu : Array <any> = [

		{ routerLink: "dashboard", translationKey: "", faIco: "fa-bars" },
		{ routerLink: "config", translationKey: "sidebar.config", faIco: "fa-wrench", wrapper: "usermenu" }
	
	];

	/**
	 * Logout the current user
	 */
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

	/**
	 * Toggle sidebar
	 */
	toggleSidebar() : void
	{
	    this.isSidebarToggled = ! this.isSidebarToggled;
	}

	/**
	 * Set action value
	 *
	 * @param String 	action 		Action value
	 */
	setAction(action) : void
	{
		this.navActionService.setAction(action);
	  	this.toggleSidebar();
	}
}