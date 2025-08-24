import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  standalone: true, imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  email: string | null = null;
  rows: any[] = [];
  filtered: any[] = [];
  q = '';
  loading = false;
  error = '';

  ngOnInit() {
    this.auth.verify().subscribe({
      next: (u) => { this.email = u.email; this.loadCountries(); },
      error: () => this.auth.logout()
    });
  }

  loadCountries() {
    this.loading = true; this.error = '';
    this.http.get<any[]>('https://restcountries.com/v3.1/all?fields=name,cca2,capital,region,population,flags').subscribe({
      next: (data) => {
        this.rows = data.sort((a,b)=>a.name.common.localeCompare(b.name.common));
        this.filtered = this.rows; this.loading = false;
      },
      error: () => { this.error = 'Failed to load countries.'; this.loading = false; }
    });
  }

  filter() {
    const t = this.q.trim().toLowerCase();
    this.filtered = !t ? this.rows : this.rows.filter(r =>
      r.name.common.toLowerCase().includes(t) ||
      r.cca2.toLowerCase().includes(t) ||
      (r.capital?.[0] || '').toLowerCase().includes(t) ||
      (r.region || '').toLowerCase().includes(t)
    );
  }

  logout() { this.auth.logout(); }
}
