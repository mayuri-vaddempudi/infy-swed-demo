import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-logs',
  standalone: true, imports:[CommonModule],
  template: `
    <div class="card">
      <h4>System Logs</h4>
      <p>Recent activity appears here (demo data).</p>
      <ul>
        <li>10:31 User A updated settings</li>
        <li>10:25 Manager B created report</li>
        <li>10:10 Agent C closed ticket</li>
      </ul>
    </div>
  `,
  styles:[`.card{border:1px solid #e5e7eb;border-radius:10px;padding:12px;background:#fff}`]
})
export class SystemLogsWidget {}
