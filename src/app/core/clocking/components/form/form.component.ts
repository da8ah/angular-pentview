import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() isLatestIn: boolean
  @Output() clockIn = new EventEmitter()
  @Output() clockOut = new EventEmitter()

  intervalId: any
  progressIn = 0
  isClockInActivated = false
  progressOut = 0
  isClockOutActivated = false

  constructor() { }

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
    if (this.progressIn >= 100) this.clockIn.emit()
    this.resetIn()
  }
  onClockOut() {
    if (this.progressOut >= 100) this.clockOut.emit()
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
