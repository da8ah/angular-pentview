import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ClockingService } from '../../services/clocking.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [ClockingService]
})
export class FormComponent {
  intervalId: any

  progressIn = 0
  isClockInActivated = false

  progressOut = 0
  isClockOutActivated = false

  onProgressIn() {
    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.progressIn += 10;

      if (this.progressIn >= 100) {
        clearInterval(this.intervalId)
        this.isClockInActivated = true;
      }
    }, 100)
  }
  onProgressOut() {
    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.progressOut += 10;

      if (this.progressOut >= 100) {
        clearInterval(this.intervalId)
        this.isClockOutActivated = true;
      }
    }, 100)
  }

  onClockIn() {
    console.log('In: ', this.progressIn)
    // this.service.postClockIn(form.value)
    this.resetIn()
  }
  onClockOut() {
    console.log('Out: ', this.progressOut)
    // this.service.postClockOut(form.value)
    this.resetOut()
  }

  resetIn() {
    this.progressIn = 0
    this.isClockInActivated = false
  }
  resetOut() {
    this.progressOut = 0
    this.isClockOutActivated = false
  }
}
