import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ContractorService} from '../../../../@core/services/contractor.service';
import {NbToastrService} from '@nebular/theme';
import {CategoryService} from '../../../../@core/services/category.service';

@Component({
  selector: 'ngx-delete-info-dialog',
  templateUrl: './delete-info-dialog.component.html',
  styleUrls: ['./delete-info-dialog.component.scss'],
})
export class DeleteInfoDialogComponent implements OnInit {
  type: any;

  constructor(public dialogRef: MatDialogRef<DeleteInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private contractorService: ContractorService,
              private categoryService: CategoryService,
              private toastService: NbToastrService) {
  }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data?.type === 'category') {
      this.type = {first: 'Категории', second: 'Категорию'};
    } else if (
      this.data?.type === 'company') {
      this.type = {first: 'Компании', second: 'Компанию'};
    }
  }

  closeDialog() {
    this.dialogRef.close('close');
  }

  deleteCompany() {
    console.log(this.data);
    if (this.data.type === 'company') {
      this.data.element.categoryID = null;
      console.log(this.data.element);
      this.contractorService.updateContractor(this.data.element).subscribe( response => {
          this.toastService.success('Успешно!');
        this.dialogRef.close('close');
      }, error => {
          this.toastService.danger('Ошибка!');
        this.dialogRef.close('close');
      });
    } else if (this.data.type === 'category') {
      this.categoryService.deleteCategory(this.data.element.id).toPromise().then( response => {
        console.log(response);
        this.dialogRef.close('delete');
      }).catch( error => {
        console.log(error);
        this.dialogRef.close('delete');
      });
      // this.categoryService.deleteCategory(this.data.element.id).subscribe(data => {
      //   console.log(data);
      //   this.toastService.success('Успешно!');
      // }, error => {
      //   console.error(error);
      //   this.toastService.danger('Ошибка!');
      // });
    }

  }
}
