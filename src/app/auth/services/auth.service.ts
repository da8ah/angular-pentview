import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, delay, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://165.227.193.167/';
  private auth$ = new Subject<boolean>()

  constructor(private http: HttpClient) { }

  isAuth$() {
    return this.auth$.asObservable()
  }

  login(form: { username: string, password: string }): Observable<boolean> {
    return this.http.post(`${this.apiURL}employee-service/user/auth/login`, {
      username: form.username,
      password: form.password
    }).pipe(delay(500), map((res: any) => {
      const auth = res.access_token !== undefined
      auth && this.saveToken(res.access_token)
      auth && this.auth$.next(auth)
      return auth
    }))
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
