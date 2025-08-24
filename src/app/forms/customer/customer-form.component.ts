// src/app/forms/customer-form.component.ts
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector:'app-customer-form',
  standalone:true,
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl:'./customer-form.component.html'
})
export class CustomerFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    fullName:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    phone:['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
    preferredContact:['',Validators.required],
    address:['']
  });

  ngOnInit() {
  this.form.get('preferredContact')!.valueChanges.subscribe((v: string | null) => {
    const addr = this.form.get('address')!;
    if (v === 'Phone') {
      addr.setValidators([Validators.required]);
    } else {
      addr.clearValidators();
    }
    addr.updateValueAndValidity();
  });
}

  rows = signal<any[]>([]); filterText = signal(''); sortKey = signal<string>(''); sortDir = signal<1|-1>(1);
  submit(){ if(this.form.invalid){ this.form.markAllAsTouched(); return; } this.rows.update(r=>[{...this.form.value},...r]); this.form.reset(); }
  setSort(k:string){ this.sortKey()===k ? this.sortDir.set((this.sortDir()*-1) as 1|-1) : (this.sortKey.set(k),this.sortDir.set(1)); }
  onFilterInput(v:string){ this.filterText.set(v); }
  view = computed(()=>{ const q=this.filterText().toLowerCase().trim(); const k=this.sortKey(); const d=this.sortDir();
    let out=this.rows(); if(q) out=out.filter(r=>Object.values(r).some(v=>String(v??'').toLowerCase().includes(q)));
    if(k) out=out.slice().sort((a,b)=>String(a[k]??'').localeCompare(String(b[k]??''))*d); return out; });
}
