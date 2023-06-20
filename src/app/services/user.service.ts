import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
export interface Login {
  email: string;
  password: string;
}
export interface User {
  Id: number;
  Name: string;
  Surname: string;
  Email: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(login: Login) {
    return this.http.post(
      'https://sw02660.global.hvwan.net/validator/api/auth',
      login
    );
  }
  logout() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token) return true;
    else return false;
  }
  getcurrentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;
    let jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token) as User;
  }
  getValidation() {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    headers = headers.append('Authorization', 'Bearer ' + token);
    let options = { headers: headers };

    return options;
  }
}
