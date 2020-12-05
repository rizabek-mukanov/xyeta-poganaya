import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main.component';
import {CivilComponent} from './civil/civil.component';
import {SaldoOtherComponent} from './saldo-other/saldo-other.component';
import {SaldoSngComponent} from './saldo-sng/saldo-sng.component';
import {TrudaComponent} from './truda/truda.component';
import {CountryComponent} from './country/country.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'civil',
    component: CivilComponent,
  },
  {
    path: 'country',
    component: CountryComponent,
  },
  {
    path: 'truda',
    component: TrudaComponent,
  },
  {
    path: 'saldo-sng',
    component: SaldoSngComponent,
  },
  {
    path: 'saldo-other',
    component: SaldoOtherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
}
