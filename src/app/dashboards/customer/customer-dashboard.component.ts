import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-customer-dashboard',
  imports: [CommonModule],
  templateUrl: './customer-dashboard.component.html',
})
export class CustomerDashboardComponent {
  private auth = inject(AuthService);
  session = this.auth.session;
}
