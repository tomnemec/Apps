import { Component } from '@angular/core';
import { App, AppsService } from '../services/apps.service';

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
  constructor(private serviceApps: AppsService) {}
  ngOnInit(): void {
    this.serviceApps.getApps().subscribe({
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
    this.serviceApps.getApps().subscribe((data) => {
      this.apps = data.filter((app) => {
        return app.name.toLowerCase().includes(this.input.toLowerCase());
      });
    });
  }
}
