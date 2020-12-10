import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ContractorService} from '../../../../@core/services/contractor.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-add-info-dialog',
  templateUrl: './add-info-dialog.component.html',
  styleUrls: ['./add-info-dialog.component.scss'],
})
export class AddInfoDialogComponent implements OnInit {
  company: any = {bin: '', email: '', contractorName: '', phoneNumber: ''};

  constructor(public dialogRef: MatDialogRef<AddInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private contractorService: ContractorService,
              private toastService: NbToastrService) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }


  closeDialog() {
    this.dialogRef.close('close');
  }

  newCompany() {
    if (typeof this.data === 'string') {
      this.dialogRef.close(this.company);
      // this.company.category = {categoryName: this.data,
      //   description: ''};
    } else if (typeof this.data === 'object') {
      this.company.category = this.data;
      this.contractorService.addNewContractor(this.company).subscribe(data => {
        this.toastService.success('Успешно!');
        this.dialogRef.close(data);
      }, error => {
        this.toastService.danger('Ошибка!');
        this.dialogRef.close('close');
      });
    }
    console.log(this.company);
    // this.contractorService.addNewContractor(this.company).subscribe(data => {
    //   console.log(data);
    //   this.tostService.success('Успешно!');
    //   this.dialogRef.close(data);
    // }, error => {
    //   console.error(error);
    //   this.tostService.danger('Ошибка!');
    //   this.dialogRef.close('close');
    // });
  }
}
