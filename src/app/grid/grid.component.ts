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
  constructor(private serviceApps: AppsService) {}
  ngOnInit(): void {
    this.serviceApps.getApps().subscribe((data) => {
      this.apps = data;
      console.log(this.apps);
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
