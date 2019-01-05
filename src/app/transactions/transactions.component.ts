import { Component, OnInit, Input } from '@angular/core';
import { ContentComponent } from '../content-interface';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements ContentComponent {
  @Input() data: any;

  constructor() { }

  getCodeName(): string {
    return 'trnslkp';
  }
}
