import { Acces } from './../services/apps.service';
import { Component } from '@angular/core';
import { App, AppsService } from '../services/apps.service';
import { MatDialog } from '@angular/material/dialog';
import { AccessFormComponent } from '../access-form/access-form.component';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.css'],
})
export class AdminOverviewComponent {
  error = '';
  isLoading = false;
  notificationStatus: any;
  notificationTimeout: any;
  access: Acces[] = [];
  newAccess: Acces = {} as Acces;
  constructor(private appService: AppsService, public dialog: MatDialog) {}
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
  openDialog(request?: Acces): void {
    const dialogRef = this.dialog.open(AccessFormComponent, {
      data: request,
    });

    dialogRef.componentInstance.requestUpdated.subscribe((updateSuccess) => {
      updateSuccess
        ? (this.notificationStatus = 'success')
        : (this.notificationStatus = 'error');
      clearTimeout(this.notificationTimeout);
      this.notificationTimeout = setInterval(() => {
        this.notificationStatus = null;
      }, 2000);
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAccess();
      this.newAccess = {} as Acces;
    });
  }
}
