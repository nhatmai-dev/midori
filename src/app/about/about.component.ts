import { Component, OnInit, Input } from '@angular/core';
import { ContentComponent } from '../content-interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements ContentComponent {
  @Input() data: any;

  constructor() { }

  getCodeName(): string {
    return 'abt';
  }
}
