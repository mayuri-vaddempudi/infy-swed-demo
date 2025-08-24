import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },

  {
  path: '',
  canActivate: [authGuard],
  loadComponent: () => import('./shell/app-shell.component').then(m => m.AppShellComponent),
  children: [
    { path: 'dashboard', loadComponent: () => import('./dashboards/dashboard-shell.component').then(m => m.DashboardShellComponent) },
    { path: 'form',      loadComponent: () => import('./forms/form-shell.component').then(m => m.FormShellComponent) },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
  ]
},
  { path: '**', redirectTo: 'dashboard' }
];
