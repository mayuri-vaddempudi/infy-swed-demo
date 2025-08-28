import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private router = inject(Router);
  auth = inject(AuthService);

  // Track if we’re on the login page to hide the header.
  private url = signal(this.router.url);
  isLoginPage = computed(() => this.url().startsWith('/login'));

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => this.url.set(e.urlAfterRedirects || e.url));
  }

  logout() {
    this.auth.logout();
  }
}
