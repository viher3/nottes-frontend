import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { HomeComponent } from './home/home.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';

export const AppRoutes: Routes = [
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

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);