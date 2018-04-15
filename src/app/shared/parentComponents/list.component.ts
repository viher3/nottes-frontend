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
	public  selectedItems: any[] = [];
  	public  selectedAll: boolean = false;
  	public  listElements: listElements;
  	public 	paginationTransParams: paginationTransParams;
  	private entityApiUrl: string = AppConfig.settings.api.api_url + "/" + this.entityName;

	selectFromList(item)
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

	selectAll(event)
	{
	    this.selectedItems = [];
	    if( ! event.target.checked ) return;

	    // add all items
	    for(var i in this.listElements) 
	    {
	      this.selectedItems.push(this.listElements[i]);
	    }
	}

	isSelected(item)
	{
	    if( this.selectedItems.indexOf(item) > -1 ) return true;
	    return false;
	}

	removeSelectedItems()
	{
		this.translator.get('common.remove_items').subscribe( (translation: string) => {
        	
			if( confirm(translation) ) 
			{
				for(let item of this.selectedItems)
				{
					this.deleteItem(item, this.entityNameField);
				}

				this.loadEntities();
			}
      	});
	}

	loadEntities()
	{
		this.authHttp.get(this.entityApiUrl).subscribe(

	    	data => {

	        	this.listElements = data.json(); 

	    		// set translation params
	    		this.setPaginationTranslations();
	        	this.loading = false;
	      	},
	      	err => {
		        console.log(err);
		        this.loading = false;
	      	}

	    );
	}

	private deleteItem(item, nameField)
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
		let current = ( (this.listElements).current_page_number * (this.listElements).num_items_per_page );

		this.paginationTransParams = {
			"current" : current,
			"total" : (this.listElements).total_count
		}
	}
}