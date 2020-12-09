import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MaterialsDialogComponent} from '../materials-dialog/materials-dialog.component';
import {MaterialCatalogService} from '../../../../@core/services/material-catalog.service';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'ngx-material-classifier-dialog',
  templateUrl: './material-classifier-dialog.component.html',
  styleUrls: ['./material-classifier-dialog.component.scss'],
})
export class MaterialClassifierDialogComponent implements OnInit, OnDestroy {
  otdels: any;
  totalCount: number = 0;
  selectedOtdel: any;

  constructor(public dialogRef: MatDialogRef<MaterialClassifierDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private matDialog: MatDialog,
              private materialCatalogService: MaterialCatalogService,
              private themeService: NbThemeService) {
    this.themeService.changeTheme('default');
  }

  ngOnInit(): void {
    console.log(this.data);
    this.getAllOtdels();
  }

  ngOnDestroy() {
    this.themeService.changeTheme('dark');
  }

  getAllOtdels() {
    this.materialCatalogService.getAllOtdels().subscribe(data => {
      console.log(data);
      this.otdels = data;
    }, error => {
      console.error(error);
    });
  }

  closeDialog() {
    this.dialogRef.close('SALAM');
  }

  clearFilter() {
    console.log('clear filter');
  }

  openMaterialsDialog() {
    const materials = [
      {id: 1, name: 'Суглинок', code: 21010102040, unit: 'м3'},
      {id: 2, name: 'Грунт', code: 21010102040, unit: 'м3'},
      {id: 3, name: 'Земля', code: 21010102040, unit: 'м3'},
      {id: 4, name: 'Супесь', code: 21010102040, unit: 'м3'},
      {id: 5, name: 'Грунтовая смесь', code: 21010102040, unit: 'м3'},
      {id: 6, name: 'Песок', code: 21010102040, unit: 'м3'},
      {id: 7, name: 'Торф', code: 21010102040, unit: 'м3'},
    ];
    const dialogRef = this.matDialog.open(MaterialsDialogComponent, {
      data: materials,
      panelClass: 'additional-info-modal',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  removeFromList() {
    console.log('remove');
  }

  changeSelected(event: any) {
    console.log(event);
    console.log(typeof event);
    if (event !== null) {
      this.selectedOtdel = event;
      this.totalCount = event.mcCount;

    } else {
      console.log('salam');
      this.totalCount = 0;
    }
  }

  getAllSubOtdels(subOtdel: any) {
    this.materialCatalogService.getAllOtdels().subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }
}
