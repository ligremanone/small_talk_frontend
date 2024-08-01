import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  constructor() {}

  baseUrl = 'http://127.0.0.1:8000/api/v1/';
  me = signal<Profile | null>(null);

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseUrl}account/accounts`);
  }

  getSubscribersShortList() {
    return this.http
      .get<Pageble<Profile>>(`${this.baseUrl}account/followers`)
      .pipe(map((res) => res.items.slice(0, 3)));
  }

  getMe() {
    return this.http
      .get<Profile>(`${this.baseUrl}auth/me`)
      .pipe(tap((res) => this.me.set(res)));
  }
}
