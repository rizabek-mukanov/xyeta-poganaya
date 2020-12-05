import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'ngx-additional-info-mat-dialog',
  templateUrl: './additional-info-mat-dialog.component.html',
  styleUrls: ['./additional-info-mat-dialog.component.scss'],
})
export class AdditionalInfoMatDialogComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'bin', 'email', 'phone'];

  constructor(
    public dialogRef: MatDialogRef<AdditionalInfoMatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.dataSource = [
      {
        id: 1,
        name: 'asd',
        bin: 123123,
        email: 'asd@gmail.com',
        phone: '87085172655',
      },
    ];
    console.log(this.data);
  }

  closeDialog() {
    this.dialogRef.close('SALAM');
  }
}
