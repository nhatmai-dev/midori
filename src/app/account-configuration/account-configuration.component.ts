import { Component, OnInit, Input } from '@angular/core';
import { ContentComponent } from '../content-interface';

@Component({
  selector: 'app-account-configuration',
  templateUrl: './account-configuration.component.html',
  styleUrls: ['./account-configuration.component.css']
})
export class AccountConfigurationComponent implements ContentComponent {
  @Input() data: any;

  constructor() { }

  getCodeName(): string {
    return 'accncnfg';
  }
}
