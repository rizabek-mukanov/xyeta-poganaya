import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  fullUrl = environment.apiUrl + '/api/categories';

  constructor(private http: HttpClient) { }
  public getAll() {
    return this.http.get<any>(this.fullUrl + '/all');
  }

  public getById(id: any) {
    return this.http.get<any>(this.fullUrl + '/report/v2', {
      params: {
        id,
      },
    });
  }

  public getByReportId(id: any) {
    return this.http.get<any>(this.fullUrl + '/report', {
      params: {
        id,
      },
    });
  }

  public addNewCategoryWithContractor(object: any) {
    return this.http.post<any>(this.fullUrl + '/add/with/contractors', object);
  }

  public deleteCategory(id: number) {
    return this.http.delete<any>(this.fullUrl + `/delete?id=${id}`);
  }

  public editCategory(object: any) {
    return this.http.put<any>(this.fullUrl + '/update', object);

  }

  addNew(category: any) {
    return this.http.post<any>(this.fullUrl + '/add', category);
  }
}
