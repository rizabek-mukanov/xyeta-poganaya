/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from './@core/utils/analytics.service';
import {SeoService} from './@core/utils/seo.service';
import {NbThemeService} from '@nebular/theme';
import {AuthService} from './@core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private seoService: SeoService,
              private themeService: NbThemeService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.themeService.changeTheme('dark');
    // if (!this.authService.getToken()) {
    //   this.router.navigate(['auth']);
    // } else {
    //   this.router.navigate(['admin']);
    // }
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
