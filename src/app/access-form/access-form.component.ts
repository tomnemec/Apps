import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Acces, AppsService } from '../services/apps.service';

@Component({
  selector: 'app-access-form',
  templateUrl: './access-form.component.html',
  styleUrls: ['./access-form.component.css'],
})
export class AccessFormComponent {
  @Output() requestUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  accessToSafe: Acces = this.data;
  error = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Acces,
    private accessService: AppsService,

    private dialogRef: MatDialogRef<AccessFormComponent>
  ) {}
  updateAccess() {
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
  }
}
