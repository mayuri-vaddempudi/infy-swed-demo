import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsWidget } from './widgets/analytics.widget';
import { SystemLogsWidget } from './widgets/system-logs.widget';
import { UserManagementWidget } from './widgets/user-management.widget';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, UserManagementWidget, SystemLogsWidget, AnalyticsWidget],
  template: `
    <h2>Admin Dashboard</h2>
    <section class="grid">
      <app-user-management/>
      <app-system-logs/>
      <app-analytics/>
    </section>
  `,
  styles: [`
    .grid{
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
      gap:12px
    }
  `]
})
export class AdminDashboardComponent {}
