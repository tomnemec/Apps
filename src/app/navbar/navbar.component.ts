import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: User | null = this.service.getcurrentUser();
  constructor(public service: UserService) {}
  ngOnInit() {
    console.log(this.user);
  }
  logout() {
    this.service.logout();
    window.location.reload();
  }
  redirectToExternalUrl() {
    window.location.href = 'https://sw02660.global.hvwan.net/vrbno/';
  }
}
