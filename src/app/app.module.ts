import { CommonModule } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthService } from 'app/user/auth.service';
import * as moment from "moment";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './shared';
import { HomeComponent } from './home/home.component'; 
import { JwtHelper } from 'angular2-jwt';
import { ToastrModule } from 'ngx-toastr';

const appRoutes: Routes = [
  { 
    path: '', 
    children: [
      { path: '', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Escritorio' } },
      { path: 'user',  component: UserComponent }
    ],
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },
// { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    DashboardComponent,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    })
  ],
  providers: [
    { provide: 'moment', useValue: moment },
    AuthService,
    JwtHelper,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
