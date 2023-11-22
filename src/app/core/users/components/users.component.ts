import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { users } from '../users.types';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [UsersService]
})
export class UsersComponent {
  displayedColumns: string[] = ['position', 'name', 'last', 'email', 'role']
  users: users = []

  constructor(private service: UsersService) {
    this.service.users$.subscribe((users: users) => {
      if (users.length > 0) {
        users.splice(0, 1)
        this.users = users
      }
    })
  }

}