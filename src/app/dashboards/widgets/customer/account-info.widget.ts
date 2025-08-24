// src/app/dashboards/widgets/account-info.widget.ts
import { Component } from '@angular/core'; import { CommonModule } from '@angular/common';
@Component({
  selector:'app-account-info', standalone:true, imports:[CommonModule],
  template:`<div class="card"><h4>Account Info</h4><p>Profile & plan details (demo).</p></div>`,
  styles:[`.card{border:1px solid #e5e7eb;border-radius:10px;padding:12px;background:#fff}`]
}) export class AccountInfoWidget {}
