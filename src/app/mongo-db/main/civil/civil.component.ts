import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../@core/data/smart-table';
import {MongoService} from '../../../@core/services/mongo.service';

@Component({
  selector: 'ngx-civil',
  templateUrl: './civil.component.html',
  styleUrls: ['./civil.component.scss'],
})
export class CivilComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
      confirmEdit: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'Id',
        type: 'string',
      },
      AddressKaz: {
        title: 'Адрес на Казахском',
        type: 'string',
      },
      AddressRus: {
        title: 'Адрес на Русском',
        type: 'string',
      },
      Code: {
        title: 'Code',
        type: 'string',
      },
      CodeInPsc: {
        title: 'CodeInPsc',
        type: 'string',
      },
      NameKaz: {
        title: 'NameKaz',
        type: 'string',
      },
      NameRus: {
        title: 'NameRus',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  data: any;
  loading: boolean = false;
  totalAmount: number;

  constructor(private service: SmartTableData,
              private mongoService: MongoService) {
  }

  onDeleteConfirm(event): void {
    console.log(event.data);
    if (window.confirm('Вы уверены, что хотите удалить?')) {
      this.loading = true;
      this.mongoService.deleteCivil(event.data).subscribe(resp => {
        console.log(resp);
        event.confirm.resolve();
        this.loading = false;
      }, error => {
        event.confirm.reject();
        this.loading = false;
      });
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit(): void {
    this.mongoService.getCiVil().subscribe(resp => {
      console.log(resp);
      this.source.load(resp);
    });
  }

  onSaveConfirm(event) {
    this.loading = true;
    this.mongoService.updateCivil(event.newData, event.data.id).subscribe(response => {
      console.log(response);
      event.confirm.resolve(response);
      this.loading = false;
    }, error => {
      console.error(error);
      event.confirm.reject();
      this.loading = false;
    });
  }

  onCreateConfirm(event) {
    this.loading = true;
    this.mongoService.saveCivil(event.newData).subscribe(response => {
      event.confirm.resolve(response);
      this.loading = false;
    }, error => {
      console.error(error);
      event.confirm.reject();
      this.loading = false;
    });
  }
}
