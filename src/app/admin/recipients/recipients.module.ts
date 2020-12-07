import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipientsRoutingModule } from './recipients-routing.module';
import { RecipientsComponent } from './recipients.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbListModule} from '@nebular/theme';
import {MatDialogModule} from '@angular/material/dialog';
import { AdditionalInfoDialogComponent } from './dialog/additional-info-dialog/additional-info-dialog.component';
import {MatTableModule} from '@angular/material/table';
import { EditInfoDialogComponent } from './dialog/edit-info-dialog/edit-info-dialog.component';
import { AddInfoDialogComponent } from './dialog/add-info-dialog/add-info-dialog.component';
import { DeleteInfoDialogComponent } from './dialog/delete-info-dialog/delete-info-dialog.component';
import { NewCategoryDialogComponent } from './dialog/new-category-dialog/new-category-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [RecipientsComponent, AdditionalInfoDialogComponent, EditInfoDialogComponent, AddInfoDialogComponent, DeleteInfoDialogComponent, NewCategoryDialogComponent],
  imports: [
    CommonModule,
    RecipientsRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbListModule,
    MatDialogModule,
    NbInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
})
export class RecipientsModule { }
