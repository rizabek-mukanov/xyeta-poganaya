import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MongoDbRoutingModule } from './mongo-db-routing.module';
import { MongoDbComponent } from './mongo-db.component';
import {ThemeModule} from '../@theme/theme.module';
import {NbMenuModule} from '@nebular/theme';


@NgModule({
  declarations: [MongoDbComponent],
  imports: [
    CommonModule,
    MongoDbRoutingModule,
    ThemeModule,
    NbMenuModule,
  ],
})
export class MongoDbModule { }
