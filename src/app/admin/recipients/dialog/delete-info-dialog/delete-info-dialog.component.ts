import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ContractorService} from '../../../../@core/services/contractor.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-delete-info-dialog',
  templateUrl: './delete-info-dialog.component.html',
  styleUrls: ['./delete-info-dialog.component.scss'],
})
export class DeleteInfoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private contractorService: ContractorService,
              private toastService: NbToastrService) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close('close');
  }

  deleteCompany() {
    console.log(this.data);
    this.contractorService.deleteContractor(this.data.id).subscribe(data => {
      console.log(data);
      this.toastService.success('Успешно!');
    }, error => {
      console.error(error);
      this.toastService.danger('Ошибка!');
    });
  }
}
