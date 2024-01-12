import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user } from '../users.types';
import { env } from '../../../shared/dev.env';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = env.apiURL;
  private users = new BehaviorSubject<user[]>([])

  constructor(private http: HttpClient) {
    if (this.users.value.length === 0) this.getUsers()
  }

  get users$() {
    return this.users.asObservable()
  }

  getUsers() {
    return this.http.get(`${this.apiURL}employee-service/user/list`)
      .subscribe((res: any) => {
        this.users.next(res as user[])
      })
  }

  postUser(user: user, pfp: File) {
    const data = new FormData()
    data.append("json", JSON.stringify(user))
    data.append("image", pfp)
    return this.http.post(`${this.apiURL}employee-service/user`, data, { observe: 'response' })
  }

  deleteUser(user: user) {
    return this.http.delete(`${this.apiURL}employee-service/user/${user._id}`, { observe: 'response' })
  }
}
