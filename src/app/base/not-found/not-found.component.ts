import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClockService } from '../services/clock.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  providers: [ClockService]
})
export class NotFoundComponent {
  time = 6

  constructor(private router: Router, private srvClock: ClockService) {
    this.srvClock.start(() => {
      this.time -= 1;
      if (this.time === 0) this.router.navigateByUrl('dashboard')
    })
  }
}
