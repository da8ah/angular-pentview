import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user } from '../profile.types';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiURL = 'http://165.227.193.167/';
  private user = new BehaviorSubject<user | null>(null);

  constructor(private http: HttpClient) {
    if (!this.user.value) this.loadUser()
  }

  get user$() {
    return this.user.asObservable()
  }

  private get token() {
    return localStorage.getItem('PVAT')
  }

  private loadUser() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get(`${this.apiURL}employee-service/user/profile`, { headers })
      .subscribe((res: any) => {
        this.user.next(res as user || null)
      })
  }
}
