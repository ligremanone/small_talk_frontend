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
  filteredProfiles=signal<Profile[]>([])

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseUrl}account/test-accounts`);
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseUrl}account/followers`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  getMe() {
    return this.http
      .get<Profile>(`${this.baseUrl}account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseUrl}account/${id}`);
  }

  pathProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseUrl}account/me`, profile);
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);
    return this.http.post<Profile>(`${this.baseUrl}account/upload-image`, fd);
  }

  filterProfiles(params: Record<string, any>) {
    return this.http.get<Profile[]>(`${this.baseUrl}account/accounts`, {
      params,
    }).pipe(
      tap(res=>this.filteredProfiles.set(res))
    );
  }
}
