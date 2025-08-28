import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Phone must be exactly 10 digits */
export const phoneTenDigits: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  const v = (c.value ?? '').toString().trim();
  return /^\d{10}$/.test(v) ? null : { phoneFormat: true };
};

/** Address required if preferredContact = "Phone" */
export const addressRequiredIfPhone: ValidatorFn = (
  c: AbstractControl,
): ValidationErrors | null => {
  if (!c.parent) return null;
  const contact = c.parent.get('preferredContact')?.value;
  const addr = c.value?.toString().trim();
  if (contact === 'Phone' && !addr) {
    return { required: true };
  }
  return null;
};
