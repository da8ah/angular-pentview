import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { role } from '../roles.types';
import { RolesService } from '../services/roles.service';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    TableComponent
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
  providers: [RolesService]
})
export class RolesComponent {
  displayedColumns: string[] = ['position', 'name']
  roles: role[] = []

  constructor(private service: RolesService) {
    this.service.roles$.subscribe((roles: role[]) => {
      if (roles.length > 0) {
        this.roles = roles
      }
    })
  }
}
