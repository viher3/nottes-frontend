import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
