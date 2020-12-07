import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContractorService {
  fullUrl = environment.apiUrl + '/api/contractor';

  constructor(private http: HttpClient) { }
  public getAll() {
    return this.http.get<any>(this.fullUrl + '/findAll');
  }

  public getByCategoryId(id: any) {
    return this.http.get<any>(this.fullUrl + '/category', {
      params: {
        id,
      },
    });
  }

  public addNewContractor(object: any) {
    return this.http.post<any>(this.fullUrl + '/add', object);
  }

  // public getByReportId(id: any) {
  //   return this.http.get<any>(this.fullUrl + '/report', {
  //     params: {
  //       id,
  //     },
  //   });
  // }
}
