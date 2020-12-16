import { Component, ElementRef, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';
import { MaterialClassifierDialogComponent } from './dialog/material-classifier-dialog/material-classifier-dialog.component';
import { ReportService } from '../../@core/services/report.service';
import { fromEvent, interval, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

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
    pdfSrc: string = '';
    pdf: any;
    page: 1;
    pdfPagesList: any = [];
    isLoading = false;
    expirationTime: any;
    expirationTimeDate: any;
    subscription: Subscription;
    subscription2: Subscription;
    subscription3: Subscription;
    isHandlerDragging: boolean = false;


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
        // this.testSubscribe();
    }

    // testSubscrive() {
    //     const resizer = document.getElementById('dragMe');
    //     const leftSide = resizer.previousElementSibling;
    //     const rightSide = resizer.nextElementSibling;
    //     let x = 0;
    //     let y = 0;
    //     let leftWidth = 0;
    //     const mouseDownHandler = function(e) {
    //         // Get the current mouse position
    //         x = e.clientX;
    //         y = e.clientY;
    //         leftWidth = leftSide.getBoundingClientRect().width;
    //
    //         // Attach the listeners to `document`
    //         document.addEventListener('mousemove', mouseMoveHandler);
    //         document.addEventListener('mouseup', mouseUpHandler);
    //     };
    // }

    // testSubscribe() {
    //
    //     const handler = document.querySelector('.handler');
    //     const wrapper = handler.closest('.wrapper');
    //     const boxA = wrapper.querySelector('.box');
    //
    //     this.subscription =
    //         fromEvent(document, 'mousemove')
    //             .subscribe(e => {
    //                 if (!this.isHandlerDragging) {
    //                     return false;
    //                 }
    //
    //                 // @ts-ignore
    //                 const containerOffsetLeft = wrapper.offsetLeft;
    //
    //                 // @ts-ignore
    //                 const pointerRelativeXpos = e.clientX - containerOffsetLeft;
    //
    //                 // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
    //                 const boxAminWidth = 60;
    //
    //                 // Resize box A
    //                 // * 8px is the left/right spacing between .handler and its inner pseudo-element
    //                 // * Set flex-grow to 0 to prevent it from growing
    //                 // @ts-ignore
    //                 boxA.style.width = (Math.max(boxAminWidth, pointerRelativeXpos - 1)) + 'px';
    //                 // @ts-ignore
    //                 boxA.style.flexGrow = 0;
    //             });
    //     this.subscription2 =
    //         fromEvent(document, 'mousedown')
    //             .subscribe(e => {
    //                 this.isHandlerDragging = e.target === handler;
    //             });
    //     this.subscription3 =
    //         fromEvent(document, 'mouseup').subscribe(data => {
    //             this.isHandlerDragging = false;
    //         });
    // }


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
            console.log(data);
            // data = {second: 10, minute: 30, hour: 23, day: 1};
            this.expirationTime = data;
            if (data.second < 0 || data.minute < 0 || data.hour < 0 || data.day < 0) {
                this.expirationTime = {day: '00', hour: '00', minute: '00', second: '00'};
            } else {
                const date = new Date();
                date.setDate(data.day);
                date.setHours(data.hour);
                date.setMinutes(data.minute);
                date.setSeconds(data.second);
                interval(1000).subscribe(() => {
                    date.setSeconds(date.getSeconds() - 1);
                    this.expirationTime = {
                        day: date.getDate(),
                        hour: date.getHours(),
                        minute: date.getMinutes(),
                        second: date.getSeconds(),
                    };
                });
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
            // this.pdfSrc = environment.apiUrl + '/api/pdf/' + data.fileName;
            // this.pdfSrc = 'http://localhost:9090/api/pdf/pdf-18-44-46.pdf';
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
