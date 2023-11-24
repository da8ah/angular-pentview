import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://165.227.193.167/';
  private auth$ = new BehaviorSubject<boolean>(false)
  private tokenName = 'PVAT' // PentView Auth Token (PVAT)
  private static credentials: { username: string, password: string };

  constructor(private http: HttpClient) { }

  get isAuth$() {
    return this.auth$.asObservable()
  }

  setCredentials(form: { username: string, password: string }) {
    AuthService.credentials = form
  }

  login(form: { username: string, password: string }): Observable<boolean> {
    return this.http.post<{ access_token: string }>(`${this.apiURL}employee-service/user/auth/login`, form)
      .pipe(map((res: { access_token: string }) => {
        const auth = res.access_token !== undefined;
        auth && this.saveToken(res.access_token)
        this.auth$.next(auth)
        return auth
      }))
  }

  refreshSession() {
    localStorage.removeItem(this.tokenName)
    return this.login(AuthService.credentials)
  }

  get isTokenSaved() {
    return !!localStorage.getItem(this.tokenName)
  }

  private saveToken(token: string) {
    localStorage.setItem(this.tokenName, token)
  }

  logout(): void {
    localStorage.removeItem(this.tokenName)
    this.auth$.next(false)
  }
}
