import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CAuthRoutingModule} from './c-auth-routing.module';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule, NbSpinnerModule,
  NbToastrService,
} from '@nebular/theme';
import {NbAuthModule} from '@nebular/auth';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    CAuthRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule,
    NbIconModule,
    NbSpinnerModule,
  ],
  providers: [NbToastrService],
})
export class CAuthModule {
}
