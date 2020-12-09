import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MaterialCatalogService {
  fullUrl = environment.apiUrl + '/api/material/catalog';

  constructor(private http: HttpClient) {
  }

  public getAllOtdels() {
    return this.http.get<any>(this.fullUrl + '/otdel');
  }

  public getAllSubOtdels(id: any) {
    return this.http.get<any>(this.fullUrl + '/otdel/sub?mcOwner=' + id);
  }
}
