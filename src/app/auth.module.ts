import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppConfig } from 'app/app.config';
 
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  	return new AuthHttp(new AuthConfig({
    	tokenName: 'token',
        tokenGetter: (() => localStorage.getItem(AppConfig.settings.users.session.tokenKey)),
        globalHeaders: [{'Content-Type':'application/json'}],
        noClientCheck: true
    }), 
    http, 
    options);
}
 
@NgModule({
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class AuthModule {}