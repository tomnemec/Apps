import { Component } from '@angular/core';
import { Login, SaveUser, UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  userLogin: Login = { email: '', password: '' };
  userRegistration: SaveUser = {
    Name: '',
    Surname: '',
    Email: '',
    Password: '',
  };
  validation = {
    repeatPassword: '',
  };
  error: string = '';
  form = true;

  constructor(private serviceUsers: UserService, private router: Router) {}
  ngOnInit() {}
  login() {
    this.userLogin.email.toLowerCase();
    this.serviceUsers.login(this.userLogin).subscribe({
      next: (r: any) => {
        localStorage.setItem('token', r.token);
      },
      complete: () => {
        this.router.navigate(['']);
      },
      error: (e: any) => (this.error = e.error.message),
    });
  }
  switchForm() {
    this.form = !this.form;
  }
  validatePassword() {
    if (this.userRegistration.Password != this.validation.repeatPassword) {
      this.error = 'Passwords do not match';
    } else {
      this.error = '';
    }
  }
}
