import { Component } from '@angular/core';
import { Acces, App, AppsService } from '../services/apps.service';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.css'],
})
export class AdminOverviewComponent {
  error = '';
  isLoading = false;
  access: Acces[] = [];
  constructor(private appService: AppsService) {}
  ngOnInit(): void {
    this.getAccess();
  }
  getAccess() {
    this.isLoading = true;
    this.appService.getAccess().subscribe({
      next: (res) => {
        this.access = res;
      },
      complete: () => {
        this.isLoading = false;
      },
      error: (e: any) => {
        this.isLoading = false;
        this.error = 'Něco je špatně!';
        console.log(e);
      },
    });
  }
  deleteAccess(id: number) {
    this.appService.deleteAccess(id).subscribe({
      next: () => {
        this.getAccess();
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }
}
