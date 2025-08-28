import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { FormComponent } from './forms/form.component';
import { DashboardComponent } from './dashboards/dashboard.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', canActivate: [authGuard], component: DashboardComponent },
  { path: 'form', canActivate: [authGuard], component: FormComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },
];
