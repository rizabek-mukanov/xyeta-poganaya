import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddInfoDialogComponent} from '../add-info-dialog/add-info-dialog.component';
import {EditInfoDialogComponent} from '../edit-info-dialog/edit-info-dialog.component';
import {DeleteInfoDialogComponent} from '../delete-info-dialog/delete-info-dialog.component';
import {ContractorService} from '../../../../@core/services/contractor.service';
import {CategoryService} from '../../../../@core/services/category.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-new-category-dialog',
  templateUrl: './new-category-dialog.component.html',
  styleUrls: ['./new-category-dialog.component.scss'],
})
export class NewCategoryDialogComponent implements OnInit {
  categoryName: string = '';
  receivers: any = [];
  dataSource: any;
  displayedColumns: string[] = ['name', 'bin', 'email', 'phone', 'actions'];


  constructor(public dialogRef: MatDialogRef<NewCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public matDialog: MatDialog,
              private categoryService: CategoryService,
              private toastService: NbToastrService) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  closeDialog() {
    this.dialogRef.close('close');
  }


  saveCategory() {
    const object = {
      categoryName: this.categoryName,
      description: '',
      contractors : this.receivers,
    };
    this.categoryService.addNewCategoryWithContractor(object).subscribe(response => {
      this.toastService.success('Успешно');
      console.log(response);
      this.dialogRef.close(response);
    }, error => this.toastService.danger('Ошибка'));

  }

  deleteRecipient(recipient: any, i: number) {
    console.log(this.receivers);
    console.log(recipient);
    console.log(i);
    this.receivers.splice(i, 1);
  }

  addNewCompany() {
    const addInfoDialog = this.matDialog.open(AddInfoDialogComponent, {
      panelClass: 'additional-info-modal',
      data: this.categoryName,
    });
    addInfoDialog.afterClosed().subscribe(result => {
      console.log(typeof result);
      if (typeof result === 'object') {
        this.receivers.push(result);
        this.dataSource = this.receivers;
      }
      console.log(this.receivers);
      console.log(result);
    });
  }
}
