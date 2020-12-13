import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {publicDecrypt} from 'crypto';

@Injectable({
  providedIn: 'root',
})
export class ContractorService {
  fullUrl = environment.apiUrl + '/api/companies';

  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get<any>(this.fullUrl + '/all');
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

  public updateContractor(object: any) {
    return this.http.put<any>(this.fullUrl + '/update', object);
  }

  // public deleteContractor(id: any) {
  //   return this.http.delete(this.fullUrl + `/delete`;
  //   });
  // }
  // public deleteContractor(id: number) {
  //   return this.http.delete<any>(this.fullUrl + `/delete?id=${id}`);
  // }


  // public addNewContractor(object: any) {
  //   return this.http.post<any>(this.fullUrl + '/add', object);
  // }
  // public getByReportId(id: any) {
  //   return this.http.get<any>(this.fullUrl + '/report', {
  //     params: {
  //       id,
  //     },
  //   });
  // }
}
