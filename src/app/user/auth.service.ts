import { Injectable } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from "@ngx-translate/core";

import * as moment from "moment";

@Injectable()
export class AuthService 
{
  	constructor(
  		private http: HttpClient,
  		private toastr: ToastrService,
  		private translator: TranslateService
  	) { }
      
  	private loginUrl: 	string 	= AppConfig.settings.api.login_url;
  	private expiresIn: 	string 	= AppConfig.settings.users.session.expirationInHours;
  	private tokenKey: 	string 	= AppConfig.settings.users.session.tokenKey;

  	/** 
	 * Check login credentials
	 * @param 	string 		email
	 * @param 	string 		password
	 * @return 	promise
	 */
    login(email:string, password:string ) 
    {
    	return new Promise( (resolve, reject) => {

    		this.http.post(this.loginUrl, {
				"_username" : email, 
				"_password" : password
			})
			.toPromise()
			.then(
				res => 
				{
					this.setSession(res);
					resolve(res);
				},
				err => 
				{
					console.log("error auth.service.ts");
					console.log(err);
					console.log("- end - error auth.service.ts");
					reject(err);
				}
			);

    	});
	}

	/** 
	 * Save the user JWT token in the local storage
	 * @param 	json 		authResult
	 */
	private setSession(authResult) 
	{
        const expiresAt = moment().add(this.expiresIn, 'hour');

        localStorage.setItem(this.tokenKey, authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          

    /** 
	 * Destroys current user session
	 */
    logout() 
    {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    /** 
	 * Check if user is logged in
	 */
    isLoggedIn() 
    {
    	let isLoggedIn = moment().isBefore( this.getExpiration() );

    	if( ! isLoggedIn && localStorage.getItem("expires_at") )
    	{
    		// show alert
    		this.translator.get('components.login.session_expired').subscribe( (translation: string) => {
	            this.toastr.warning(translation);
	        });
    	}

        return isLoggedIn;
    }

    /** 
	 * Check if user is logged out
	 */
    isLoggedOut() 
    {
        return !this.isLoggedIn();
    }

    /** 
	 * Get user session expiration time
	 */
    getExpiration() 
    {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
	} 

	/**
	 * Get user info from token.
	 * @return JSON
	 */
	getUser()
	{
		let authToken = localStorage.getItem(this.tokenKey);

		if( authToken.length )
		{
			let jwtHelper: JwtHelper = new JwtHelper();
    		
    		return jwtHelper.decodeToken(authToken);
		}

		return {};
	}	

}
