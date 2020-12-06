import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss'],
})
export class PdfViewComponent implements OnInit {
  pdfSrc = 'http://10.110.160.50:8887/api/generate/pdf/pdf-18-15-51.pdf';

  constructor() {
  }

  ngOnInit(): void {

  }

}
