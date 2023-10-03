import { Component } from '@angular/core';
import { App, AppsService } from '../services/apps.service';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent {
  apps: App[] = [];
  input: string = '';
  error = '';
  loading: boolean = true;
  user: User = this.userService.getcurrentUser() || ({} as User);
  constructor(
    private serviceApps: AppsService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.serviceApps.getAllowedApps(this.user.Email).subscribe({
      next: (res) => {
        this.apps = res;
      },
      complete: () => {
        this.loading = false;
      },
      error: (e: any) => {
        this.loading = false;
        this.error = 'Heslo nebo email nesouhlasí!';
      },
    });
  }
  search() {
    this.serviceApps.getAllowedApps(this.user.Email).subscribe({
      next: (res) => {
        this.apps = res;
        this.apps = res.filter((app) => {
          return app.name.toLowerCase().includes(this.input.toLowerCase());
        });
      },
      complete: () => {
        this.loading = false;
      },
      error: (e: any) => {
        this.loading = false;
        this.error = 'Heslo nebo email nesouhlasí!';
      },
    });
  }
}
