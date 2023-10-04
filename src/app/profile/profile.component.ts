import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Hardware,
  PasswordChange,
  User,
  UserService,
} from '../services/user.service';
import { AppsService } from '../services/apps.service';

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
  hardware: Hardware[] = [];
  success: boolean = false;
  constructor(
    private active: ActivatedRoute,
    private userService: UserService,
    private service: AppsService
  ) {}

  ngOnInit() {
    this.user = this.userService.getcurrentUser() ?? ({} as User);
    this.service.getHardware(this.user.Email).subscribe({
      next: (r: Hardware[]) => {
        this.hardware = r;
      },
    });
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
