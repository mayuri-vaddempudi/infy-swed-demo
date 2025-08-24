// src/app/dashboards/widgets/team-performance.widget.ts
import { Component } from '@angular/core'; import { CommonModule } from '@angular/common';
@Component({
  selector:'app-team-performance', standalone:true, imports:[CommonModule],
  template:`<div class="card"><h4>Team Performance</h4><p>KPIs for teams (demo).</p></div>`,
  styles:[`.card{border:1px solid #e5e7eb;border-radius:10px;padding:12px;background:#fff}`]
}) export class TeamPerformanceWidget {}
