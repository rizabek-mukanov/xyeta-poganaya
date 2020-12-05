import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CounterPartiesRoutingModule} from './counter-parties-routing.module';
import {CounterPartiesComponent} from './counter-parties.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbToggleModule} from '@nebular/theme';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {AdditionalInfoDialogComponent} from './dialog/additional-info-dialog/additional-info-dialog.component';
import {AdditionalInfoMatDialogComponent} from './dialog/additional-info-mat-dialog/additional-info-mat-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReportSettingsComponent} from './dialog/report-settings/report-settings.component';
import {ReportSettingsMatDialogComponent} from './dialog/report-settings-mat-dialog/report-settings-mat-dialog.component';


@NgModule({
  declarations: [CounterPartiesComponent,
    AdditionalInfoDialogComponent,
    AdditionalInfoMatDialogComponent,
    ReportSettingsComponent,
    ReportSettingsMatDialogComponent,
  ],
  imports: [
    CommonModule,
    CounterPartiesRoutingModule,
    NbCardModule,
    MatTableModule,
    NbButtonModule,
    NbToggleModule,
    MatDialogModule,
    FormsModule,
    NbInputModule,
    NbIconModule,
  ],
  entryComponents: [AdditionalInfoDialogComponent, AdditionalInfoMatDialogComponent],
})
export class CounterPartiesModule {
}
