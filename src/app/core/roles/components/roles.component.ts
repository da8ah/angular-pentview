import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../../base/snackbar/snackbar.component';
import { role } from '../roles.types';
import { RolesService } from '../services/roles.service';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { NgForm } from '@angular/forms';

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
  // SnackBar
  snackBarRef: MatSnackBarRef<{
    data: { status: number, message: string }
  }>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = ['position', 'name']
  roles: role[] = []

  constructor(private snackBar: MatSnackBar, private srvRoles: RolesService) {
    this.srvRoles.roles$.subscribe((roles: role[]) => {
      if (roles.length > 0) this.roles = roles
    })
  }

  createRol(form: NgForm) {
    this.srvRoles.postRole(form.value).subscribe({
      next: (res: any) => { if (res.ok) { this.openSnackBar(res.status, res.body.message); form.resetForm(); this.srvRoles.getRoles() } },
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
