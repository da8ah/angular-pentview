import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { profile, putProfile } from '../profile.types';
import { env } from '../../../shared/dev.env';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiURL = env.apiURL;
  private profile = new BehaviorSubject<profile | null>(null)

  constructor(private http: HttpClient) {
    if (!this.profile.value) this.loadProfile()
  }

  get profile$() {
    return this.profile.asObservable()
  }

  get profileId() {
    const token = localStorage.getItem('PVAT')
    if (!token) return null

    return (JSON.parse(atob(token.split('.')[1]))).sub
  }

  get role() {
    const token = localStorage.getItem('PVAT')
    if (!token) return null

    return (JSON.parse(atob(token.split('.')[1]))).authority.toLowerCase()
  }

  private loadProfile() {
    this.http.get(`${this.apiURL}employee-service/user/profile`)
      .subscribe((res: any) => {
        if (res.profileImage !== undefined) res.profileImage = `${this.apiURL}${res.profileImage}`
        else res.profileImage = "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        this.profile.next(res as profile || null)
      })
  }

  putProfile(profile: putProfile) {
    return this.http.put(`${this.apiURL}employee-service/user/update-profile`, profile, { observe: 'response' })
  }
}
