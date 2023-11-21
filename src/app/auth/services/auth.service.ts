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

  constructor(private http: HttpClient) { }

  get isAuth$() {
    return this.auth$.asObservable()
  }

  login(form: { username: string, password: string }): Observable<boolean> {
    return this.http.post<{ access_token: string }>(`${this.apiURL}employee-service/user/auth/login`, {
      username: form.username,
      password: form.password
    })
      .pipe(map((res: { access_token: string }) => {
        console.log(res)
        const auth = res.access_token !== undefined;
        auth && this.saveToken(res.access_token)
        this.auth$.next(auth)
        return auth
      }))
  }

  get isTokenSaved() {
    return !!this.token
  }

  private saveToken(token: string) {
    localStorage.setItem(this.tokenName, token)
  }

  get token() {
    return localStorage.getItem(this.tokenName)
  }

  logout(): void {
    localStorage.removeItem(this.tokenName)
    this.auth$.next(false)
  }
}
