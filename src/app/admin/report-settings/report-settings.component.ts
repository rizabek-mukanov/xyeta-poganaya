import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {MatDialog} from '@angular/material/dialog';
import {MaterialClassifierDialogComponent} from './dialog/material-classifier-dialog/material-classifier-dialog.component';
import {ReportService} from '../../@core/services/report.service';

@Component({
  selector: 'ngx-report-settings',
  templateUrl: './report-settings.component.html',
  styleUrls: ['./report-settings.component.scss'],
})
export class ReportSettingsComponent implements OnInit {
  id: number;
  report: any;
  reportHours: any;
  reportMinutes: any;
  pageLoaded: boolean = false;
  hoursList: any = [];
  minutesList: any = [];
  // daysList: any = [
  //   {generate: 'generateInMonday', dayStr: 'ПН', isTrue: 'false'},
  //   {generate: 'generateInTuesday', dayStr: 'ВТ', isTrue: 'false'},
  //   {generate: 'generateInWednesday', dayStr: 'СР', isTrue: 'false'},
  //   {generate: 'generateInThursday', dayStr: 'ЧТ', isTrue: 'false'},
  //   {generate: 'generateInFriday', dayStr: 'ПТ', isTrue: 'false'},
  //   {generate: 'generateInSaturday', dayStr: 'СБ', isTrue: 'false'},
  //   {generate: 'generateInSunday', dayStr: 'ВС', isTrue: 'false'},
  // ];

  constructor(private activateRoute: ActivatedRoute,
              private dialogService: NbDialogService,
              private matDialog: MatDialog,
              private reportService: ReportService) {
    this.id = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.readyTimeList();
    this.getReportInfo();
  }

  readyTimeList() {
    for (let i = 0; i < 25; i++) {
      let hour;
      if (i.toString().length < 2) {
        hour = `0${i}`;
      } else {
        hour = `${i}`;
      }
      this.hoursList.push(hour);
    }
    for (let i = 0; i < 61; i++) {
      let minute;
      if (i.toString().length < 2) {
        minute = `0${i}`;
      } else {
        minute = `${i}`;
      }
      this.minutesList.push(minute);
    }
  }


  getReportInfo() {
    this.reportService.getById(this.id).subscribe(async data => {
      console.log(data);
      this.report = data;
      // await this.readyDaysList();
      this.pageLoaded = true;
      await this.divideTime();
    }, error => {
      console.error(error);
    });
  }

  choseDates(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: this.report,
    });
  }

  changed(report: any) {
    console.log(report);
  }

  openMatClassifier(report: any) {
    console.log('salam');
    const dialogRef = this.matDialog.open(MaterialClassifierDialogComponent, {
      data: report,
      panelClass: 'additional-info-modal',
      height: '90vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  async divideTime() {
    const time = this.report?.timeOfPublication;
    const hour = time?.split(':');
    this.reportHours = hour[0];
    this.reportMinutes = hour[1];
  }

  changeGenerateDays() {
    if (this.report) {
      this.report.timeOfPublication = `${this.reportHours}:${this.reportMinutes}`;
    }
    console.log(this.report);
  }

  cancelTime() {
    this.report = this.getReportInfo();
    console.log(this.report);
  }
}
