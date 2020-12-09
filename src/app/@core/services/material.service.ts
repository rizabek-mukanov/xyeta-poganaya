import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  fullUrl = environment.apiUrl + '/api/material';

  constructor(private http: HttpClient) {
  }

  public getAllMaterials(id: any) {
    return this.http.get<any>(this.fullUrl + '/owner?mtOwner=' + id);
  }
}
