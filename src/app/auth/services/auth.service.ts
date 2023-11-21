import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://165.227.193.167/';
  private auth$ = new Subject<boolean>()

  // constructor(private http: HttpClient) { }

  isAuth$() {
    return this.auth$.asObservable()
  }

  login(form: { username: string, password: string }) {
    // this.http.post(`${this.apiURL}employee-service/user/auth/login`, {
    //   username: form.username,
    //   password: form.password
    // }).subscribe((res) => {
    //   console.log(res)
    // })
    this.auth$.next(true)
    return of(true).pipe(delay(500), tap((auth) => auth))
  }

  private saveToken(token: string) {
    // PentView Auth Token (PVAT)
    localStorage.setItem('PVAT', token)
  }

  private getToken(token: string) {
    localStorage.getItem('PVAT')
  }

  logout(): void {
    this.auth$.next(false)
  }
}
