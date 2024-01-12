import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { validateProfileUpdate } from '../../../shared/utils/validations';
import { SnackbarComponent } from '../../../base/snackbar/snackbar.component';
import { profile as ProfileType, putProfile } from '../profile.types';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [ProfileService]
})
export class ProfileComponent {
  // SnackBar
  snackBarRef: MatSnackBarRef<{
    data: { status: number, message: string }
  }>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  protected profile: ProfileType = {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    profileImage: '',
    role: {
      _id: '',
      name: '',
      createdAt: '',
      __v: 0
    },
    createdAt: '',
    __v: 0
  }

  constructor(private snackBar: MatSnackBar, private srvProfile: ProfileService) {
    this.srvProfile.profile$.subscribe((profile: ProfileType | null) => {
      if (profile) this.profile = profile
    })
  }

  protected get pfp() {
    return this.profile.profileImage
  }

  onUpdate(form: NgForm) {
    if (validateProfileUpdate(form.value as putProfile)) this.srvProfile.putProfile(form.value).subscribe({
      next: (res: any) => { if (res.ok) { this.openSnackBar(res.status, "Perfil actualizado"); window.location.reload() } },
      error: (error) => { this.openSnackBar(error.status, error.error.message) }
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
