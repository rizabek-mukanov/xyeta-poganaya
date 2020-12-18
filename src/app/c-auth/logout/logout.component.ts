import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../@core/services/auth.service';
import { NbThemeService } from '@nebular/theme';

@Component({
  template: '',
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private themeService: NbThemeService) {
    this.themeService.changeTheme('dark');
    this.authService.logout();
  }
  ngOnInit() {
  }
}
