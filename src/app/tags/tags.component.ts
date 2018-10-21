import { Component, Input, OnInit } from '@angular/core';

/**
 * @class         TagsComponent
 * @description   Tags component.
 * @author        Alberto Vian - alberto@albertolabs.com
 */

@Component({
  selector: 'tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {

	@Input() value : string;

	private tags : any;

	constructor()
	{
		this.tags = [];
	}

	ngOnInit()
	{
		this.splitTags();
	}

	/**
	 * Split tags from string
	 */
	private splitTags() : void
	{
		let patt = /,/g;

		if(patt.test(this.value))
		{
			this.tags = this.value.split(',');
		}
		else if(this.value.length)
		{
			this.tags.push(this.value);
		}
		
		/*
		console.log(this.value);
		console.log(this.tags);
		*/
	}
}
