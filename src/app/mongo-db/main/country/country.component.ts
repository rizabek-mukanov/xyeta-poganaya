import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../@core/data/smart-table';
import {MongoService} from '../../../@core/services/mongo.service';

@Component({
  selector: 'ngx-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
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
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'string',
        filter: false,
      },
      Code: {
        title: 'Code',
        type: 'string',
        filter: false,
      },
      NameKaz: {
        title: 'NameKaz',
        type: 'string',
        filter: false,
      },
      NameRus: {
        title: 'NameRus',
        type: 'string',
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  loading: boolean = false;
  search: any;

  constructor(
    private mongoService: MongoService) {
  }

  onDeleteConfirm(event): void {
    console.log(event.data);
    if (window.confirm('Вы уверены, что хотите удалить?')) {
      this.loading = true;
      this.mongoService.deleteCountry(event.data).subscribe(resp => {
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
    this.fetchAll();
    this.readySearch();
  }

  readySearch() {
    this.search = {code: '', NameKaz: '', NameRus: ''};
  }

  fetchAll(key?: string, val?: string) {
    this.loading = true;
    this.mongoService.getCountries(key, val).subscribe(resp => {
      console.log(resp);
      this.source.load(resp);
      this.loading = false;
      // this.source.setFilter([{field: 'Code', search: 'AF'}]);
    }, error => {
      this.loading = false;
    });
  }

  onCreateConfirm(event) {
    this.loading = true;
    this.mongoService.saveCountry(event.newData).subscribe(response => {
      event.confirm.resolve(response);
      this.loading = false;
    }, error => {
      console.error(error);
      event.confirm.reject();
      this.loading = false;
    });
  }

  onSaveConfirm(event) {
    this.loading = true;
    this.mongoService.updateCountry(event.newData, event.data.id).subscribe(response => {
      event.confirm.resolve(response);
      this.loading = false;
    }, error => {
      console.error(error);
      event.confirm.reject();
      this.loading = false;
    });
  }

  // searchFilter() {
  //   console.log(this.search);
  //   if (this.search.NameRus !== '') {
  //     this.fetchAll('NameRus', this.search.NameRus);
  //   }
  //   if (this.search.Code !== '') {
  //     console.log(this.search.code);
  //     this.fetchAll('Code', this.search.Code);
  //   }
  //   if (this.search.NameKaz !== '') {
  //     this.fetchAll('NameKaz', this.search.NameKaz);
  //   }
  //
  // }

  searchCode() {
    if (this.search.code !== '') {
      this.fetchAll('Code', this.search.code);
    } else {
      this.fetchAll();
    }
  }
  searchNameKaz() {
    if (this.search.NameKaz !== '') {
      this.fetchAll('NameKaz', this.search.NameKaz);
    } else {
      this.fetchAll();
    }
  }
  searchNameRus() {
    if (this.search.NameRus !== '') {
      this.fetchAll('NameRus', this.search.NameRus);
    } else {
      this.fetchAll();
    }
  }
}
