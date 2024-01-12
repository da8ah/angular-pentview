import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { role } from '../roles.types';
import { env } from '../../../shared/dev.env';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiURL = env.apiURL;
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
    this.http.get<{ data: [] }>(`${this.apiURL}employee-service/role`)
      .subscribe((res: { data: [] }) => {
        this.roles.next(res.data as role[])
      })
  }

  postRole(role: { name: string }) {
    return this.http.post(`${this.apiURL}employee-service/role`, role, { observe: 'response' })
  }
}
