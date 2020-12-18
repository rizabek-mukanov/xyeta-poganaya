import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class MaterialListService {
    fullUrl = environment.apiUrl + '/api/materialList';

    constructor(private http: HttpClient) {
    }

    public postMaterialsUseFilter(list: any) {
        return this.http.post<any>(this.fullUrl + '/useFilter', list);
    }

    public getAll() {
        return this.http.get<any>(this.fullUrl + '/all');
    }
}
