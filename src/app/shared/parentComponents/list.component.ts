import { Component, Input } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { listElements, paginationTransParams } from 'app/shared/parentComponents/list.interface'
import { AuthService } from 'app/user/auth.service';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html'
})

export class ListComponent
{
	constructor(
		protected translator: TranslateService,
		protected authHttp: AuthHttp,
		protected toastr: ToastrService,
		protected auth : AuthService
	){ }
	
	private entityName : string = "notte";
	private entityNameField : string = "name";

	public  loading: boolean = false;
	public  selectedItems: any[] = [];
  	public  selectedAll: boolean = false;
  	public  isSearch : boolean = false;
  	public  searchTerm : string = "";
  	public  listElements: listElements = {};
  	public 	paginationTransParams: paginationTransParams;
  	public 	currentPaginationPosition: number = 0;
  	private entityApiUrl: string = AppConfig.settings.api.api_url + "/" + this.entityName;
  	private searchResultTransParams = { value : "" };

	selectFromList(item) : void
	{
	    if( this.selectedItems.indexOf(item) > -1 ) 
	    {
	      // remove item
	      let index = this.selectedItems.indexOf(item);
	      this.selectedItems.splice(index, 1);
	    }
	    else
	    {
	      // add item
	      this.selectedItems.push(item);
	    }
	}

	selectAll(event) : void
	{
	    this.selectedItems = [];
	    if( ! event.target.checked ) return;

	    // add all items
	    for(var i in this.listElements.items) 
	    {
	      this.selectedItems.push(this.listElements.items[i]);
	    }
	}

	isSelected(item) : boolean
	{
	    if( this.selectedItems.indexOf(item) > -1 ) return true;
	    return false;
	}

	removeSelectedItems() : void
	{
		this.translator.get('common.remove_items').subscribe( (translation: string) => {
        	
			if( confirm(translation) ) 
			{
				for(let item of this.selectedItems)
				{
					this.deleteItemRequest(item, this.entityNameField);
				}

				// this.loadEntities();
			}
      	});
	}

	loadMore() : void
	{
		let nextPage = Number(this.listElements.current_page_number) + 1;

		if(this.isSearch)
		{
			// TODO ..
			// this.searchEntities(nextPage, true);
		}
		else
		{
			// this.loadEntities(nextPage, true);
		}
	}

	deleteItem(item, nameField) : void
	{
		this.translator.get('common.remove_items').subscribe( (translation: string) => {
        	
			if( confirm(translation) ) 
			{
				this.deleteItemRequest(item, nameField, true);
			}
		});
	}

	private deleteItemRequest(item, nameField, reload: boolean = false) : void
	{
		this.authHttp.delete(
	        this.entityApiUrl + "/" + item.id
      	)
      	.subscribe(

	        data => {

	          	var result = data.json();

	          	// show success alert
	          	this.translator.get('components.list.delete.success_mssg', { itemName: item[nameField] }).subscribe( (translation: string) => {
	            	this.toastr.success(translation, null, { enableHtml: true });
	          	});

	          	// remove form selected item list
	          	var index = this.selectedItems.indexOf(item);
	      		this.selectedItems.splice(index, 1);

	      		if(reload) 
	      		{
	      			// this.loadEntities();
	      		}

	      		this.loading = false;

	        },
	        err => {

	        	this.auth.checkJwtHasExpiredInServerRequest(err);

	        	this.translator.get('components.list.delete.error_mssg', { itemName: item[nameField] }).subscribe( (translation: string) => {
	            	this.toastr.error(translation, null, { enableHtml: true });
	          	});

	          	this.loading = false;

	          	// TODO: create handle server errors method (toastr)
	          	console.log(err);
        	}
      	);
	}
}