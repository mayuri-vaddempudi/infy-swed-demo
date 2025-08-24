// src/app/dashboards/widgets/tickets.widget.ts
import { Component } from '@angular/core'; import { CommonModule } from '@angular/common';
@Component({
  selector:'app-tickets', standalone:true, imports:[CommonModule],
  template:`<div class="card"><h4>Tickets Raised</h4><p>Recent tickets (demo).</p></div>`,
  styles:[`.card{border:1px solid #e5e7eb;border-radius:10px;padding:12px;background:#fff}`]
}) export class TicketsWidget {}
