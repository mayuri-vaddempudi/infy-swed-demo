import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { phoneTenDigits, addressRequiredIfPhone } from './customer-validators';

type Row = {
  fullName?: string;
  email?: string;
  phone: string;
  preferredContact: string;
  address?: string;
};

@Component({
  selector: 'app-customer-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
})
export class CustomerFormComponent {
  private fb = inject(FormBuilder);
  submitted = false;

  form = this.fb.group({
    fullName: [''], // optional
    email: ['', Validators.email],
    phone: ['', [phoneTenDigits]],
    preferredContact: [''],
    address: ['', [addressRequiredIfPhone]],
  });

  rows = signal<Row[]>([]);

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
