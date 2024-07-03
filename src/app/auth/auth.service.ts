import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from "rxjs";
import {TokenResponse} from "./auth.interface";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService)
  baseApiUrl = 'http://127.0.0.1:8000/api/v1/auth/';
  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token')
    }
    return !!this.token
  }

  login(payload: { username: string, password: string }) {
    const fd = new FormData()
    fd.append('username', payload.username)
    fd.append('password', payload.password)
    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`, fd).pipe(tap(value => {
      this.token = value.access_token
      this.refreshToken = value.refresh_token
      this.cookieService.set('token', this.token)
      this.cookieService.set('refreshToken', this.refreshToken)
    }));
  }
}
