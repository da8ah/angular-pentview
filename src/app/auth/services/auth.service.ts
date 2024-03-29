import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs';
import { env } from '../../shared/dev.env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = env.apiURL;
  private auth$ = new BehaviorSubject<boolean>(false)
  private tokenName = 'PVAT' // PentView Auth Token
  private dumbName = 'PVDT' // PentView Dumb Token
  private credName = 'PVUC' // PentView User Credentials
  private secret = "Secret Passphrase"

  constructor(private http: HttpClient) { }

  get isAuth$() {
    return this.auth$.asObservable()
  }

  storeEncryptedCredentials(form: { username: string, password: string }) {
    const header = btoa(JSON.stringify({
      "alg": "HS256",
      "typ": "JWT"
    }))
    const cred = CryptoJS.AES.encrypt(JSON.stringify(form), this.secret).toString()
    const body = btoa(JSON.stringify({ [this.credName as string]: cred })).replace(/=+$/, '')
    const hash = btoa(CryptoJS.HmacSHA256(`${header}.${body}`, this.secret).toString()).replace(/=+$/, '')
    const token = `${header}.${body}.${hash}`
    localStorage.setItem(this.dumbName, token)
  }

  login(form: { username: string, password: string }) {
    this.http.post<{ access_token: string }>(`${this.apiURL}employee-service/user/auth/login`, form)
      .subscribe({
        next: (res: { access_token: string }) => {
          const auth = res.access_token !== undefined;
          if (auth) this.saveToken(res.access_token)
          if (this.isTokenSaved) { this.storeEncryptedCredentials(form); this.auth$.next(auth) }
        },
        error: (err) => console.log(err)
      })
  }

  refreshSession() {
    const token = localStorage.getItem(this.dumbName)
    if (!token) return

    const cred = (JSON.parse(atob(token.split('.')[1])))[this.credName]
    const form = JSON.parse(CryptoJS.AES.decrypt(cred, this.secret).toString(CryptoJS.enc.Utf8))
    return this.login(form)
  }

  logout(): void {
    localStorage.removeItem(this.tokenName)
    localStorage.removeItem(this.dumbName)
    this.auth$.next(false)
  }

  // TOKEN
  private saveToken(token: string) {
    localStorage.setItem(this.tokenName, token)
  }

  get isTokenSaved() {
    return !!localStorage.getItem(this.tokenName)
  }

  get tokenExpiry() {
    const token = localStorage.getItem(this.tokenName)
    if (!token) return 0
    return (JSON.parse(atob(token.split('.')[1]))).exp * 1000 // Expiry in Seconds
  }

  get isTokenExpired() {
    const token = localStorage.getItem(this.tokenName)
    if (!token) return true // Token expired
    return this.tokenExpiry <= Date.now(); // Token time <= Now
  }

  get isTokenAboutToExpire() {
    const token = localStorage.getItem(this.tokenName)
    if (!token) return
    return this.tokenExpiry <= Date.now() + 1000 * 60; // Token time <= Now +60s window
  }
}
