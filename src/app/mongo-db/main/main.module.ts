import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {NbCardModule, NbInputModule, NbSpinnerModule} from '@nebular/theme';
import {CivilComponent} from './civil/civil.component';
import {CountryComponent} from './country/country.component';
import {TrudaComponent} from './truda/truda.component';
import {SaldoOtherComponent} from './saldo-other/saldo-other.component';
import {SaldoSngComponent} from './saldo-sng/saldo-sng.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [MainComponent, CivilComponent, CountryComponent,
    TrudaComponent, SaldoOtherComponent, SaldoSngComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    NbInputModule,
    FormsModule,
  ],
})
export class MainModule {
}
