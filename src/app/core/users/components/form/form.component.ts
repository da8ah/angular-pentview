import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { validateUser } from '../../../../../utils/validations';
import { SnackbarComponent } from '../../../../base/snackbar/snackbar.component';
import { role } from '../../../roles/roles.types';
import { RolesService } from '../../../roles/services/roles.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    SnackbarComponent,
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
  snackBarRef: MatSnackBarRef<{
    data: { status: number, message: string }
  }>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  simbols = "~!@#$ %^&* +\-/.,\\{ }[\\;:?<>\"'_"
  isErrorPFP = false
  isErrorPassword = false

  roles: { id: string, name: string }[] = []
  pfpNotFound = "/assets/nopfp.png"
  URL: any = this.pfpNotFound
  pfp: any

  constructor(private snackBar: MatSnackBar, private service: UsersService, private rolesService: RolesService) {
    this.rolesService.roles$.subscribe((roles: role[]) => {
      this.roles = roles.map(role => ({ id: role._id, name: role.name }))
    })
  }

  useImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.pfp = event.target.files[0] as File
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // Read file as data url
      reader.onloadend = (e) => { // function call once readAsDataUrl is completed
        this.URL = e.target!['result']; // Set image in element
        this.isErrorPFP = false
      };
    } else { this.URL = this.pfpNotFound; this.isErrorPFP = true }
  }

  onSave(form: NgForm) {
    // Validation
    this.isErrorPFP = !this.pfp || this.pfp.type !== 'image/png'
    this.isErrorPassword = !validateUser(form.value)
    if (this.isErrorPFP || this.isErrorPassword) return

    // HTTP Request
    form.value.profileImage = this.pfp
    this.service.postUser(form.value).subscribe({
      next: (res) => { if (res.ok) console.log('registrado') },
      error: (error) => { this.openSnackBar(error.status, error.statusText) }
    })
  }

  openSnackBar(status: number, message: string) {
    this.snackBarRef = this.snackBar.openFromComponent(SnackbarComponent, {
      data: { status, message },
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000
    })
  }
}
