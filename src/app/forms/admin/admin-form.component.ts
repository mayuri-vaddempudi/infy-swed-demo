import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { emailEndsWith, strongPassword, confirmMatches } from './admin-validators';

type Row = { fullName:string; email:string; adminCode:string };

@Component({
  selector:'app-admin-form',
  standalone:true,
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl:'./admin-form.component.html',
})
export class AdminFormComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    fullName:['', Validators.required],
    email:['', [Validators.required, Validators.email, emailEndsWith('@admin.company.com')]],
    adminCode:['', [Validators.required, Validators.pattern(/^ADM-\d{4}$/)]],
    password:['', [Validators.required, strongPassword]],
    confirmPassword:['', [Validators.required, confirmMatches('password')]]
  });

  rows = signal<Row[]>([]);
  filterText = signal(''); sortKey = signal<keyof Row|''>(''); sortDir = signal<1|-1>(1);

  submit(){ if(this.form.invalid){ this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue(); this.rows.update(r=>[{fullName:v.fullName!,email:v.email!,adminCode:v.adminCode!},...r]); this.form.reset();
  }
  onFilterInput(v:string){ this.filterText.set(v??''); }
  setSort(k:keyof Row){ this.sortKey()===k ? this.sortDir.set((this.sortDir()*-1) as 1|-1) : (this.sortKey.set(k),this.sortDir.set(1)); }

  view = computed<Row[]>(()=>{ const q=this.filterText().toLowerCase().trim(); const k=this.sortKey(); const d=this.sortDir(); let out=this.rows();
    if(q) out=out.filter(r=>Object.values(r).some(v=>String(v??'').toLowerCase().includes(q)));
    if(k) out=out.slice().sort((a,b)=>String(a[k]??'').localeCompare(String(b[k]??''))*d);
    return out;
  });
}
