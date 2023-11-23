import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockingService {
  private apiURL = 'http://165.227.193.167/';
  private hours = new BehaviorSubject([])

  constructor(private http: HttpClient) {
    if (this.hours.value.length === 0) this.getHours()
  }

  get hours$() {
    return this.hours.asObservable()
  }

  private get token() {
    return localStorage.getItem('PVAT')
  }

  getHours() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<{ data: [] }>(`${this.apiURL}employee-service/hour-register`, { headers })
      .subscribe((res: { data: [] }) => {
        console.log(res.data)
        this.hours.next(res.data)
        // this.hours.next(res.data as )
      })
  }

  postHour() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.post(`${this.apiURL}employee-service/hour-register`, { type: 'in', register: new Date().toISOString() }, { headers })
      .subscribe((res: any) => {
        console.log(res)
      })
  }
}
