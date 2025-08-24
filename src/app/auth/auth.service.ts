import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export type Role = 'Admin'|'Manager'|'Agent'|'Customer';
export interface Session { token: string; email: string; role: Role; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private KEY = 'demo-session';

  login(email: string, password: string) {
    return this.http.post<Session>('/api/login', { email, password })
      .pipe(tap(s => localStorage.setItem(this.KEY, JSON.stringify(s))));
  }

  verify() { return this.http.get<{ email: string; role: Role }>('/api/verify'); }

  logout() { localStorage.removeItem(this.KEY); location.href = '/login'; }

  get session(): Session | null { const raw = localStorage.getItem(this.KEY); return raw ? JSON.parse(raw) : null; }
  get token(): string | null { return this.session?.token || null; }
  isLoggedIn() { return !!this.token; }
}