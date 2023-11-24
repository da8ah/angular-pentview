import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { user } from '../users.types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = 'http://165.227.193.167/';
  private users = new BehaviorSubject<user[]>([])

  constructor(private http: HttpClient) {
    if (this.users.value.length === 0) this.getUsers()
  }

  get users$() {
    return this.users.asObservable()
  }

  private get token() {
    return localStorage.getItem('PVAT')
  }

  getUsers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get(`${this.apiURL}employee-service/user/list`, { headers })
      .subscribe((res: any) => {
        this.users.next(res as user[])
      })
  }

  postUser(user: user) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.post(`${this.apiURL}employee-service/user`, user, { headers, observe: 'response' })
      .subscribe((res: any) => {
        console.log(res)
        console.log(res.ok)
      })
  }

  deleteUser(user: user) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.delete(`${this.apiURL}employee-service/user/${user._id}`, { headers })
      .subscribe((res: any) => {
        console.log(res)
      })
  }
}
