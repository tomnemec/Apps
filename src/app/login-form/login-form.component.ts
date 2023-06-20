import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  constructor(private serviceUsers: UserService) {}
  ngOnInit() {
    this.serviceUsers
      .login({
        email: 'tomas.a.nemec@husqvarnagroup.com',
        password: 'Welcome07+',
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
