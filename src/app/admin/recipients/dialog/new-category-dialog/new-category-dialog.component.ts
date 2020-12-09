import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddInfoDialogComponent} from '../add-info-dialog/add-info-dialog.component';
import {EditInfoDialogComponent} from '../edit-info-dialog/edit-info-dialog.component';
import {DeleteInfoDialogComponent} from '../delete-info-dialog/delete-info-dialog.component';
import {ContractorService} from '../../../../@core/services/contractor.service';

@Component({
  selector: 'ngx-new-category-dialog',
  templateUrl: './new-category-dialog.component.html',
  styleUrls: ['./new-category-dialog.component.scss'],
})
export class NewCategoryDialogComponent implements OnInit {
  categoryName: string = '';
  receivers: any = [];
  displayedColumns: string[] = ['id', 'name', 'bin', 'email', 'phone', 'actions'];


  constructor(public dialogRef: MatDialogRef<NewCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public matDialog: MatDialog,
              private contractorService: ContractorService) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  closeDialog() {
    this.dialogRef.close('SALAM');
  }


  saveCategory() {
  }

  getAllContractors(id) {
    this.contractorService.getByCategoryId(id).subscribe(response => {
      console.log(response);
      this.receivers = response;
    }, error => {
      console.error(error);
    });
  }

  editRecipient(recipient: any) {
    const editDialog = this.matDialog.open(EditInfoDialogComponent, {
      data: recipient,
      panelClass: 'additional-info-modal',
    });
    editDialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  deleteRecipient(recipient: any) {
    const deleteDialog = this.matDialog.open(DeleteInfoDialogComponent, {
      data: recipient,
      width: '300',
      panelClass: 'delete-recipient-dialog',
    });
    deleteDialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  addNewCompany() {
    const addInfoDialog = this.matDialog.open(AddInfoDialogComponent, {
      panelClass: 'additional-info-modal',
      // data: 'newCategory',
      data: this.categoryName,
    });
    addInfoDialog.afterClosed().subscribe(result => {
      if (typeof result === 'object') {
        console.log(result);
        this.getAllContractors(result.category.id);
      }
      console.log(result);
    });
  }
}
