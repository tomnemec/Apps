import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Acces, App, AppsService } from '../services/apps.service';

@Component({
  selector: 'app-access-form',
  templateUrl: './access-form.component.html',
  styleUrls: ['./access-form.component.css'],
})
export class AccessFormComponent {
  @Output() requestUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  accessToSafe: Acces = this.data || ({} as Acces);
  error = '';
  apps: App[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Acces,
    private accessService: AppsService,

    private dialogRef: MatDialogRef<AccessFormComponent>
  ) {}
  ngOnInit(): void {
    this.getApps();
  }
  getApps() {
    this.accessService.getApps().subscribe({
      next: (res) => {
        this.apps = res;
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }
  updateAccess() {
    if (this.accessToSafe.id) {
      this.accessService.updateAccess(this.data, this.data.id).subscribe({
        next: () => {
          this.requestUpdated.emit(true);
          this.dialogRef.close();
        },
        error: (e: any) => {
          console.log(e);
          this.requestUpdated.emit(false);
          this.dialogRef.close();
        },
      });
    } else {
      this.accessService.createAccess(this.data).subscribe({
        next: () => {
          this.requestUpdated.emit(true);
          this.dialogRef.close();
        },
        error: (e: any) => {
          console.log(e);
          this.requestUpdated.emit(false);
          this.dialogRef.close();
        },
      });
    }
  }
}
