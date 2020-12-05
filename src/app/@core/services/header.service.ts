import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  headers = new HttpHeaders({
    'Authorization': environment.tokenPrefix + this.authService.getToken(),
  });

  constructor(private authService: AuthService
  ) {
  }
}
