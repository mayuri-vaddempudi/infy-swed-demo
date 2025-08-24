// src/app/dashboards/widgets/ivr-flows.widget.ts
import { Component } from '@angular/core'; import { CommonModule } from '@angular/common';
@Component({
  selector:'app-ivr-flows', standalone:true, imports:[CommonModule],
  template:`<div class="card"><h4>IVR Flows</h4><p>Access IVR flows (demo).</p></div>`,
  styles:[`.card{border:1px solid #e5e7eb;border-radius:10px;padding:12px;background:#fff}`]
}) export class IVRFlowsWidget {}
