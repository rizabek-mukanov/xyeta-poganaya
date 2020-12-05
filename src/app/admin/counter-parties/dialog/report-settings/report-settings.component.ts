import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {NbDialogRef, NbDialogService} from '@nebular/theme';

@Component({
  selector: 'ngx-report-settings',
  templateUrl: './report-settings.component.html',
  styleUrls: ['./report-settings.component.scss'],
})
export class ReportSettingsComponent implements OnInit {
  @Input() id: any;
  report: any;

  constructor(protected ref: NbDialogRef<ReportSettingsComponent>,
              private dialogService: NbDialogService) {
  }

  dismiss() {
    this.ref.close('asdsad');
  }

  ngOnInit(): void {
    console.log('THIS ID: ' + this.id);
    this.report = {
      autoSend: true,
      isSending: false,
    };
  }

  closeDialog() {
    this.dismiss();
  }

  choseDates(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: this.id,
    });
  }

  changed(report: any) {
    console.log(report);
  }
}
