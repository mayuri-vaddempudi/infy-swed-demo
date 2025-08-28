import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Must be a positive number (> 0). */
export const gtZero: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  const n = Number(c.value);
  return Number.isFinite(n) && n > 0 ? null : { notPositive: true };
};

/** Date must be strictly in the past (local time). */
export const pastDate: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  const v = c.value ? new Date(c.value) : null;
  if (!v || Number.isNaN(v.getTime())) return { futureDate: true };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return v < today ? null : { futureDate: true };
};
