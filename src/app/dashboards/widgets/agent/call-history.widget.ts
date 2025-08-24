// src/app/dashboards/widgets/call-history.widget.ts
import { Component } from '@angular/core'; import { CommonModule } from '@angular/common';
@Component({
  selector:'app-call-history', standalone:true, imports:[CommonModule],
  template:`<div class="card"><h4>Call History</h4><p>Recent calls (demo).</p></div>`,
  styles:[`.card{border:1px solid #e5e7eb;border-radius:10px;padding:12px;background:#fff}`]
}) export class CallHistoryWidget {}
