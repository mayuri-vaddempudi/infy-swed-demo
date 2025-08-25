import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { phone10, addressRequiredIfPhone } from './customer-validators';

type Row = { fullName:string; email:string; phone:string; preferredContact:string; address:string };

@Component({
  selector:'app-customer-form',
  standalone:true,
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl:'./customer-form.component.html',
})
export class CustomerFormComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    fullName:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    phone:['', [Validators.required, phone10]],
    preferredContact:['', Validators.required],
    address:['']
  }, { validators: [addressRequiredIfPhone] });

  rows = signal<Row[]>([]); filterText = signal(''); sortKey = signal<keyof Row|''>(''); sortDir = signal<1|-1>(1);

  submit(){ if(this.form.invalid){ this.form.markAllAsTouched(); return; }
    const v=this.form.getRawValue() as Row; this.rows.update(r=>[v,...r]); this.form.reset();
  }
  onFilterInput(v:string){ this.filterText.set(v??''); }
  setSort(k:keyof Row){ this.sortKey()===k ? this.sortDir.set((this.sortDir()*-1) as 1|-1) : (this.sortKey.set(k),this.sortDir.set(1)); }

  view = computed<Row[]>(()=>{ const q=this.filterText().toLowerCase().trim(); const k=this.sortKey(); const d=this.sortDir(); let out=this.rows();
    if(q) out=out.filter(r=>Object.values(r).some(v=>String(v??'').toLowerCase().includes(q)));
    if(k) out=out.slice().sort((a,b)=>String(a[k]??'').localeCompare(String(b[k]??''))*d); return out;
  });
}
