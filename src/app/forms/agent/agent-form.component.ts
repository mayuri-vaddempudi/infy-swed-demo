import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { inRegion, supervisorIdFormat } from './agent-validators';

type Row = {
  fullName?: string;
  email?: string;
  region: string;
  shiftTiming?: string;
  supervisorId: string;
};

@Component({
  selector: 'app-agent-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agent-form.component.html',
})
export class AgentFormComponent {
  private fb = inject(FormBuilder);

  /** Predefined region list */
  regions = ['North', 'South', 'East', 'West'];

  submitted = false;

  form = this.fb.group({
    fullName: [''], // optional
    email: [''], // optional
    region: ['', [inRegion(this.regions)]],
    shiftTiming: [''], // optional
    supervisorId: ['', [supervisorIdFormat()]],
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
