// src/app/dashboards/manager-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsWidget } from '../widgets/manager/reports.widget';
import { TeamPerformanceWidget } from '../widgets/manager/team-performance.widget';

@Component({
  selector:'app-manager-dashboard',
  standalone:true,
  imports:[CommonModule, TeamPerformanceWidget, ReportsWidget],
  template:`<h2>Manager Dashboard</h2>
  <section class="grid">
    <app-team-performance></app-team-performance>
    <app-reports></app-reports>
  </section>`,
  styles:[`.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}`]
})
export class ManagerDashboardComponent {}
