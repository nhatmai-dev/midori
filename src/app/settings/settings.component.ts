import { Component, OnInit, Input } from '@angular/core';
import { ContentComponent } from '../content-interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements ContentComponent {
  @Input() data: any;

  constructor() { }

  getCodeName(): string {
    return 'sttn';
  }
}
