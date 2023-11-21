import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { user } from '../../core/profile/profile.types';
import { ProfileService } from '../../core/profile/services/profile.service';
import { AuthService } from '../../auth/services/auth.service';
import { delay, map } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    CoreModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  providers: [ProfileService, AuthService]
})
export class NavComponent implements AfterViewInit {
  title = 'angular-pentview';
  private user: user = {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    role: { name: '' }
  }

  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef, private profile: ProfileService, private auth: AuthService, private router: Router) { }

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

    this.profile.user$.subscribe((user: user | null) => {
      if (user) {
        this.user.firstName = user.firstName
        this.user.lastName = user.lastName
        this.user.role.name = user.role.name
      }
    })
  }

  get userProfile() {
    return this.user
  }

  get role() {
    return this.user.role.name.toLowerCase()
  }

  onLogout() {
    this.auth.logout()
    this.router.navigateByUrl('/login')
  }
}
