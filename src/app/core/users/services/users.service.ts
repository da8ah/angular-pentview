import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user } from '../users.types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = 'http://165.227.193.167/';
  private users = new BehaviorSubject<user[]>([])

  constructor(private http: HttpClient) { }

  get users$() {
    return this.users.asObservable()
  }

  private get token() {
    return localStorage.getItem('PVAT')
  }

  getUsers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.apiURL}employee-service/user/list`, { headers, observe: 'response' })
  }

  postUser(user: user) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.apiURL}employee-service/user`, user, { headers, observe: 'response' })
  }

  deleteUser(user: user) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete(`${this.apiURL}employee-service/user/${user._id}`, { headers, observe: 'response' })
  }
}
