import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {environment} from '../../../environments/environment';
import {ReportService} from '../../@core/services/report.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dataSource: any;
  fileUrl = environment.imageUrl;
  displayedColumns: string[] = ['image', 'name', 'amount', 'status', 'dates'];

  constructor(private reportService: ReportService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.reportService.getAll().subscribe( response => {
      console.log(response);
      this.dataSource = response;
    }, error => {
      console.error(error);
    });
      // this.dataSource = [
      // {
      //   id: 1,
      //   name: 'Наименование отчета',
      //   imageUrl: 'logo_1586937607102.jpg',
      //   status: 'Отправлено 5/8',
      //   count: 5,
      //   dates: '5,6,8,10',
      // }];
  }

  test(row: any) {
    this.router.navigateByUrl(`/admin/counter-parties/${row.id}`);
  }
}
