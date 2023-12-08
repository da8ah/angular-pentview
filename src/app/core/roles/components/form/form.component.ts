import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { patterns, validateRole } from '../../../../../utils/validations';
import { role } from '../../roles.types';

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
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Output() createRol = new EventEmitter<{ name: string }>()
  roles: role[] = []
  readonly patterns = patterns

  onCreateRol(form: NgForm) {
    if (validateRole(form.value.name)) this.createRol.emit(form.value)
  }
}