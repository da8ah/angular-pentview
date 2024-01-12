import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { delay } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { profile as ProfileType } from '../../core/profile/profile.types';
import { ProfileService } from '../../core/profile/services/profile.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ClockService } from '../services/clock.service';

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

  // CLOCK & DIALOG
  dialogRef: MatDialogRef<{
    data: { progress: number, countdown: number, isRefresh: boolean }
  }>;
  isDialogMounted = false
  isRefreshPress = false
  dialogTimeAcc = 0
  dialogSteps = 60

  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  constructor(
    public dialog: MatDialog, private router: Router,
    // Nav Animation
    private obsBreakpoint: BreakpointObserver, private cdr: ChangeDetectorRef,
    // Services
    private srvProfile: ProfileService, private srvAuth: AuthService, private srvClock: ClockService
  ) {
    console.log(`exp: ${new Date(this.srvAuth.tokenExpiry).toString()}`)
    this.srvClock.start(() => { // Starts Global Clock
      if (this.srvAuth.isTokenExpired) this.onLogout() // Checks if session expired
      else {
        if (!this.isDialogMounted && this.srvAuth.isTokenAboutToExpire) { // If session it's about to expire mounts Dialog
          this.isDialogMounted = true // Dialog mounted flag
          this.isRefreshPress = false // RefreshSession flag
          this.openDialog()
        }
        if (this.isDialogMounted) { this.dialogTimeAcc++; this.updateDialog() } // If Dialog it's already mounted
      }
    })
  }

  openDialog() { // Open/Mounts Dialog
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: { progress: 100, seconds: this.dialogSteps, isRefresh: false }
    });
  }

  updateDialog() { // Rerenders Dialog every second
    const progress = 100 - 100 * this.dialogTimeAcc / this.dialogSteps;
    const countdown = this.dialogSteps - this.dialogTimeAcc;

    if (this.dialogRef.componentInstance) { // If Dialog is Open/Mount
      if (this.dialogRef.componentInstance.data.isRefresh) this.isRefreshPress = true;
      this.dialogRef.componentInstance.data.progress = progress;
      this.dialogRef.componentInstance.data.countdown = countdown;
    }

    if (this.isRefreshPress) { // If RefreshSession button it's pressed
      this.dialogRef.close()
      this.onRefreshSession()
      this.dialogTimeAcc = 0
      this.isDialogMounted = false
    } else if (progress <= 0) { // If Dialog it's closed without action
      this.dialogRef.close()
      this.onLogout()
      this.dialogTimeAcc = 0
      this.isDialogMounted = false
    }
  }

  onRefreshSession() {
    this.srvAuth.refreshSession()
    window.location.reload()
  }

  onLogout() {
    this.srvAuth.logout()
    this.router.navigateByUrl('/login')
  }


  // SIDENAV ANIMATION & PROFILE
  private profile: ProfileType = {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    role: { _id: '', name: '', createdAt: '', __v: 0 },
    createdAt: '',
    __v: 0
  }

  ngAfterViewInit(): void {
    this.srvProfile.profile$.pipe(delay(500)).subscribe((user: ProfileType | null) => {
      this.initBarAnimation()
      if (user) {
        this.profile.firstName = user.firstName
        this.profile.lastName = user.lastName
        this.profile.role.name = user.role.name
        this.profile.profileImage = user.profileImage
      }
    })
  }

  initBarAnimation() {
    this.sideNav.opened = true
    this.obsBreakpoint.observe(['(max-width:800px)'])
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

  protected get pfp() {
    return this.profile.profileImage || "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
  }

  get profileToDisplayInNav() {
    return {
      firstName: this.profile.firstName,
      lastName: this.profile.lastName
    }
  }

  get role() {
    return this.profile.role.name.toLowerCase()
  }

}
