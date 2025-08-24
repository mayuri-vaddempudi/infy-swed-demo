// src/app/dashboards/dashboard-shell.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, Role } from '../auth/auth.service';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { AgentDashboardComponent } from './agent/agent-dashboard.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard.component';
import { ManagerDashboardComponent } from './manager/manager-dashboard.component';

@Component({
  standalone: true,
  imports: [CommonModule, AdminDashboardComponent, ManagerDashboardComponent, AgentDashboardComponent, CustomerDashboardComponent],
  template: `
    <ng-container [ngSwitch]="role()">
      <app-admin-dashboard    *ngSwitchCase="'Admin'"></app-admin-dashboard>
      <app-manager-dashboard  *ngSwitchCase="'Manager'"></app-manager-dashboard>
      <app-agent-dashboard    *ngSwitchCase="'Agent'"></app-agent-dashboard>
      <app-customer-dashboard *ngSwitchDefault></app-customer-dashboard>
    </ng-container>
  `
})
export class DashboardShellComponent {
  private auth = inject(AuthService);
  role = signal<Role>(this.auth.session?.role || 'Customer');
}
