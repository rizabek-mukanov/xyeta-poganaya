import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  fullUrl = environment.apiUrl + '/api/reports';

  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get<any>(this.fullUrl + '/findAll/V2');
  }

  public getById(id: any) {
    return this.http.get<any>(this.fullUrl, {
      params: {
        id,
      },
    });
  }

  public getPdfPath(id: any) {
    return this.http.get<any>(this.fullUrl + '/last/file?id=' + id);
  }

  public updateReport(report: any) {
    return this.http.put<any>(this.fullUrl + '/update', report);
  }
  public getExpirationTime(id: any) {
    return this.http.get<any>(this.fullUrl + '/expiration', {
      params: {
        id,
      },
    });
  }
  // getExpirationTime(id: number) {
  //   return this.http.get<any>(this.fullUrl + '/expiration', {
  //     params: {
  //       id,
  //     },
  //   });
  // }
  addCategoriesList(categories: any[], id: number) {
    return this.http.put<any>(this.fullUrl + `/update/categoryList?id=${id}`, categories);
  }
}
