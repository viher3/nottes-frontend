import { Component, Input } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { listElements, paginationTransParams } from 'app/shared/parentComponents/list.interface'

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
		protected entityName: String,
		protected entityNameField: String
	){

	}

	public  loading: boolean = false;
	public  loadingMore: boolean = false;
	public  selectedItems: any[] = [];
  	public  selectedAll: boolean = false;
  	public  listElements: listElements;
  	public 	paginationTransParams: paginationTransParams;
  	public 	currentPaginationPosition: number = 0;
  	private entityApiUrl: string = AppConfig.settings.api.api_url + "/" + this.entityName;

	selectFromList(item) : void
	{
	    if( this.selectedItems.indexOf(item) > -1 ) 
	    {
	      // remove item
	      var index = this.selectedItems.indexOf(item);
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

				this.loadEntities();
			}
      	});
	}

	loadEntities(page: number = 1, append: boolean = false) : void
	{
		let currItems = [];
		let entityUrl = this.entityApiUrl + "?page=" + page;

		this.loadingMore = true;

		if( append && typeof this.listElements !== "undefined" )
		{
			currItems = this.listElements.items;
		}

		this.authHttp.get(entityUrl).subscribe(

	    	data => {

	        	this.listElements = data.json();

	        	if(append)
	        	{
	        		let newItems = this.listElements.items;

	        		this.listElements.items = [];

	        		for(let item of currItems) 	this.listElements.items.push(item);
	        		for(let item of newItems) 	this.listElements.items.push(item);
	        	}

	    		// set translation params
	    		this.setPaginationTranslations();
	        	this.loading = false;
	        	this.loadingMore = false;
	      	},
	      	err => {
		        console.log(err);
		        this.loading = false;
		        this.loadingMore = false;
	      	}

	    );
	}

	loadMore() : void
	{
		let nextPage = Number(this.listElements.current_page_number) + 1;
		this.loadEntities(nextPage, true);
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
	      			this.loadEntities();
	      		}

	      		this.loading = false;

	        },
	        err => {

	        	this.translator.get('components.list.delete.error_mssg', { itemName: item[nameField] }).subscribe( (translation: string) => {
	            	this.toastr.error(translation, null, { enableHtml: true });
	          	});

	          	this.loading = false;

	          	// TODO: create handle server errors method (toastr)
	          	console.log(err);
        	}
      	);
	}

	private setPaginationTranslations() : void
	{
		this.currentPaginationPosition = ( (this.listElements).current_page_number * (this.listElements).num_items_per_page );

		this.paginationTransParams = {
			"current" : this.currentPaginationPosition,
			"total" : this.listElements.total_count
		}
	}
}