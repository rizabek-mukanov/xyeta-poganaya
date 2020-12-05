import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-additional-info-dialog',
  templateUrl: './additional-info-dialog.component.html',
  styleUrls: ['./additional-info-dialog.component.scss'],
})
export class AdditionalInfoDialogComponent implements OnInit {

  @Input() report: any;

  constructor(protected ref: NbDialogRef<AdditionalInfoDialogComponent>) {
  }

  dismiss() {
    this.ref.close();
  }

  ngOnInit(): void {
    console.log(this.report);
  }

}
