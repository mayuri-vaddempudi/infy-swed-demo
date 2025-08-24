import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true, imports:[CommonModule],
  template: `
    <div class="card">
      <h4>Analytics</h4>
      <p>KPIs (demo):</p>
      <ul>
        <li>Active Users: 1,245</li>
        <li>Tickets Today: 182</li>
        <li>Avg. Handle Time: 4m 12s</li>
      </ul>
    </div>
  `,
  styles:[`.card{border:1px solid #e5e7eb;border-radius:10px;padding:12px;background:#fff}`]
})
export class AnalyticsWidget {}
