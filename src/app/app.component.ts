import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
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
