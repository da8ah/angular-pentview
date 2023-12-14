import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { patterns, validateUser } from '../../../../../utils/validations';
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
    MatIconModule,
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

  readonly patterns = patterns
  simbols = patterns.User.PASSSIMB
  isErrorPFP = false
  isErrorPassword = false

  roles: { id: string, name: string }[] = []
  pfpNotFound = "/assets/nopfp.png"
  URL: any = this.pfpNotFound
  pfp: any

  constructor(private snackBar: MatSnackBar, private srvUsers: UsersService, private srvRoles: RolesService) {
    this.srvRoles.roles$.subscribe((roles: role[]) => {
      this.roles = roles.map(role => ({ id: role._id, name: role.name }))
    })
  }

  // DisplayImage
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
    this.srvUsers.postUser(form.value).subscribe({
      next: (res: any) => { if (res.ok) console.log('registrado'); this.openSnackBar(res.status, res.body.message); this.srvUsers.getUsers() },
      error: (error) => { console.log(error); this.openSnackBar(error.status, error.error.message) }
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
