import { BrowserModule } from '@angular/platform-browser';
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
import { SidebarComponent, HeaderComponent } from './shared';
import { HomeComponent } from './home/home.component'; 

const appRoutes: Routes = [
  { 
    path: '', 
    children: [
      { path: '', component: HomeComponent },
      { path: 'dashboard',  component: DashboardComponent },
      { path: 'user',  component: UserComponent }
    ]
    component: HomeComponent 
  },
  { path: 'login', component: LoginComponent },
// { path: '**', component: PageNotFoundComponent }
];

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
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
    rootRouting
  ],
  providers: [
    { provide: 'moment', useValue: moment },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
