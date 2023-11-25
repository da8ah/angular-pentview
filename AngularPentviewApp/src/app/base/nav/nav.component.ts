import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { CoreModule } from '../../core/core.module';
import { profile as ProfileType } from '../../core/profile/profile.types';
import { ProfileService } from '../../core/profile/services/profile.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ClockService } from '../services/clock.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    CoreModule,
    DialogComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatIconModule,
    NgOptimizedImage
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  providers: [ProfileService, AuthService, ClockService, MatDialogModule]
})
export class NavComponent implements AfterViewInit {
  title = 'Pentview Control de Horas';
  private profile: ProfileType = {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    role: {
      _id: '',
      name: '',
      createdAt: '',
      __v: 0
    },
    createdAt: '',
    __v: 0
  }

  dialogRef: MatDialogRef<{
    data:
    {
      progress: number,
      seconds: number
    }
  }>;
  timeToOpenDialog = 60 * 59;
  dialogSteps = 60
  dialogTimeAcc = 0

  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef, private router: Router, public dialog: MatDialog, private profileService: ProfileService, private auth: AuthService, private clock: ClockService) {
    this.clock.start(() => {
      this.dialogTimeAcc++;
      if (this.dialogTimeAcc === this.timeToOpenDialog) this.openDialog();
      if (this.dialogTimeAcc > this.timeToOpenDialog) this.updateDialog();
    })
  }

  openDialog() {
    this.dialogRef = this.dialog.open(DialogComponent, {
      data:
      {
        progress: 100,
        seconds: this.dialogSteps
      },
    });
  }

  updateDialog() {
    const timer = this.dialogTimeAcc - this.timeToOpenDialog;
    const progress = 100 - 100 * timer / this.dialogSteps;
    const seconds = this.dialogSteps - timer;

    if (this.dialogRef.componentInstance) {
      this.dialogRef.componentInstance.data.progress = progress;
      this.dialogRef.componentInstance.data.seconds = seconds;
    }

    if (progress <= 0) {
      this.dialogRef.close()
      this.onLogout()
      this.dialogTimeAcc = 0
    }
  }

  ngAfterViewInit(): void {
    this.sideNav.opened = true
    this.observer.observe(['(max-width:800px)'])
      .subscribe((res) => {
        if (res?.matches) {
          this.sideNav.mode = "over"
          this.sideNav.close()
        } else {
          this.sideNav.mode = "side"
          this.sideNav.open()
        }
        this.cdr.detectChanges()
      })

    this.profileService.profile$.subscribe((user: ProfileType | null) => {
      if (user) {
        this.profile.firstName = user.firstName
        this.profile.lastName = user.lastName
        this.profile.role.name = user.role.name
      }
    })
  }

  get userProfile() {
    return this.profile
  }

  get role() {
    return this.profile.role.name.toLowerCase()
  }

  onLogout() {
    this.auth.logout()
    this.router.navigateByUrl('/login')
  }
}
