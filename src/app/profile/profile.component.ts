import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordChange, User, UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: User = {} as User;
  formPassword: boolean = false;
  passwords: PasswordChange = {
    oldPassword: '',
    newPassword: '',
  };
  constructor(
    private active: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.getcurrentUser() ?? ({} as User);
  }

  switchForm() {
    this.formPassword = !this.formPassword;
  }
  changePassword() {
    this.userService
      .passwordChange(this.passwords, this.user.Id)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
