import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class NotFoundComponent implements OnDestroy {
  time = 6

  constructor(private router: Router, private clock: ClockService) {
    this.clock.start(() => {
      this.time -= 1;
      if (this.time === 0) this.router.navigateByUrl('dashboard')
    })
  }

  ngOnDestroy(): void {
    this.clock.subscription.unsubscribe()
  }
}
