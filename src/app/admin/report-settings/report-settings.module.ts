import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReportSettingsRoutingModule} from './report-settings-routing.module';
import {ReportSettingsComponent} from './report-settings.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbToggleModule,
} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {MaterialClassifierDialogComponent} from './dialog/material-classifier-dialog/material-classifier-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MaterialsDialogComponent } from './dialog/materials-dialog/materials-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [ReportSettingsComponent,
    MaterialClassifierDialogComponent,
    MaterialsDialogComponent],
  imports: [
    CommonModule,
    ReportSettingsRoutingModule,
    NbCardModule,
    NbIconModule,
    NbToggleModule,
    MatDialogModule,
    NbButtonModule,
    FormsModule,
    NbSelectModule,
    MatFormFieldModule,
    MatSelectModule,
    NbInputModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class ReportSettingsModule {
}
