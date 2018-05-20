import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthHttp, JwtHelper, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';
import { AuthModule } from 'app/auth.module'
import { AppComponent } from 'app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'app/login/login.component';
import { UserComponent } from 'app/user/user.component';
import { NotteDetailComponent } from 'app/notte/notteDetail.component';
import { NotteCreateComponent } from 'app/notte/notteCreate.component';
import { NotteEditComponent } from 'app/notte/notteEdit.component';
import { NotteFormComponent } from 'app/notte/form/notteForm.component';
import { LinkCreateComponent } from 'app/link/linkCreate.component';
import { LinkFormComponent } from 'app/link/linkForm.component';
import { AuthService } from 'app/user/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent, GeneralConfigurationComponent, SecurityConfigurationComponent } from './configuration';
import { SidebarComponent, PageNotFoundComponent, ListComponent, CrudComponent, SpinnerComponent, EncryptionPasswordComponent } from './shared';
import { HomeComponent } from './home/home.component'; 
import { ToastrModule } from 'ngx-toastr';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { ROUTING } from 'app/app.routing';
import * as moment from "moment";
import * as $ from 'jquery';
import { CommonEventsService } from 'app/services/shared/common-events.service'

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    DashboardComponent,
    SidebarComponent,
    PageNotFoundComponent,
    ListComponent,
    CrudComponent,
    EncryptionPasswordComponent,
    SpinnerComponent,
    HomeComponent,
    NotteDetailComponent,
    NotteCreateComponent,
    NotteEditComponent,
    NotteFormComponent,
    LinkCreateComponent,
    LinkFormComponent,
    ConfigurationComponent,
    GeneralConfigurationComponent,
    SecurityConfigurationComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
    AuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { 
      provide: 'moment', 
      useValue: moment 
    },
    AuthService,
    JwtHelper,
    Title,
    CommonEventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
