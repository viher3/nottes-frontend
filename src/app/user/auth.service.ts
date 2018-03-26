import { Injectable } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

import * as moment from "moment";

@Injectable()
export class AuthService 
{
  	constructor(private http: HttpClient) { }
      
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
        return moment().isBefore(this.getExpiration());
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
