import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'link-edit',
  templateUrl: './linkEdit.component.html'
})
export class LinkEditComponent implements OnInit
{
	constructor(
	    private route: ActivatedRoute,
	){ }

	public id: number;

	ngOnInit()
	{
		
	}
}
