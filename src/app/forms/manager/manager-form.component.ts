import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { pastDate, gtZero } from './manager-validators';

type Row = { fullName:string; email:string; department:string; teamSize:number; joiningDate:string };

@Component({
  selector:'app-manager-form',
  standalone:true,
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl:'./manager-form.component.html',
})
export class ManagerFormComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    fullName:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    department:['', Validators.required],
    teamSize:<any>[null, [Validators.required, gtZero]],
    joiningDate:['', [Validators.required, pastDate]]
  });

  rows = signal<Row[]>([]); filterText = signal(''); sortKey = signal<keyof Row|''>(''); sortDir = signal<1|-1>(1);

  get todayISO(){ const d=new Date(); const mm=String(d.getMonth()+1).padStart(2,'0'); const dd=String(d.getDate()).padStart(2,'0'); return `${d.getFullYear()}-${mm}-${dd}`; }

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
