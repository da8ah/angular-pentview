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
import { profile as ProfileType } from '../../core/profile/profile.types';
import { ProfileService } from '../../core/profile/services/profile.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ClockService } from '../services/clock.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
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
    role: { _id: '', name: '', createdAt: '', __v: 0 },
    createdAt: '',
    __v: 0
  }

  // DIALOG
  dialogRef: MatDialogRef<{
    data: { progress: number, countdown: number, isRefresh: boolean }
  }>;
  isDialogMounted = false
  isRefreshPress = false
  dialogTimeAcc = 0
  dialogSteps = 60

  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef, private router: Router, public dialog: MatDialog, private profileService: ProfileService, private auth: AuthService, private clock: ClockService) {
    this.clock.start(() => {
      if (this.auth.isTokenExpired) this.onLogout()
      else {
        if (!this.isDialogMounted && this.auth.isTokenAboutToExpire) {
          this.isDialogMounted = true
          this.isRefreshPress = false
          this.openDialog()
        }
        if (this.isDialogMounted) { this.dialogTimeAcc++; this.updateDialog() }
      }
    })
  }

  openDialog() {
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: { progress: 100, seconds: this.dialogSteps, isRefresh: false }
    });
  }

  updateDialog() {
    const progress = 100 - 100 * this.dialogTimeAcc / this.dialogSteps;
    const countdown = this.dialogSteps - this.dialogTimeAcc;

    if (this.dialogRef.componentInstance) {
      if (this.dialogRef.componentInstance.data.isRefresh) this.isRefreshPress = true;
      this.dialogRef.componentInstance.data.progress = progress;
      this.dialogRef.componentInstance.data.countdown = countdown;
    }

    if (this.isRefreshPress) {
      this.dialogRef.close()
      this.onRefreshSession()
      this.dialogTimeAcc = 0
      this.isDialogMounted = false
    } else if (progress <= 0) {
      this.dialogRef.close()
      this.onLogout()
      this.dialogTimeAcc = 0
      this.isDialogMounted = false
    }
  }

  ngAfterViewInit(): void {
    this.profileService.profile$.pipe(delay(500)).subscribe((user: ProfileType | null) => {
      this.initBarAnimation()
      if (user) {
        this.profile.firstName = user.firstName
        this.profile.lastName = user.lastName
        this.profile.role.name = user.role.name
      }
    })
  }

  initBarAnimation() {
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
  }

  get userProfile() {
    return {
      firstName: this.profile.firstName,
      lastName: this.profile.lastName
    }
  }

  get role() {
    return this.profile.role.name.toLowerCase()
  }


  onRefreshSession() {
    this.auth.refreshSession()
  }

  onLogout() {
    this.auth.logout()
    this.router.navigateByUrl('/login')
  }
}
