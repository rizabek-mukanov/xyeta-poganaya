import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PublicationsService {
  fullUrl = environment.apiUrl + '/api/publications';

  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get<any>(this.fullUrl + '/findAll');
  }

  public getById(id: any) {
    return this.http.get<any>(this.fullUrl + '/report', {
      params: {
        id,
      },
    });
  }

  public sendEmailToCompanies(id: any) {
    return this.http.get<any>(this.fullUrl + '/send/email', {
      params: {
        id,
      },
    });
  }
}
