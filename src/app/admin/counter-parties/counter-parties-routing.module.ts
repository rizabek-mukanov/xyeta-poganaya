import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CounterPartiesComponent} from './counter-parties.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: CounterPartiesComponent,
  // },
  {
    path: ':id',
    component: CounterPartiesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CounterPartiesRoutingModule {
}
