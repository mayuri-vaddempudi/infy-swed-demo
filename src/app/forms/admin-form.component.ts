import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { emailEndsWith, strongPassword, confirmMatches } from './admin-validators';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent {
  private fb = inject(FormBuilder);

  // form model (Admin-only spec)
  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, emailEndsWith('@admin.company.com')]],
    adminCode: ['', [Validators.required, Validators.pattern(/^ADM-\d{4}$/)]],
    password: ['', [Validators.required, strongPassword]],
    confirmPassword: ['', [Validators.required, confirmMatches('password')]]
  });

  // grid state
  rows = signal<any[]>([]);
  filterText = signal('');
  sortKey = signal<string>(''); sortDir = signal<1|-1>(1);

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.rows.update(list => [{ ...this.form.value }, ...list]);
    this.form.reset();
  }

  setSort(key: string) {
    if (this.sortKey() === key) this.sortDir.set((this.sortDir() * -1) as 1 | -1);
    else { this.sortKey.set(key); this.sortDir.set(1); }
  }

  view = computed(() => {
    const q = this.filterText().toLowerCase().trim();
    const k = this.sortKey(); const d = this.sortDir();
    let out = this.rows();
    if (q) out = out.filter(r => Object.values(r).some(v => String(v ?? '').toLowerCase().includes(q)));
    if (k) out = out.slice().sort((a,b)=> String(a[k]??'').localeCompare(String(b[k]??''))*d);
    return out;
  });
}
