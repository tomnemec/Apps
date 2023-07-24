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
export interface Department {
  id: number;
  name: string;
}
export interface SaveUser {
  Name: string;
  Surname: string;
  Email: string;
  Password: string;
  DepartmentId: number;
}
export interface PasswordChange {
  oldPassword: string;
  newPassword: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'https://sw02660.global.hvwan.net/validator/';
  constructor(private http: HttpClient) {}

  login(login: Login) {
    return this.http.post(this.url + 'api/auth', login);
  }

  register(user: SaveUser) {
    return this.http.post(this.url + 'api/users', user);
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
  passwordChange(change: PasswordChange, id: number) {
    return this.http.post(
      this.url + 'api/users/password-change/' + id,
      change,
      this.getValidation()
    );
  }
  getDepartments() {
    return this.http.get<Department[]>(this.url + 'api/departments');
  }
}
