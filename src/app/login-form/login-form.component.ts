import { Component } from '@angular/core';
import {
  Department,
  Login,
  SaveUser,
  UserService,
} from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  userLogin: Login = { email: '', password: '' };
  userRegistration: SaveUser = {} as SaveUser;
  validation = {
    repeatPassword: '',
  };
  error: string = '';
  form = true;
  departments: Department[] = [];

  constructor(private serviceUsers: UserService, private router: Router) {}
  ngOnInit() {
    this.serviceUsers.getDepartments().subscribe({
      next: (r: any) => {
        this.departments = r;
      },
      complete: () => {},
      error: (e: any) => {
        this.error = 'Něco se pokazilo!';
      },
    });
  }
  login() {
    this.userLogin.email.toLowerCase();
    this.serviceUsers.login(this.userLogin).subscribe({
      next: (r: any) => {
        localStorage.setItem('token', r.token);
      },
      complete: () => {
        this.router.navigate(['']);
      },
      error: (e: any) => (this.error = 'Heslo nebo email nesouhlasí!'),
    });
  }
  switchForm() {
    this.form = !this.form;
  }
  validatePassword() {
    if (this.userRegistration.Password != this.validation.repeatPassword) {
      this.error = 'Hesla se neshodují!';
    } else {
      this.error = '';
    }
  }
  register() {
    this.userRegistration.IsAdmin = false;
    this.serviceUsers.register(this.userRegistration).subscribe({
      next: (r: any) => {
        localStorage.setItem('token', r.token);
      },
      complete: () => {
        this.router.navigate(['']);
      },
      error: (e: any) => (this.error = 'Něco se pokazilo!'),
    });
  }
}
