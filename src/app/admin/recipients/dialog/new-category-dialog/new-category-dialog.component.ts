import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'ngx-new-category-dialog',
  templateUrl: './new-category-dialog.component.html',
  styleUrls: ['./new-category-dialog.component.scss'],
})
export class NewCategoryDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public matDialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }
  closeDialog() {
    this.dialogRef.close('SALAM');
  }


  saveCategory() {
  }
}
