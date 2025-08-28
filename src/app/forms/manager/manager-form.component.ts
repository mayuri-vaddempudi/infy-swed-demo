import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { pastDate, gtZero } from './manager-validators';

type Row = {
  fullName: string;
  email: string;
  department: string;
  teamSize: number;
  joiningDate: string; // yyyy-mm-dd
};

@Component({
  selector: 'app-manager-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manager-form.component.html',
})
export class ManagerFormComponent {
  private fb = inject(FormBuilder);
  submitted = false;

  form = this.fb.group({
    fullName: [''], // no validation
    email: [''], // no validation
    department: [''], // no validation
    teamSize: <any>[null, [gtZero]], // must be > 0
    joiningDate: ['', [pastDate]], // must be in the past
  });

  rows = signal<Row[]>([]);

  get todayISO(): string {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  }

  submit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue() as Row;
    this.rows.update((list) => [v, ...list]);
    this.form.reset();
    this.submitted = false;
  }
}
