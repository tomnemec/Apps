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
  error = '';
  success: boolean = false;
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
    this.userService.passwordChange(this.passwords, this.user.Id).subscribe({
      complete: () => {
        this.success = true;
        this.passwords = {
          oldPassword: '',
          newPassword: '',
        };
      },
      error: (e: any) =>
        (this.error = 'Heslo se nepovedlo změnit! Zkuste opakovat'),
    });
  }
}
