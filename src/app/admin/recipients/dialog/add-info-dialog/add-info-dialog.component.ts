import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Company} from '../../../../@core/models/company';
import {ContractorService} from '../../../../@core/services/contractor.service';

@Component({
  selector: 'ngx-add-info-dialog',
  templateUrl: './add-info-dialog.component.html',
  styleUrls: ['./add-info-dialog.component.scss'],
})
export class AddInfoDialogComponent implements OnInit {
  company: Company = {id: null, bin: '', email: '', contractorName: '', phoneNumber: ''};

  constructor(public dialogRef: MatDialogRef<AddInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private contractorService: ContractorService) {
  }

  ngOnInit(): void {
  }


  closeDialog() {
    this.dialogRef.close('close');
  }

  newCompany() {
    // console.log(this.company);
    this.contractorService.addNewContractor(this.company).subscribe(data => {
      console.log(data);
    }, error => {
      console.error(error);
    });
    // this.dialogRef.close(this.company);
  }
}
