import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';
import { profile, putProfile } from '../profile.types';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiURL = 'http://165.227.193.167/';
  private profile = new BehaviorSubject<profile | null>(null);

  constructor(private http: HttpClient) {
    if (!this.profile.value) this.loadProfile()
  }

  get profile$() {
    return this.profile.asObservable()
  }

  private get token() {
    return localStorage.getItem('PVAT')
  }

  private loadProfile() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get(`${this.apiURL}employee-service/user/profile`, { headers })
      .subscribe((res: any) => {
        this.profile.next(res as profile || null)
      })
  }

  putProfile(profile: putProfile) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.put(`${this.apiURL}employee-service/user/update-profile`, profile, { headers, observe: 'response' })
      .subscribe((res: any) => {
        if (res.ok) window.location.reload()
      })
  }
}
