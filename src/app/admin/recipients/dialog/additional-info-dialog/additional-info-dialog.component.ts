import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DeleteInfoDialogComponent} from '../delete-info-dialog/delete-info-dialog.component';
import {EditInfoDialogComponent} from '../edit-info-dialog/edit-info-dialog.component';
import {AddInfoDialogComponent} from '../add-info-dialog/add-info-dialog.component';
import {ContractorService} from '../../../../@core/services/contractor.service';
import {CategoryService} from '../../../../@core/services/category.service';

@Component({
  selector: 'ngx-additional-info-dialog',
  templateUrl: './additional-info-dialog.component.html',
  styleUrls: ['./additional-info-dialog.component.scss'],
})
export class AdditionalInfoDialogComponent implements OnInit {
  contractors: any;
  displayedColumns: string[] = ['id', 'name', 'bin', 'email', 'phone', 'actions'];
  editableCategory: boolean = false;

  constructor(public dialogRef: MatDialogRef<AdditionalInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public matDialog: MatDialog,
              private contractorService: ContractorService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.getAllContractors();
  }
  getAllContractors() {
    this.contractorService.getByCategoryId(this.data.id).subscribe(response => {
      console.log(response);
      this.contractors = response;
    }, error => {
      console.error(error);
    });
  }

  closeDialog() {
    this.dialogRef.close('SALAM');
  }

  deleteCategory() {
    console.log(this.data);
    this.deleteRecipient(this.data, 'category');
  }

  deleteRecipient(recipient: any, type: string) {
    const deleteDialog = this.matDialog.open(DeleteInfoDialogComponent, {
      data: {id: recipient.id, type: type},
      width: '300',
      panelClass: 'delete-recipient-dialog',
    });
    deleteDialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  editRecipient(recipient: any) {
    const editDialog = this.matDialog.open(EditInfoDialogComponent, {
      data: recipient,
      panelClass: 'additional-info-modal',
    });
    editDialog.afterClosed().subscribe(result => {
      if (typeof result === 'object') {
        this.getAllContractors();
      }
    });
  }

  addNewRecipient() {
    const addInfoDialog = this.matDialog.open(AddInfoDialogComponent, {
      panelClass: 'additional-info-modal',
      data: this.data,
    });
    addInfoDialog.afterClosed().subscribe(result => {
      if (typeof result === 'object') {
        this.getAllContractors();
      }
      console.log(result);
    });
  }

  editCategory() {
    console.log(this.data);
    this.categoryService.editCategory(this.data).subscribe( resp => {
      console.log(resp);
      this.editableCategory = false;
    }, error => {
      console.error(error);
    });

  }
}
