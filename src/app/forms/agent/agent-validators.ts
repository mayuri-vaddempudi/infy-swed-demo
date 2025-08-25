import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { timer, map } from 'rxjs';

export const inRegion = (regions: string[]): ValidatorFn =>
  (c: AbstractControl): ValidationErrors | null =>
    regions.includes(String(c.value ?? '')) ? null : { notInRegion: true };

export const supervisorExists = (): AsyncValidatorFn =>
  (c: AbstractControl) =>
    timer(300).pipe(
      map(() => (/^SUP-\d{4}$/.test(String(c.value ?? '')) ? null : { noSuchSupervisor: true }))
    );
