import { Component, EventEmitter, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'app/user/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from "@ngx-translate/core";
import { NavActionService } from 'app/services/shared/nav-action.service';
import { SearchService } from 'app/services/search/search.service';
import { NottesService } from 'app/services/nottes/nottes.service';
import { CommonEventsService } from 'app/services/shared/common-events.service';

/**
 * @class         SidebarComponent
 * @description   Sidebar component.
 * @author        Alberto Vian - alberto@albertolabs.com
 */

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})

export class SidebarComponent
{
	constructor( 
		private router : Router, 
		private auth : AuthService, 
		private toastr : ToastrService,
		private translator : TranslateService,
		private navActionService : NavActionService,
		private searchService : SearchService,
		private nottesService: NottesService,
		private commonEventsService : CommonEventsService
	){
		let user = auth.getUser();
		this.username = user.nickname;
	}

	public action : string = "init";
	public username : string;
	public isSidebarToggled : boolean = false;
	public searchTerm : string = "";
	public isSearch : boolean = false;
	public appWidth = $(window).width();

	public menu : Array <any> = [

		{ routerLink: "dashboard", translationKey: "", faIco: "fa-bars" },
		{ routerLink: "config", translationKey: "sidebar.config", faIco: "fa-wrench", wrapper: "usermenu" }
	
	];

	ngOnInit()
	{
		// subscribe to 'getSearchResultsEvent' event
	    this.searchService.isSearchEvent.subscribe(isSearch => {
	      this.isSearch = isSearch;
	    });
	}

	/**
	 * Update appWidth value when desktop is resized
	 * 
	 * @param 	Object 	event 	On resize event object
	 * @return 	[type]	void
	 */
	onResize(event) : void
	{
    	this.appWidth = event.target.innerWidth;
   	}

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
	 * Set action value
	 *
	 * @param String 	action 		Action value
	 */
	setAction(action : string) : void
	{
		// check route
		var currentRoute = this.router.url;

		if(currentRoute == "/dashboard")
		{
			this.navActionService.setAction(action);
		}
		else
		{
			// redirect to dashboard
			this.navActionService.setAction(action);
			this.router.navigateByUrl('dashboard');
		}
	}

	/**
	 * Load home
	 */
	loadHome() : void
	{
		this.setAction('init');
		// TODO: reload entities
	}

	/**
	 * Trigger the search event when the Enter key is pressed inside the search form.
	 *
	 * @param   Event   any   Key event
	 * @return  [type]  void
	 */
	searchOnKey(event: any) : void
	{
		if(event.key == "Enter") this.search();
	}

	/**
	 * Get all entities matching with the entered search query.
	 *
	 * @param   Event   any   Key event
	 * @return  [type]  void
	 */
	search() : void
	{
		this.setAction('init');
		this.searchService.search(this.searchTerm);
	}

	/**
	 * Clear search results.
	 *
	 * @return  [type]  void
	 */
	clearSearch() : void
	{
		this.searchTerm = "";
		this.setAction('init');
		this.nottesService.loadEntities();
		this.commonEventsService.scrollItemsListToTop();
	}

	/**
	 * Check if app stauts is responsive
	 * @return 	Boolean 	true|false
	 */
	isResponsive() : boolean
	{
		if(this.appWidth < 992) return true;
		return false;
	}
}