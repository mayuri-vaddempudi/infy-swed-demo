// src/app/dashboards/customer-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountInfoWidget } from '../widgets/customer/account-info.widget';
import { TicketsWidget } from '../widgets/customer/tickets.widget';

@Component({
  selector:'app-customer-dashboard',
  standalone:true,
  imports:[CommonModule, AccountInfoWidget, TicketsWidget],
  template:`<h2>Customer Dashboard</h2>
  <section class="grid">
    <app-account-info></app-account-info>
    <app-tickets></app-tickets>
  </section>`,
  styles:[`.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}`]
})
export class CustomerDashboardComponent {}
