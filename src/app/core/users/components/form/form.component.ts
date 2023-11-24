import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsersService } from '../../services/users.service';
import { NgForm, FormsModule } from '@angular/forms';
import { validateUser } from '../../../../../utils/validations';
import { RolesService } from '../../../roles/services/roles.service';
import { role } from '../../../roles/roles.types';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [UsersService, RolesService]
})
export class FormComponent {
  rolesName: string[] = []
  defaultPFP = "/assets/nopfp.png"
  URL: any = this.defaultPFP

  constructor(private service: UsersService, private rolesService: RolesService) {
    this.rolesService.roles$.subscribe((roles: role[]) => {
      console.log(roles)
      this.rolesName = roles.map(role => role.name)
    })
  }

  useImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();


      reader.readAsDataURL(event.target.files[0]); // Read file as data url
      reader.onloadend = (e) => { // function call once readAsDataUrl is completed
        this.URL = e.target!['result']; // Set image in element
        // this._changeDetection.markForCheck(); // Is called because ChangeDetection is set to onPush
      };
    } else this.URL = this.defaultPFP;
  }

  onNew(form: NgForm) {
    console.log('New: ', form.value)
    // if (validateUser(form.value)) this.service.postUser(form.value)
  }
}

function generarContrasena(regex: RegExp): string {
  while (true) {
    const contrasena = Array.from(
      { length: 16 },
      () =>
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*+-/.,\\{};:?<>"\'_'[
        Math.floor(Math.random() * 72)
        ]
    ).join('');
    if (regex.test(contrasena)) {
      return contrasena;
    }
  }
}