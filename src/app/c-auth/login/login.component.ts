import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthService, NbLoginComponent} from '@nebular/auth';
import {Router} from '@angular/router';
import {AuthService} from '../../@core/services/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent {
  loading: boolean;
  errors = [];

  constructor(service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options,
              cd: ChangeDetectorRef, router: Router,
              private authService: AuthService
  ) {
    super(service, options, cd, router);
  }


  login(): void {
    this.loading = true;
    this.errors = [];
    this.authService.login(this.user.email, this.user.password).toPromise()
      .then(response => {
        this.authService.authorize(response);
        this.loading = false;
      }).catch(error => {
      this.errors.push(error);
      this.authService.authFail();
      this.loading = false;
    }).finally(() => this.loading = false);
    // this.loading = true;
    // this.authService.login(this.user.email, this.user.password)
    //   .toPromise()
    //   .then(res => {
    //     this.authService.authorize(res);
    //     this.loading = false;
    //   }).catch((err) => {
    //   this.loading = false;
    //   console.log(err);
    //   // this.toastr.danger('Логин или пароль введен неверно');
    //   this.authService.authFail();
    // });
  }

}
