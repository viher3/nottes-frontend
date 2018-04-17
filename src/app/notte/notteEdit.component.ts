import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
