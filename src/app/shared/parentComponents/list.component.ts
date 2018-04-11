import { Component, Input } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html'
})

export class ListComponent
{
	constructor(
		protected translator: TranslateService
	){ }

	public  selectedItems: number[] = [];
  	public  selectedAll: boolean = false;
  	public  listElements: JSON;

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
				
			}
      	});
	}
}