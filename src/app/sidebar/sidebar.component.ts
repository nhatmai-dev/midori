import { Component, OnInit, Input } from '@angular/core';
import { ContentLoaderComponent } from '../content-loader/content-loader.component';
import { ContentItem } from '../content-item';
import { CONTENT_ITEMS } from '../content-item-lists';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() contentLoader: ContentLoaderComponent;
  items = CONTENT_ITEMS;
  selectedItem: ContentItem;

  // constructor(private contentLoaderComponent: ContentLoaderComponent) { }
  constructor() { }

  selectItem(item: ContentItem) {
    this.selectedItem = item;
    this.contentLoader.loadComponent(item.codename);
  }

}
