import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MaterialsDialogComponent} from '../materials-dialog/materials-dialog.component';

@Component({
  selector: 'ngx-material-classifier-dialog',
  templateUrl: './material-classifier-dialog.component.html',
  styleUrls: ['./material-classifier-dialog.component.scss'],
})
export class MaterialClassifierDialogComponent implements OnInit {
  departments: any = [
    {name: 'Материалы, конструкции и изделия для специального цикла работ (ов, вк и др.)'},
    {name: 'Материалы, конструкции и изделия для специального цикла работ (ов, вк и др.)'},
    {name: 'Материалы, конструкции и изделия для специального цикла работ (ов, вк и др.)'},
    {name: 'Материалы, конструкции и изделия для специального цикла работ (ов, вк и др.)'},
    {name: 'Материалы, конструкции и изделия для специального цикла работ (ов, вк и др.)'},
  ];

  constructor(public dialogRef: MatDialogRef<MaterialClassifierDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  closeDialog() {
    this.dialogRef.close('SALAM');
  }

  clearFilter() {
    console.log('clear filter');
  }

  openMaterialsDialog() {
    const materials = [
      {id: 1,  name: 'Суглинок', code: 21010102040, unit: 'м3'},
      {id: 2,  name: 'Грунт', code: 21010102040, unit: 'м3'},
      {id: 3,  name: 'Земля', code: 21010102040, unit: 'м3'},
      {id: 4,  name: 'Супесь', code: 21010102040, unit: 'м3'},
      {id: 5,  name: 'Грунтовая смесь', code: 21010102040, unit: 'м3'},
      {id: 6,  name: 'Песок', code: 21010102040, unit: 'м3'},
      {id: 7,  name: 'Торф', code: 21010102040, unit: 'м3'},
    ];
    const dialogRef = this.matDialog.open(MaterialsDialogComponent, {
      data: materials,
      panelClass: 'additional-info-modal',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
