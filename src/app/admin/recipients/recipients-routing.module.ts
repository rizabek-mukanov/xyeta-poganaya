import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecipientsComponent} from './recipients.component';

const routes: Routes = [
  {
    path: ':id',
    component: RecipientsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipientsRoutingModule {
}
