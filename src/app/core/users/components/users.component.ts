import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { user } from '../users.types';
import { TableComponent } from './table/table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [UsersService]
})
export class UsersComponent {
  displayedColumns: string[] = ['position', 'name', 'last', 'email', 'role']
  users: user[] = []

  isNew: boolean = false
  isDelete: boolean = false

  constructor(private service: UsersService) {
    this.service.users$.subscribe((users: user[]) => {
      if (users.length > 0) {
        users.splice(0, 1) // Admin Admin
        this.users = users
      }
    })
  }

  changeNew() { this.isNew = !this.isNew }
  changeDelete() {
    if (!this.isDelete) this.displayedColumns.unshift('actions')
    else this.displayedColumns.shift()
    this.isDelete = !this.isDelete
  }
}