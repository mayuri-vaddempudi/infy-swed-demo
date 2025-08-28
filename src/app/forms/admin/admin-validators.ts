import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Email must end with a specific domain. Also requires non-empty value. */
export function emailEndsWith(suffix: string): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    const v = (c.value ?? '').toString().trim();
    if (!v) return { emailSuffix: true }; // treat empty as invalid for admin email
    const ok = v.toLowerCase().endsWith(suffix.toLowerCase());
    return ok ? null : { emailSuffix: true };
  };
}

/** Admin code like ADM-1234 (4 digits). */
export const adminCodePattern = /^ADM-\d{4}$/;
export function adminCodeValidator(): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    const v = (c.value ?? '').toString().trim();
    return adminCodePattern.test(v) ? null : { adminCode: true };
  };
}

/** Strong password: min 12 chars, has upper, lower, digit, special. */
export const strongPassword: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  const v = (c.value ?? '').toString();
  const longEnough = v.length >= 12;
  const hasUpper = /[A-Z]/.test(v);
  const hasLower = /[a-z]/.test(v);
  const hasDigit = /\d/.test(v);
  const hasSpecial = /[^A-Za-z0-9]/.test(v);
  return longEnough && hasUpper && hasLower && hasDigit && hasSpecial ? null : { weak: true };
};

/** Confirm matches another control by name (e.g., 'password'). */
export function confirmMatches(matchName: string): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    const parent = c.parent as any;
    if (!parent) return null;
    const target = parent.get(matchName);
    if (!target) return null;
    return c.value === target.value ? null : { mismatch: true };
  };
}
