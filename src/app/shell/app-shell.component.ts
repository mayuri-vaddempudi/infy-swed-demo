import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <header class="top">
      <a routerLink="/dashboard" class="brand">AuthCraft</a>
      <nav class="nav">
        <a routerLink="/dashboard">Dashboard</a>
        <a routerLink="/form">Dynamic Form</a>
        <span class="email">{{ auth.session?.email }}</span>
        <button (click)="auth.logout()">Logout</button>
      </nav>
    </header>
    <main class="page"><router-outlet/></main>
  `,
  styles:[`
    .top{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:#111827;color:#fff}
    .brand{color:#fff;text-decoration:none;font-weight:700}
    .nav{display:flex;gap:12px;align-items:center}
    .nav a{color:#fff;text-decoration:none;opacity:.9}
    .nav button{padding:6px 10px;border:1px solid rgba(255,255,255,.2);background:transparent;color:#fff;border-radius:8px;cursor:pointer}
    .page{padding:16px}
    .email{opacity:.85}
  `]
})
export class AppShellComponent { auth = inject(AuthService); }
