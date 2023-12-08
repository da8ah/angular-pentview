import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../../base/snackbar/snackbar.component';
import { clocking } from '../clocking.types';
import { ClockingService } from '../services/clocking.service';
import { ClockComponent } from './clock/clock.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-checking',
  standalone: true,
  imports: [
    CommonModule,
    ClockComponent,
    FormComponent,
    TableComponent
  ],
  templateUrl: './clocking.component.html',
  styleUrl: './clocking.component.scss',
  providers: [ClockingService]
})
export class ClockingComponent {
  // SnackBar
  snackBarRef: MatSnackBarRef<{
    data: { status: number, message: string }
  }>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = ['position', 'type', 'register']
  clockings: clocking[] = []
  isLatestIn: boolean

  constructor(private snackBar: MatSnackBar, private srvClocking: ClockingService) {
    this.srvClocking.clockings$.subscribe((clockings: clocking[]) => {
      if (clockings.length > 0) {
        this.clockings = clockings
        this.isLatestIn = clockings[clockings.length - 1].type === "in"
      }
    })
  }

  clockIn() {
    this.srvClocking.postClockIn().subscribe({
      next: (res: any) => { if (res.ok) { this.openSnackBar(res.status, res.body.message); this.srvClocking.getClockings() } },
      error: (error) => { this.openSnackBar(error.status, error.error.message) }
    })
  }
  clockOut() {
    this.srvClocking.postClockOut().subscribe({
      next: (res: any) => { if (res.ok) { this.openSnackBar(res.status, res.body.message); this.srvClocking.getClockings() } },
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
