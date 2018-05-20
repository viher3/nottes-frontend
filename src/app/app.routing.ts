import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { HomeComponent } from './home/home.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './shared/errors/pageNotFound.component';
import { NotteDetailComponent } from './notte/notteDetail.component';
import { NotteCreateComponent } from './notte/notteCreate.component';
import { NotteEditComponent } from './notte/notteEdit.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { LinkCreateComponent } from 'app/link/linkCreate.component';
import { LinkFormComponent } from 'app/link/linkForm.component';

export const AppRoutes: Routes = [
  { 
    path: '', 
    children: [
      { path: '', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent, data: { title: 'dashboard' } },
      { path: 'user',  component: UserComponent },
      { path: 'notte/create', component: NotteCreateComponent, data: { title: 'createDoc' } },
      { path: 'notte/edit/:id', component: NotteEditComponent, data: { title: 'editDoc' } },
      { path: 'notte/:id', component: NotteDetailComponent },
      { path: 'link/create', component: LinkCreateComponent },
      { path: 'config', component: ConfigurationComponent, data: { title: 'configuration' } }
    ],
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent, data: { title: 'login' } },
  { path: '404', component: PageNotFoundComponent, data: { title: '404error' } },
  { path: '**', redirectTo: '/404' }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);