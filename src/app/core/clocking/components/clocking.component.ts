import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockingService } from '../services/clocking.service';
import { clocking } from '../clocking.types';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { ClockComponent } from './clock/clock.component';

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

  constructor(private service: ClockingService) {
    this.service.clockings$.subscribe((clockings: clocking[]) => {
      console.log(clockings)
      this.clockings = clockings
    })
  }
}
