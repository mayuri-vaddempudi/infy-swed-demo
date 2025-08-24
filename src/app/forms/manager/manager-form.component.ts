// src/app/forms/manager-form.component.ts
import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { gtZero, pastDate } from '../validators';

@Component({
  selector:'app-manager-form',
  standalone:true, imports:[CommonModule, ReactiveFormsModule],
  templateUrl:'./manager-form.component.html', styleUrls:['./manager-form.component.css']
})
export class ManagerFormComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    fullName:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    department:['',Validators.required],
    teamSize:[null,[Validators.required, gtZero]],
    joiningDate:['',[Validators.required, pastDate]]
  });

  rows = signal<any[]>([]); filterText = signal(''); sortKey = signal<string>(''); sortDir = signal<1|-1>(1);

  submit(){ if(this.form.invalid){ this.form.markAllAsTouched(); return; } this.rows.update(r=>[{...this.form.value},...r]); this.form.reset(); }
  setSort(k:string){ this.sortKey()===k ? this.sortDir.set((this.sortDir()*-1) as 1|-1) : (this.sortKey.set(k),this.sortDir.set(1)); }
  onFilterInput(v:string){ this.filterText.set(v); }

  view = computed(()=>{ const q=this.filterText().toLowerCase().trim(); const k=this.sortKey(); const d=this.sortDir();
    let out=this.rows(); if(q) out=out.filter(r=>Object.values(r).some(v=>String(v??'').toLowerCase().includes(q)));
    if(k) out=out.slice().sort((a,b)=>String(a[k]??'').localeCompare(String(b[k]??''))*d); return out; });
}
