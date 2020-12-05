import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';
import {NotFoundComponent} from '../pages/miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module')
        .then(m => m.DashboardModule),
    },
    {
      path: 'counter-parties',
      loadChildren: () => import('./counter-parties/counter-parties.module')
        .then(m => m.CounterPartiesModule),
    },
    {
      path: 'report-settings',
      loadChildren: () => import('./report-settings/report-settings.module')
        .then(m => m.ReportSettingsModule),
    },
    {
      path: 'recipients',
      loadChildren: () => import('./recipients/recipients.module')
        .then(m => m.RecipientsModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
    ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
