// src/app/dashboards/agent-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallHistoryWidget } from '../widgets/agent/call-history.widget';
import { IVRFlowsWidget } from '../widgets/agent/ivr-flows.widget';

@Component({
  selector:'app-agent-dashboard',
  standalone:true,
  imports:[CommonModule, CallHistoryWidget, IVRFlowsWidget],
  template:`<h2>Agent Dashboard</h2>
  <section class="grid">
    <app-call-history></app-call-history>
    <app-ivr-flows></app-ivr-flows>
  </section>`,
  styles:[`.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}`]
})
export class AgentDashboardComponent {}
