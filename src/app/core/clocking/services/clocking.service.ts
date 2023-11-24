import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockingService {
  private apiURL = 'http://165.227.193.167/';
  private clockings = new BehaviorSubject([])

  constructor(private http: HttpClient) {
    if (this.clockings.value.length === 0) this.getClockings()
  }

  get clockings$() {
    return this.clockings.asObservable()
  }

  private get token() {
    return localStorage.getItem('PVAT')
  }

  getClockings() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<{ data: [] }>(`${this.apiURL}employee-service/hour-register`, { headers })
      .subscribe((res: { data: [] }) => {
        console.log(res.data)
        this.clockings.next(res.data)
        // this.clockings.next(res.data as )
      })
  }

  postClockIn() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.post(`${this.apiURL}employee-service/hour-register`, { type: 'in', register: new Date().toISOString() }, { headers, observe: 'response' })
      .subscribe((res: any) => {
        console.log(res)
        console.log(res.ok)
      })
  }

  postClockOut() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.post(`${this.apiURL}employee-service/hour-register`, { type: 'out', register: new Date().toISOString() }, { headers, observe: 'response' })
      .subscribe((res: any) => {
        console.log(res)
        console.log(res.ok)
      })
  }
}
