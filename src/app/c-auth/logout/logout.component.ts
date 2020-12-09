import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../@core/services/auth.service';

@Component({
  template: '',
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
    this.authService.logout();
  }
  ngOnInit() {
    console.log('dsad');
  }
}
