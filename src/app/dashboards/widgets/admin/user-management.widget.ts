import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  standalone: true, imports:[CommonModule],
  template: `
    <div class="card">
      <h4>User Management</h4>
      <ul>
        <li>Create / deactivate users (demo)</li>
        <li>Assign roles</li>
        <li>Reset passwords</li>
      </ul>
    </div>
  `,
  styles:[`.card{border:1px solid #e5e7eb;border-radius:10px;padding:12px;background:#fff}`]
})
export class UserManagementWidget {}
