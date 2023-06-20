import { Component } from '@angular/core';
import { Login, UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  userLogin: Login = { email: '', password: '' };
  error: string = '';

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
}
