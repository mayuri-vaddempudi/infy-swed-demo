import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-agent-dashboard',
  imports: [CommonModule],
  templateUrl: './agent-dashboard.component.html',
})
export class AgentDashboardComponent {
  private auth = inject(AuthService);
  session = this.auth.session;
}
