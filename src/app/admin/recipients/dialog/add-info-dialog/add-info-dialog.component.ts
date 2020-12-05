import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Company} from '../../../../@core/models/company';

@Component({
  selector: 'ngx-add-info-dialog',
  templateUrl: './add-info-dialog.component.html',
  styleUrls: ['./add-info-dialog.component.scss'],
})
export class AddInfoDialogComponent implements OnInit {
  company: any;

  constructor(public dialogRef: MatDialogRef<AddInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }
  getCompanyReady() {
    // this.company = {}
  }
  closeDialog() {
    this.dialogRef.close('SALAM');
  }

}
