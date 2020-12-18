import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MaterialService} from '../../../../@core/services/material.service';
import {SelectionModel} from '@angular/cdk/collections';
import {NbToastrService} from '@nebular/theme';

class MyDataType {
}

@Component({
  selector: 'ngx-materials-dialog',
  templateUrl: './materials-dialog.component.html',
  styleUrls: ['./materials-dialog.component.scss'],
})
export class MaterialsDialogComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['name', 'code', 'unit'];
  selection = new SelectionModel(true, []);

  constructor(public dialogRef: MatDialogRef<MaterialsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private materialService: MaterialService,
              private toastService: NbToastrService) {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.getAllMaterials(this.data.chosenMaterial.mcCode);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }

  getAllMaterials(id: number) {
    this.materialService.getAllMaterials(id).subscribe(response => {
      console.log(this.data.materials);
      console.log(response);
      this.dataSource = response;
      console.log(this.selection);
      this.data.materials.forEach( material => {
        this.dataSource.forEach(element => {
          if (material.mtCode === element.mtCode) {
            this.selection.select(element);
          }
        });
      });
      console.log(this.dataSource);
    }, error => {
      console.error(error);
    });
  }

  closeDialog() {
    this.dialogRef.close('close');
  }

  submitAndClose() {
    if (this.selection.selected.length > 10) {
      this.toastService.danger('Количество материалов превышает 10!');
    } else {
      this.dialogRef.close(this.selection.selected);

    }
  }
}
