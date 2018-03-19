import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  	constructor(private router: Router){}

  	ngOnInit()
  	{
	  	if(localStorage.getItem("token") == null)
	  	{
	  		// redirect to login page
	  		this.router.navigate(["/login"]);
	  	}
	  	else
	  	{
	  		// go to dashboard
	  		console.log("go to dashboard");
	  	}
  	}

}
