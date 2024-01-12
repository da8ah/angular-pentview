import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { clocking } from '../clocking.types';
import { env } from '../../../shared/dev.env';

@Injectable({
  providedIn: 'root'
})
export class ClockingService {
  private apiURL = env.apiURL;
  private clockings = new BehaviorSubject<clocking[]>([])

  constructor(private http: HttpClient) {
    if (this.clockings.value.length === 0) this.getClockings()
  }

  get clockings$() {
    return this.clockings.asObservable()
  }

  getClockings() {
    this.http.get<{ data: [] }>(`${this.apiURL}employee-service/hour-register`)
      .subscribe((res: { data: [] }) => {
        this.clockings.next(res.data as clocking[])
      })
  }

  postClockIn() {
    return this.http.post(`${this.apiURL}employee-service/hour-register`, { type: 'in', register: new Date().toISOString() }, { observe: 'response' })
  }

  postClockOut() {
    return this.http.post(`${this.apiURL}employee-service/hour-register`, { type: 'out', register: new Date().toISOString() }, { observe: 'response' })
  }
}
