import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },

  // Protected area (Admin-only for now)
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./shell/app-shell.component').then(m => m.AppShellComponent),
    children: [
      { path: 'dashboard', loadComponent: () => import('./dashboards/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'form',      loadComponent: () => import('./forms/admin-form.component').then(m => m.AdminFormComponent) },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  },

  { path: '**', redirectTo: 'dashboard' }
];
