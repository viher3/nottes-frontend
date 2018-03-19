import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router){ }

  ngOnInit() 
  {
  	// check if user is already signed in
	if( this.authService.isLoggedIn() ) this.router.navigateByUrl('dashboard');
  }

}
