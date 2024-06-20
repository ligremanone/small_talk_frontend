import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../interfaces/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)

  constructor() {
  }

  baseUrl = 'http://127.0.0.1:8000/api/v1/'

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseUrl}account/accounts`)
  }
}
