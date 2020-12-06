import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AdditionalInfoDialogComponent} from './dialog/additional-info-dialog/additional-info-dialog.component';
import {NewCategoryDialogComponent} from './dialog/new-category-dialog/new-category-dialog.component';
import {CategoryService} from '../../@core/services/category.service';

@Component({
  selector: 'ngx-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss'],
})
export class RecipientsComponent implements OnInit {
  id: number;
  categories: any = [];
  chosenCategories: any = [];

  constructor(private activateRoute: ActivatedRoute,
              public matDialog: MatDialog,
              private router: Router,
              private categoryService: CategoryService) {
    this.id = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getChosenCategories();
  }

  async getCategories() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response;
      for (let i = 0; i <  this.categories.length; i++ ) {
        if (this.chosenCategories.some(chosenCategory => chosenCategory.id ===  this.categories[i].id)) {
          this.categories.splice(i, 1);
        }
      }
      // response.forEach(element => {
      //   if (this.chosenCategories.some(chosenCategory => chosenCategory.id === element.id)) {
      //     console.log('я там есть');
      //   } else {
      //     this.categories.push(element);
      //   }
      // });
    }, error => {
      console.error(error);
    });
  }

  async getChosenCategories() {
    this.categoryService.getByReportId(this.id).subscribe(async response => {
      this.chosenCategories = response;
      await this.getCategories();
    }, error => {
      console.error(error);
    });
  }

  goToInfo(category: any) {
    const dialogRef = this.matDialog.open(AdditionalInfoDialogComponent, {
      data: category,
      panelClass: 'additional-info-modal',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  deleteChosen(chosenCategory: any, i: any) {
    this.chosenCategories.splice(i, 1);
    this.categories.push(chosenCategory);
  }

  addToChosen(category: any, i: any) {
    this.categories.splice(i, 1);
    this.chosenCategories.push(category);
  }

  addNewCategory() {
    const newCategoryDialog = this.matDialog.open(NewCategoryDialogComponent, {
      data: this.id,
      panelClass: 'additional-info-modal',
    });
    newCategoryDialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  saveAndReturn() {
    console.log('save and return');
    this.router.navigateByUrl(`/admin/report-settings/${this.id}`);
  }
}
