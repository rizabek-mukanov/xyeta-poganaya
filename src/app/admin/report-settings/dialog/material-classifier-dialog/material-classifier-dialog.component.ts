import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsDialogComponent } from '../materials-dialog/materials-dialog.component';
import { MaterialCatalogService } from '../../../../@core/services/material-catalog.service';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { MaterialListService } from '../../../../@core/services/material-list.service';

@Component({
    selector: 'ngx-material-classifier-dialog',
    templateUrl: './material-classifier-dialog.component.html',
    styleUrls: ['./material-classifier-dialog.component.scss'],
})
export class MaterialClassifierDialogComponent implements OnInit, OnDestroy {
    otdels: any;
    rasdels: any = [];
    podrasdels: any = [];
    gruppas: any = [];
    podgruppas: any = [];
    chosenMaterial: any = null;
    materials: any = [];
    asd: any = {
        isOpen: true,
    };
  totalCount: number = 0;

    constructor(public dialogRef: MatDialogRef<MaterialClassifierDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private matDialog: MatDialog,
                private materialCatalogService: MaterialCatalogService,
                private materialListService: MaterialListService,
                private themeService: NbThemeService,
                private toastService: NbToastrService) {
        this.themeService.changeTheme('default');
    }

    ngOnInit(): void {
        console.log(this.data);
        this.getAllOtdels();
        this.getAllMaterials();
    }

    getAllMaterials() {
        this.materialListService.getAll().subscribe(data => {
            console.log(data);
            this.materials = data;
        });
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
        // this.materials = [];
        this.dialogRef.close('SALAM');
    }

    clearFilter() {
        this.materials = [];
        console.log('clear filter');
    }

    openMaterialsDialog() {
        console.log(this.chosenMaterial);
        const dialogRef = this.matDialog.open(MaterialsDialogComponent, {
            data: {chosenMaterial: this.chosenMaterial, materials: this.materials},
            panelClass: 'additional-info-modal',
            height: '90vh',
            width: '80vw',
        });
        dialogRef.afterClosed().subscribe(result => {
            if (typeof result === 'object') {
                result.forEach(element => {
                    this.materials.push(element);
                });
                const ids = this.materials.map(el => el.mtCode);
                this.materials = this.materials.filter(({mtCode}, index) => !ids.includes(mtCode, index + 1));
            } else if (typeof result === 'string') {
            }
        });
    }

    removeFromList(material: any, i: number) {
        this.materials.splice(i, 1);
    }

    changeOtdel(event: any) {
        this.otdels.forEach(element => {
            element.isSelected = false;
        });
        event.isSelected = true;
      this.totalCount = event.mcCount;
      this.rasdels = [];
        this.podrasdels = [];
        this.gruppas = [];
        this.podgruppas = [];
        this.chosenMaterial = null;
        this.getAllSubOtdels(event.mcCode, 1);
    }


    changeRasdel(event: any) {
        this.rasdels.forEach(element => {
            element.isSelected = false;
        });
        event.isSelected = true;
      this.totalCount = event.mcCount;
      this.podrasdels = [];
        this.gruppas = [];
        this.podgruppas = [];
        this.chosenMaterial = null;
        this.getAllSubOtdels(event.mcCode, 2);
    }

    changePodrazdel(event: any) {
        this.podrasdels.forEach(element => {
            element.isSelected = false;
        });
        event.isSelected = true;
      this.totalCount = event.mcCount;
      this.gruppas = [];
        this.podgruppas = [];
        this.chosenMaterial = null;
        this.getAllSubOtdels(event.mcCode, 3);
    }

    changeGruppa(event: any) {
        this.gruppas.forEach(element => {
            element.isSelected = false;
        });
        event.isSelected = true;
      this.totalCount = event.mcCount;
      this.podgruppas = [];
        this.chosenMaterial = null;
        this.getAllSubOtdels(event.mcCode, 4);

    }

    changePodgruppa(event: any) {
        this.podgruppas.forEach(element => {
            element.isSelected = false;
        });
        event.isSelected = true;
      this.totalCount = event.mcCount;
      console.log(event);
        this.chosenMaterial = event;
    }

    submitMaterials() {
        if (this.materials.length !== 10) {
            this.toastService.warning('Количество материалов должно быть равно 10');
        } else {
            const reportMateiralsList = [];
            this.materials.forEach(element => {
                const object = {mtCode: element.mtCode, reportId: this.data.id};
                reportMateiralsList.push(object);
            });
            this.materialListService.postMaterialsUseFilter(reportMateiralsList).subscribe(data => {
                this.toastService.success('Материалы добавлены успешно!');
                this.dialogRef.close(data);
            }, error => {
                this.toastService.danger('Ошибка при добавлении');
                console.error(error);
            });
        }
    }
}
