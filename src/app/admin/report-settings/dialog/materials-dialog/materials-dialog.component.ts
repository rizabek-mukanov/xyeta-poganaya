import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'ngx-materials-dialog',
  templateUrl: './materials-dialog.component.html',
  styleUrls: ['./materials-dialog.component.scss'],
})
export class MaterialsDialogComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'code', 'unit'];

  constructor(public dialogRef: MatDialogRef<MaterialsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.dataSource = this.data;
  }

  closeDialog() {
    this.dialogRef.close('SALAM');
  }
}
