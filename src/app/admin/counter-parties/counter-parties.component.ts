import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {NbDialogService} from '@nebular/theme';
import {MatDialog} from '@angular/material/dialog';
import {AdditionalInfoMatDialogComponent} from './dialog/additional-info-mat-dialog/additional-info-mat-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {ReportSettingsComponent} from './dialog/report-settings/report-settings.component';
import {PublicationsService} from '../../@core/services/publications.service';

@Component({
  selector: 'ngx-counter-parties',
  templateUrl: './counter-parties.component.html',
  styleUrls: ['./counter-parties.component.scss'],
})
export class CounterPartiesComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['image', 'createdAt', 'sendAt', 'status', 'receivers', 'autoSend', 'sendBtn'];
  fileUrl = environment.imageUrl;
  id: number;
  report: any;

  constructor(private dialogService: NbDialogService,
              public matDialog: MatDialog,
              private activateRoute: ActivatedRoute,
              private publicationsService: PublicationsService) {
    this.id = this.activateRoute.snapshot.params['id'];
  }


  ngOnInit(): void {
    console.log(this.id);
    this.getPublications();
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

  getPublications() {
    this.publicationsService.getById(this.id).subscribe(response => {
      this.report = response;
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
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  changed(report: any) {
    console.log(report);
  }

  openReportSettingsDialog() {
    this.dialogService.open(ReportSettingsComponent, {
      context: {
        id: this.id,
      },
      dialogClass: 'report-settings-modal',
    }).onClose.subscribe(response => {
      console.log(response);
    });
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
}
