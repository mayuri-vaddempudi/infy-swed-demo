import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // uses your nice card CSS
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  loading = false;
  error = '';

  async onSubmit(evt: Event) {
    evt.preventDefault();            // prevent full-page submit
    this.error = '';
    if (!this.email || !this.password) return;

    this.loading = true;
    try {
      // AuthService should POST /api/login and store the session {token,email,role}
      await this.auth.login(this.email, this.password).toPromise();
      await this.router.navigate(['/dashboard']);
    } catch (e: any) {
      this.error = e?.error?.message || 'Login failed. Check your credentials.';
    } finally {
      this.loading = false;
    }
  }
}
