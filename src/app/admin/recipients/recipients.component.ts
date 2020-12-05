import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AdditionalInfoDialogComponent} from './dialog/additional-info-dialog/additional-info-dialog.component';
import {NewCategoryDialogComponent} from './dialog/new-category-dialog/new-category-dialog.component';

@Component({
  selector: 'ngx-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss'],
})
export class RecipientsComponent implements OnInit {
  id: number;
  recipients: any = [];
  chosenRecipients: any = [];

  constructor(private activateRoute: ActivatedRoute,
              public matDialog: MatDialog,
              private router: Router) {
    this.id = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    for (let i = 1; i < 10; i ++) {
      const recipient = {id: i, name: `Категория ${i}`};
      this.recipients.push(recipient);
    }
  }

  goToInfo(recipient: any) {
    const dialogRef = this.matDialog.open(AdditionalInfoDialogComponent, {
      data: recipient,
      panelClass: 'additional-info-modal',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  deleteChosen(chosenRecipient: any) {
    console.log('delete');
    console.log(chosenRecipient);
    this.chosenRecipients.splice(chosenRecipient, 1);
    this.recipients.push(chosenRecipient);
  }

  addToChosen(recipient: any) {
    console.log(recipient);
    this.recipients.splice(recipient, 1);
    this.chosenRecipients.push(recipient);
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
