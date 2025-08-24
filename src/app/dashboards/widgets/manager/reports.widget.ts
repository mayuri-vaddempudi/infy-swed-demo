// src/app/dashboards/widgets/reports.widget.ts
import { Component } from '@angular/core'; import { CommonModule } from '@angular/common';
@Component({
  selector:'app-reports', standalone:true, imports:[CommonModule],
  template:`<div class="card"><h4>Reports</h4><p>Generate & view reports (demo).</p></div>`,
  styles:[`.card{border:1px solid #e5e7eb;border-radius:10px;padding:12px;background:#fff}`]
}) export class ReportsWidget {}
