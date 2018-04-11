import { Component } from '@angular/core';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html'
})

export class ListComponent
{
	constructor(){ }

	prueba()
	{
		alert("prueba ok");
	}
}