import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {NbDialogService} from '@nebular/theme';
import {MatDialog} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ThemePalette} from '@angular/material/core';

import {AdditionalInfoMatDialogComponent} from './dialog/additional-info-mat-dialog/additional-info-mat-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {PublicationsService} from '../../@core/services/publications.service';
import {ReportService} from '../../@core/services/report.service';

@Component({
  selector: 'ngx-counter-parties',
  templateUrl: './counter-parties.component.html',
  styleUrls: ['./counter-parties.component.scss'],
})
export class CounterPartiesComponent implements OnInit {
  color: ThemePalette = 'primary';
  checked: false;
  dataSource: any;
  displayedColumns: string[] = ['image', 'createdAt', 'sendAt', 'status', 'receivers', 'autoSend', 'sendBtn'];
  fileUrl = 'assets/pdf.jpeg';
  id: number;
  report: any;
  constructor(private dialogService: NbDialogService,
              public matDialog: MatDialog,
              public matSlideToggle:MatSlideToggleModule,
              private activateRoute: ActivatedRoute,
              private publicationsService: PublicationsService,
              private reportService: ReportService) {
    this.id = this.activateRoute.snapshot.params['id'];
  }


  ngOnInit(): void {
    console.log(this.id);
    this.getPublications();
    this.getReport();
    // this.dataSource = [
    //   {
    //     id: 1,
    //     createdAt: '2020-01-01 20:20',
    //     sendAt: '2020-01-01 19:20',
    //     imageUrl: 'logo_1586934758886.jpg',
    //     status: 1,
    //     counterParties: ['Тоо', 'Vtoroe TOO'],
    //     autoSend: true,
    //   },
    //   {
    //     id: 2,
    //     createdAt: '2020-01-01 20:20',
    //     sendAt: '2020-01-01 19:20',
    //     imageUrl: 'logo_1586928827748.jpg',
    //     status: 0,
    //     counterParties: ['Тоо'],
    //     autoSend: false,
    //   }];
  }

  getReport() {
    this.reportService.getById(this.id).subscribe( data => {
      this.report = data;
    });
  }
  getPublications() {
    this.publicationsService.getById(this.id).subscribe(response => {
      console.log(response);
      this.dataSource = response;
    }, error => {
      console.log(error);
    });
  }

  openAdditionInfoMatDialog(report: any) {
    console.log(report);
    const dialogRef = this.matDialog.open(AdditionalInfoMatDialogComponent, {
      data: this.id,
      panelClass: 'additional-info-modal',
      width: '100vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  changed(report: any) {
    console.log(report);
  }

  // openReportSettingsDialog2() {
  //   const dialogRef = this.matDialog.open(ReportSettingsMatDialogComponent, {
  //     data: this.id,
  //     panelClass: 'report-settings-modal',
  //     width: '1800px',
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //   });
  // }
  sendPublication(report: any) {
    this.publicationsService.sendEmailToCompanies(report.id).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }
}
