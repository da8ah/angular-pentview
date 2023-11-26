import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  displayedColumns: string[] = ['position', 'type', 'register']
  clockings: clocking[] = []
  isLatestIn: boolean

  constructor(private service: ClockingService) {
    this.service.clockings$.subscribe((clockings: clocking[]) => {
      if (clockings.length > 0) {
        this.clockings = clockings
        this.isLatestIn = clockings[clockings.length - 1].type === "in"
      }
    })
  }

  clockIn() {
    this.service.postClockIn()
  }
  clockOut() {
    this.service.postClockOut()
  }
}
