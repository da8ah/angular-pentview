import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CoreModule } from '../../core/core.module';

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
  styleUrl: './nav.component.scss'
})
export class NavComponent implements AfterViewInit {
  title = 'angular-pentview';

  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef) { }

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
  }
}
