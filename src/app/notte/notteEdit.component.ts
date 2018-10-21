import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * @class         NotteEditComponent
 * @description   NotteEdit component.
 * @author        Alberto Vian - alberto@albertolabs.com
 */

@Component({
  selector: 'notte-edit',
  templateUrl: './notteEdit.component.html'
})
export class NotteEditComponent implements OnInit
{
	constructor(
	    private route: ActivatedRoute,
	){ }

	public id: number;

	ngOnInit()
	{
		this.route.params.subscribe(params => 
	    {
	      this.id = + params["id"];
	    });
	}
}
