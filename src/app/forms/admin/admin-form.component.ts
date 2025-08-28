import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  emailEndsWith,
  adminCodeValidator,
  strongPassword,
  confirmMatches,
} from './admin-validators';

type Row = { fullName?: string; email: string; adminCode: string };

@Component({
  selector: 'app-admin-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-form.component.html',
})
export class AdminFormComponent {
  private fb = inject(FormBuilder);
  submitted = false;

  form = this.fb.group({
    fullName: [''],
    email: ['', [Validators.required, Validators.email, emailEndsWith('@admin.company.com')]],
    adminCode: ['', [Validators.required, adminCodeValidator()]],
    password: ['', [Validators.required, strongPassword]],
    confirmPassword: ['', [Validators.required, confirmMatches('password')]],
  });

  // Raw rows
  rows = signal<Row[]>([]);

  // Filter + sort state
  filterText = signal('');
  sortKey = signal<keyof Row | ''>(''); // '', 'fullName', 'email', 'adminCode'
  sortDir = signal<1 | -1>(1); // 1 = asc, -1 = desc

  // Filter then sort
  view = computed<Row[]>(() => {
    const q = this.filterText().toLowerCase().trim();
    const key = this.sortKey();
    const dir = this.sortDir();

    let out = this.rows();
    if (q) {
      out = out.filter((r) =>
        [r.fullName ?? '', r.email, r.adminCode].some((v) => String(v).toLowerCase().includes(q)),
      );
    }
    if (key) {
      out = out
        .slice()
        .sort((a, b) => String(a[key] ?? '').localeCompare(String(b[key] ?? '')) * dir);
    }
    return out;
  });

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.rows.update((r) => [
      { fullName: v.fullName ?? '', email: v.email!, adminCode: v.adminCode! },
      ...r,
    ]);
    this.form.reset();
    this.submitted = false;
  }

  onFilterInput(value: string) {
    this.filterText.set(value ?? '');
  }

  clearFilter() {
    this.filterText.set('');
  }

  setSort(k: keyof Row) {
    if (this.sortKey() === k) {
      this.sortDir.set((this.sortDir() * -1) as 1 | -1);
    } else {
      this.sortKey.set(k);
      this.sortDir.set(1);
    }
  }

  isSortedBy(k: keyof Row): boolean {
    return this.sortKey() === k;
  }

  dirArrow(): string {
    return this.sortDir() === 1 ? '▲' : '▼';
  }
}
