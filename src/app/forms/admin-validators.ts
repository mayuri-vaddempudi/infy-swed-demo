import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailEndsWith = (domain: string): ValidatorFn =>
  (c: AbstractControl): ValidationErrors | null =>
    (typeof c.value === 'string' && c.value.endsWith(domain)) ? null : { emailDomain: true };

export const strongPassword: ValidatorFn = (c: AbstractControl) => {
  const v = String(c.value || '');
  const ok = v.length >= 12 && /[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v) && /[^A-Za-z0-9]/.test(v);
  return ok ? null : { weakPassword: true };
};

export const confirmMatches = (field: string): ValidatorFn =>
  (c: AbstractControl): ValidationErrors | null => {
    const parent = c.parent as any;
    if (!parent) return null;
    return c.value === parent.get(field)?.value ? null : { mismatch: true };
  };
