import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { role } from '../../roles.types';
import { RolesService } from '../../services/roles.service';
import { validateRole } from '../../../../../utils/validations';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [RolesService]
})
export class FormComponent {
  roles: role[] = []

  constructor(private service: RolesService) {
    this.service.roles$.subscribe((roles: role[]) => {
      this.roles = roles
    })
  }

  onNew(form: NgForm) {
    if (validateRole(form.value.name))
      if (this.service.postRole(form.value))
        this.roles.push(form.value.name)
  }
}