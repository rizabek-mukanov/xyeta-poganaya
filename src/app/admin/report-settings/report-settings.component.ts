import {Component, ElementRef, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {MatDialog} from '@angular/material/dialog';
import {MaterialClassifierDialogComponent} from './dialog/material-classifier-dialog/material-classifier-dialog.component';
import {ReportService} from '../../@core/services/report.service';
import {fromEvent, Subscription} from 'rxjs';

@Component({
  selector: 'ngx-report-settings',
  templateUrl: './report-settings.component.html',
  styleUrls: ['./report-settings.component.scss'],
})
export class ReportSettingsComponent implements OnInit, OnDestroy {
  id: number;
  report: any;
  reportHours: any;
  reportMinutes: any;
  pageLoaded: boolean = false;
  hoursList: any = [];
  minutesList: any = [];
  pdfSrc: string = 'http://10.110.160.50:8887/api/generate/pdf/pdf-18-15-51.pdf';
  pdf: any;
  page: 1;
  pdfPagesList: any = [];
  isLoading = false;
  expirationTime: any;
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  isHandlerDragging: boolean = false;

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
    this.getReportInfo(true);
    this.getExpirationTime();
    this.testSubscribe();
  }

  testSubscribe() {

    const handler = document.querySelector('.handler');
    const wrapper = handler.closest('.wrapper');
    const boxA = wrapper.querySelector('.box');
    this.subscription =
      fromEvent(document, 'mousemove')
        .subscribe(e => {
          if (!this.isHandlerDragging) {
            return false;
          }
          // @ts-ignore
          const containerOffsetLeft = wrapper.offsetLeft;

          // Get x-coordinate of pointer relative to container
          // @ts-ignore
          const pointerRelativeXpos = e.clientX - containerOffsetLeft;

          // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
          const boxAminWidth = 60;

          // Resize box A
          // * 8px is the left/right spacing between .handler and its inner pseudo-element
          // * Set flex-grow to 0 to prevent it from growing
          // @ts-ignore
          boxA.style.width = (Math.max(boxAminWidth, pointerRelativeXpos - 1)) + 'px';
          console.log(boxA);
          console.log(boxA);
          // @ts-ignore
          boxA.style.flexGrow = 0;
        });
    this.subscription2 =
      fromEvent(document, 'mousedown')
        .subscribe(e => {
          this.isHandlerDragging = e.target === handler;
        });
    this.subscription3 =
      fromEvent(document, 'mouseup').subscribe(data => {
        this.isHandlerDragging = false;
      });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }

  readyTimeList() {
    for (let i = 0; i < 24; i++) {
      let hour;
      if (i.toString().length < 2) {
        hour = `0${i}`;
      } else {
        hour = `${i}`;
      }
      this.hoursList.push(hour);
    }
    for (let i = 0; i < 60; i++) {
      let minute;
      if (i.toString().length < 2) {
        minute = `0${i}`;
      } else {
        minute = `${i}`;
      }
      this.minutesList.push(minute);
    }
  }

  getExpirationTime() {
    this.reportService.getExpirationTime(this.id).subscribe(data => {
      this.expirationTime = data;
      if (data.second < 0) {
        this.expirationTime = {day: 0, hour: 0, minute: 0, second: 0};
      }
    }, error => {
      console.error(error);
    });
  }


  getReportInfo(firstInit?: boolean) {
    if (!firstInit) {
      firstInit = false;
    }
    this.reportService.getById(this.id).subscribe(async data => {
      this.report = data;
      console.log(data);
      this.pageLoaded = true;
      if (firstInit) {
        await this.divideTime();
      }
    }, error => {
      console.error(error);
    });
  }

  choseDates(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: this.report,
      closeOnBackdropClick: false,
    });
  }

  changed() {
    this.isLoading = true;
    this.updateRequest();
  }

  updateRequest() {
    this.reportService.updateReport(this.report).toPromise().then(response => {
      console.log(response);
      this.isLoading = false;
    }).catch(error => {
      this.getReportInfo(false);
      this.isLoading = false;
    }).finally(() => this.isLoading = false);
  }

  openMatClassifier(report: any) {
    const dialogRef = this.matDialog.open(MaterialClassifierDialogComponent, {
      data: report,
      panelClass: 'additional-info-modal',
      backdropClass: 'material-classifier-dialog-class',
      height: '90vh',
      width: '90vw',
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

  changeGenerateDays(ref: any) {
    this.isLoading = true;
    if (this.report) {
      this.report.timeOfPublication = `${this.reportHours}:${this.reportMinutes}`;
    }
    this.updateRequest();
    ref.close();
  }

  cancelTime(ref: any) {
    this.getReportInfo(true);
    ref.close();
  }


  afterLoadComplete(pdf: any) {
    this.pdf = pdf;
    for (let i = 1; i < pdf.numPages; i++) {
      const pageObject = {pageNumber: i};
      this.pdfPagesList.push(pageObject);
    }
  }

  goToPdfPage(pdfPage: any) {
    this.page = pdfPage.pageNumber;
  }

  updatePublicate(b: boolean) {
    this.report.publicate = b;
    this.updateRequest();
  }
}
