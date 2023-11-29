import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, map, share, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockService implements OnDestroy {
  subscription: Subscription
  static clock = new Subject<Date>()
  intervalId: any
  rxTime = new Date()

  start(callback: any) {
    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        ClockService.clock.next(time)
        this.rxTime = time;
        callback(time)
      });

  }

  ngOnDestroy() {
    clearInterval(this.intervalId)
    if (this.subscription) this.subscription.unsubscribe()
  }
}
