import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MaterialsDialogComponent} from '../materials-dialog/materials-dialog.component';
import {MaterialCatalogService} from '../../../../@core/services/material-catalog.service';
import {NbThemeService} from '@nebular/theme';
import {MaterialListService} from '../../../../@core/services/material-list.service';

@Component({
  selector: 'ngx-material-classifier-dialog',
  templateUrl: './material-classifier-dialog.component.html',
  styleUrls: ['./material-classifier-dialog.component.scss'],
})
export class MaterialClassifierDialogComponent implements OnInit, OnDestroy {
  otdels: any;
  totalCount: number = 0;
  rasdels: any = [];
  podrasdels: any = [];
  gruppas: any = [];
  podgruppas: any = [];
  chosenMaterial: any = null;
  materials: any = [];

  constructor(public dialogRef: MatDialogRef<MaterialClassifierDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private matDialog: MatDialog,
              private materialCatalogService: MaterialCatalogService,
              private materialListService: MaterialListService,
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

  getAllSubOtdels(mcCode: number, type: number) {
    this.materialCatalogService.getAllSubOtdels(mcCode).subscribe(response => {
      switch (type) {
        case 1:
          this.rasdels = response;
          break;
        case 2:
          this.podrasdels = response;
          break;
        case 3:
          this.gruppas = response;
          break;
        case 4:
          this.podgruppas = response;
          break;

      }
      console.log(response);
    });
  }

  closeDialog() {
    this.materials = [];
    this.dialogRef.close('SALAM');
  }

  clearFilter() {
    this.materials = [];
    console.log('clear filter');
  }

  openMaterialsDialog() {
    const dialogRef = this.matDialog.open(MaterialsDialogComponent, {
      data: this.chosenMaterial,
      panelClass: 'additional-info-modal',
      height: '90vh',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'object') {
        this.materials = result;
      } else if (typeof result === 'string') {
      }
      console.log(result);
    });
  }

  removeFromList(material: any, i: number) {
    console.log(i);
    console.log(material);
    this.materials.splice(i, 1);
  }

  changeOtdel(event: any) {
    if (event !== null) {
      // this.selectedOtdel = event;
      this.totalCount = event.mcCount;
      this.rasdels = [];
      this.podrasdels = [];
      this.gruppas = [];
      this.podgruppas = [];
      this.chosenMaterial = null;
      this.getAllSubOtdels(event.mcCode, 1);
    } else {
      this.totalCount = 0;
    }
  }


  changeRasdel(event: any) {
    if (event !== null) {
      this.totalCount = event.mcCount;
      this.podrasdels = [];
      this.gruppas = [];
      this.podgruppas = [];
      this.chosenMaterial = null;
      this.getAllSubOtdels(event.mcCode, 2);
    } else {
      this.totalCount = 0;
    }
  }

  changePodrazdel(event: any) {
    if (event !== null) {
      this.totalCount = event.mcCount;
      this.gruppas = [];
      this.podgruppas = [];
      this.chosenMaterial = null;
      this.getAllSubOtdels(event.mcCode, 3);
    } else {
      this.totalCount = 0;
    }
  }

  changeGruppa(event: any) {
    if (event !== null) {
      this.podgruppas = [];
      this.chosenMaterial = null;
      this.totalCount = event.mcCount;
      this.getAllSubOtdels(event.mcCode, 4);
    } else {
      this.totalCount = 0;
    }
  }

  changePodgruppa(event: any) {
    if (event !== null) {
      this.totalCount = event.mcCount;
      console.log(event);
      this.chosenMaterial = event;
    } else {
      this.totalCount = 0;
    }
  }

  submitMaterials() {
    console.log(this.materials);
    console.log(this.data);
    this.materials.forEach(element => {
      element.report = { id: this.data.id};
    });
    this.materialListService.postMaterialsUseFilter(this.materials).subscribe( data => {
      console.log(data);
    });
  }
}
