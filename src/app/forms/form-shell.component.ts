import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, Role } from '../auth/auth.service';
import { AdminFormComponent }    from './admin/admin-form.component';
import { ManagerFormComponent }  from './manager/manager-form.component';
import { AgentFormComponent }    from './agent/agent-form.component';
import { CustomerFormComponent } from './customer/customer-form.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    AdminFormComponent,
    ManagerFormComponent,
    AgentFormComponent,
    CustomerFormComponent
  ],
  template: `
    <ng-container [ngSwitch]="role()">
      <app-admin-form    *ngSwitchCase="'Admin'"></app-admin-form>
      <app-manager-form  *ngSwitchCase="'Manager'"></app-manager-form>
      <app-agent-form    *ngSwitchCase="'Agent'"></app-agent-form>
      <app-customer-form *ngSwitchDefault></app-customer-form>
    </ng-container>
  `
})
export class FormShellComponent {
  role = signal<Role>(inject(AuthService).session?.role || 'Customer');
}
