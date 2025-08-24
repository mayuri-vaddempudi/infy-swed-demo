// src/app/forms/validators.ts  (shared helpers used by Manager/Agent/Customer)
import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { of, timer, map, switchMap } from 'rxjs';

export const pastDate: ValidatorFn = c => new Date(c.value) < new Date() ? null : { futureDate: true };
export const gtZero: ValidatorFn = c => (+c.value > 0 ? null : { notPositive: true });
export const inList = (list:string[]):ValidatorFn => c => list.includes(String(c.value||'')) ? null : { notInList: true };
export const supervisorExists = (): AsyncValidatorFn => c =>
  timer(300).pipe(switchMap(()=>of(/^SUP-\d{4}$/.test(String(c.value||'')))), map(ok=> ok ? null : { noSuchSupervisor:true }));
export const requiredIf = (pred:()=>boolean):ValidatorFn => c => pred()? (c.value?null:{requiredIf:true}) : null;
