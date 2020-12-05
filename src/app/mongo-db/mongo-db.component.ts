import {Component, OnInit} from '@angular/core';
import {MENU_ITEMS} from './mongo-db-menu';

@Component({
  selector: 'ngx-mongo-db',
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
  styleUrls: ['./mongo-db.component.scss'],
})
export class MongoDbComponent {

  menu = MENU_ITEMS;


}
