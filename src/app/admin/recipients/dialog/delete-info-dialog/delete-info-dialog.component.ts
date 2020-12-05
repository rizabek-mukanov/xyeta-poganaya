import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'ngx-delete-info-dialog',
  templateUrl: './delete-info-dialog.component.html',
  styleUrls: ['./delete-info-dialog.component.scss'],
})
export class DeleteInfoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close('SALAM');
  }

  deleteCompany() {

  }
}
