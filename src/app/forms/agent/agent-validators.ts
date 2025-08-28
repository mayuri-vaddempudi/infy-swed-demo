import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Region must be one of the provided list. */
export function inRegion(allowed: string[]): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    const v = (c.value ?? '').toString().trim();
    return allowed.includes(v) ? null : { notInRegion: true };
  };
}

/** Simple supervisor ID format: SUP-1234 */
export function supervisorIdFormat(): ValidatorFn {
  const pattern = /^SUP-\d{4}$/;
  return (c: AbstractControl): ValidationErrors | null => {
    const v = (c.value ?? '').toString().trim();
    return pattern.test(v) ? null : { badSupervisorId: true };
  };
}
