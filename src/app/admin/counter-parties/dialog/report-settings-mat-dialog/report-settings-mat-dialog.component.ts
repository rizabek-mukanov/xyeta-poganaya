import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'ngx-report-settings-mat-dialog',
  templateUrl: './report-settings-mat-dialog.component.html',
  styleUrls: ['./report-settings-mat-dialog.component.scss'],
})
export class ReportSettingsMatDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReportSettingsMatDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }
  closeDialog() {
    this.dialogRef.close('SALAM');
  }
}
