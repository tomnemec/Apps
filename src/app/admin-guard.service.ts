import { Injectable } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService {
  constructor(public auth: UserService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAdmin()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
