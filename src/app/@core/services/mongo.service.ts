import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MongoService {
  fullUrl = 'http://10.110.160.50:8890/api';
  civilUrl = this.fullUrl + '/civil';
  countryUrl = this.fullUrl + '/country';
  mintrudaUrl = this.fullUrl + '/mintruda';
  saldootherUrl = this.fullUrl + '/saldoother';
  saldosngUrl = this.fullUrl + '/saldosng';

  constructor(private http: HttpClient) {

  }

  public getTotalSaldo() {
    return this.http.get<any>(this.saldootherUrl + '/sum/count');
  }

  public getCiVil(): Observable<any> {
    return this.http.get<any>(this.civilUrl);
  }

  public getCountries(key?: string, value?: string): Observable<any> {
    if (!key || key === '') {
      key = '';
    }
    if (!value || value === '') {
      value = '';
    }
    if (value === undefined) {
      key = '';
      value = '';
    }

    return this.http.get<any>(this.countryUrl, {
      params: {
        searchVal: value,
        searchKey: key,
      },
    });
  }

  public getMinTruda(): Observable<any> {
    return this.http.get<any>(this.mintrudaUrl);
  }

  public getSaldoOther(): Observable<any> {
    return this.http.get<any>(this.saldootherUrl);
  }

  public getSaldoSng(): Observable<any> {
    return this.http.get<any>(this.saldosngUrl);
  }

  public saveCivil(object) {
    return this.http.post(this.civilUrl, object);
  }

  public saveCountry(object) {
    return this.http.post(this.countryUrl, object);
  }

  public saveMinTruda(object) {
    return this.http.post(this.mintrudaUrl, object);
  }

  public saveSaldoOther(object) {
    return this.http.post(this.saldootherUrl, object);
  }

  public saveSaldoSng(object) {
    return this.http.post(this.saldosngUrl, object);
  }

  public updateCivil(object, id) {
    return this.http.put(`${this.civilUrl}/${id}`, object);
  }

  public updateCountry(object, id) {
    console.log(object);
    return this.http.put(`${this.countryUrl}/${id}`, object);
  }

  public updateMinTruda(object, id) {
    return this.http.put(`${this.mintrudaUrl}/${id}`, object);
  }

  public updateSaldoOther(object, id) {
    return this.http.put(`${this.saldootherUrl}/${id}`, object);
  }

  public updateSaldoSng(object, id) {
    return this.http.put(`${this.saldosngUrl}/${id}`, object);
  }

  public deleteCivil(object) {
    return this.http.delete(`${this.civilUrl}/${object.id}`);
  }

  public deleteCountry(object) {
    return this.http.delete(`${this.countryUrl}/${object.id}`);
  }

  public deleteMinTruda(object) {
    return this.http.delete(`${this.mintrudaUrl}/${object.id}`);
  }

  public deleteSaldoOther(object) {
    return this.http.delete(`${this.saldootherUrl}/${object.id}`);
  }

  public deleteSaldoSng(object) {
    return this.http.delete(`${this.saldosngUrl}/${object.id}`);
  }
}
