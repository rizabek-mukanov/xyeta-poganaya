import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  fullUrl = environment.apiUrl + '/api/category';

  constructor(private http: HttpClient) { }
  public getAll() {
    return this.http.get<any>(this.fullUrl + '/findAll');
  }

  public getById(id: any) {
    return this.http.get<any>(this.fullUrl + '/report/v2', {
      params: {
        id,
      },
    });
  }
}
