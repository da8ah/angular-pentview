import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map, share, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockService implements OnDestroy {
  subscription: Subscription
  intervalId: any
  rxTime = new Date()

  get clock$() {
    return this.subscription
  }

  start(callback: any) {
    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
        callback(time)
      });

  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
