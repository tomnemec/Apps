import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hardware } from './user.service';
export interface App {
  id: number;
  name: string;
  url: string;
  img: string;
}
export interface Acces {
  id: number;
  email: string;
  appName: string;
  role: string;
}
@Injectable({
  providedIn: 'root',
})
export class AppsService {
  constructor(private http: HttpClient) {}

  getApps() {
    return this.http.get<App[]>(
      'https://sw02660.global.hvwan.net/validator/api/apps'
    );
  }
  getAllowedApps(email: string) {
    const encodedEmail = encodeURIComponent(email);
    return this.http.get<App[]>(
      `https://sw02660.global.hvwan.net/validator/api/apps/allowed?email=${encodedEmail}`
    );
  }
  getHardware(email: string) {
    const encodedEmail = encodeURIComponent(email);
    return this.http.get<Hardware[]>(
      `https://sw02660.global.hvwan.net/pasma/api/hardware?email=${encodedEmail}`
    );
  }
  getAccess() {
    return this.http.get<Acces[]>(
      'https://sw02660.global.hvwan.net/validator/api/accessvalidation/getall'
    );
  }
  deleteAccess(id: number) {
    return this.http.delete(
      'https://sw02660.global.hvwan.net/validator/api/accessvalidation/' + id
    );
  }
  updateAccess(data: Acces, id: number) {
    return this.http.put(
      'https://sw02660.global.hvwan.net/validator/api/accessvalidation/' + id,
      data
    );
  }
  createAccess(data: Acces) {
    return this.http.post(
      'https://sw02660.global.hvwan.net/validator/api/accessvalidation/',
      data
    );
  }
}
