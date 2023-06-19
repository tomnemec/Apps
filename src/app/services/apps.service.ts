import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
interface App {
  id: number;
  name: string;
  url: string;
  img: string;
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
}
