import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Exactly 10 digits */
export const phone10: ValidatorFn = (c: AbstractControl): ValidationErrors | null =>
  /^\d{10}$/.test(String(c.value ?? '')) ? null : { phoneFormat: true };

/** Group level: Address required when preferredContact === 'Phone' */
export const addressRequiredIfPhone: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const pref = group.get('preferredContact')?.value;
  const addr = group.get('address')?.value;
  return pref === 'Phone' && !addr ? { addressRequiredIfPhone: true } : null;
};
