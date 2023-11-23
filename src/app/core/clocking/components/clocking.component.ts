import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockingService } from '../services/clocking.service';

@Component({
  selector: 'app-checking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clocking.component.html',
  styleUrl: './clocking.component.scss',
  providers: [ClockingService]
})
export class ClockingComponent {
  constructor(private service: ClockingService) {
    this.service.getHours()
  }
}
