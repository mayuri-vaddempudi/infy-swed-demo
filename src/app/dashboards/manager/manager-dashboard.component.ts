import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-manager-dashboard',
  imports: [CommonModule],
  templateUrl: './manager-dashboard.component.html',
})
export class ManagerDashboardComponent {
  private auth = inject(AuthService);
  session = this.auth.session;
}
