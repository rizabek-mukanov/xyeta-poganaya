import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AdditionalInfoMatDialogComponent} from '../../../counter-parties/dialog/additional-info-mat-dialog/additional-info-mat-dialog.component';
import {ContractorService} from '../../../../@core/services/contractor.service';

@Component({
  selector: 'ngx-edit-info-dialog',
  templateUrl: './edit-info-dialog.component.html',
  styleUrls: ['./edit-info-dialog.component.scss'],
})
export class EditInfoDialogComponent implements OnInit {
  company: any;

  constructor(public dialogRef: MatDialogRef<EditInfoDialogComponent>,
              private contractorService: ContractorService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.company = this.data;
  }

  closeDialog() {
    this.dialogRef.close('close');
  }

  saveRecipient() {
    console.log(this.company);
    this.contractorService.updateContractor(this.company).subscribe(resp => {
      console.log(resp);
      this.dialogRef.close(resp);
    }, error => {
      console.error(error);
    });

  }
}
