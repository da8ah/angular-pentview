import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { role } from '../roles.types';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiURL = 'http://165.227.193.167/';
  private roles = new BehaviorSubject<role[]>([])

  constructor(private http: HttpClient) {
    if (this.roles.value.length === 0) this.getRoles()
  }

  get roles$() {
    return this.roles.asObservable()
  }

  private get token() {
    return localStorage.getItem('PVAT')
  }

  getRoles() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<{ data: [] }>(`${this.apiURL}employee-service/role`, { headers })
      .subscribe((res: { data: [] }) => {
        this.roles.next(res.data as role[])
      })
  }

  postRole(role: { name: string }) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.apiURL}employee-service/role`, role, { headers, observe: 'response' })
  }
}
