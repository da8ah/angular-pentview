import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  providers: [AuthService]
})
export class DialogComponent {

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { progress: number, countdown: number, isRefresh: boolean },
    private router: Router, private srvAuth: AuthService) {
    this.srvAuth.isAuth$.subscribe(auth => {
      if (auth) this.router.navigateByUrl('/dashboard')
    })
  }

  onRefreshSession() {
    this.data.isRefresh = true
  }

  onLogout() {
    this.srvAuth.logout()
    this.router.navigateByUrl('/login')
  }
}
