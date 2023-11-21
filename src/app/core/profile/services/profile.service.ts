import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { user } from '../profile.types';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiURL = 'http://165.227.193.167/';
  private user = new BehaviorSubject<user | null>(null);

  get user$() {
    return this.user.asObservable()
  }

  constructor(private service: AuthService, private http: HttpClient) {
    if (!this.user.value) this.loadUser(this.service.token)
  }

  private loadUser(token: string | null) {
    if (!token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(`${this.apiURL}employee-service/user/profile`, { headers }).subscribe((res: any) => {
      this.user.next(res as user || null);
    })
  }
}
