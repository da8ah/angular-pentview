import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClockService } from '../../../../base/services/clock.service';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss',
  providers: [ClockService]
})
export class ClockComponent {
  rxTime = new Date()

  constructor(private clock: ClockService) {
    this.clock.start((time: Date) => {
      this.rxTime = time
    })
  }
}