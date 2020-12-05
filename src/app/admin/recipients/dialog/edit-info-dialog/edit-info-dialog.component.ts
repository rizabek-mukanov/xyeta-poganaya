import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AdditionalInfoMatDialogComponent} from '../../../counter-parties/dialog/additional-info-mat-dialog/additional-info-mat-dialog.component';

@Component({
  selector: 'ngx-edit-info-dialog',
  templateUrl: './edit-info-dialog.component.html',
  styleUrls: ['./edit-info-dialog.component.scss'],
})
export class EditInfoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close('SALAM');
  }

  saveRecipient() {
  }
}
