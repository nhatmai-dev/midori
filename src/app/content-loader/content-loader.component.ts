import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { componentFactoryName } from '@angular/compiler';
import { ContentDirective } from '../content-directive';
import { ContentItem } from '../content-item';
import { ContentComponent } from '../content-interface';
import { AccountConfigurationComponent } from '../account-configuration/account-configuration.component';
import { TransactionsComponent } from '../transactions/transactions.component';
// import { GlobalContextService } from '../global-context.service';
import { isNullOrUndefined } from 'util';
import { CONTENT_ITEMS } from '../content-item-lists';

@Component({
  selector: 'app-content-loader',
  templateUrl: './content-loader.component.html',
  styleUrls: ['./content-loader.component.css']
})
export class ContentLoaderComponent implements OnInit {
  @ViewChild(ContentDirective) content: ContentDirective;
  currentIndex = 0;
  contentArray = CONTENT_ITEMS;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    // this.loadComponent(this.currentIndex);
    // this.switch();
    this.loadComponent('sttn');
  }

  // loadComponent(contentIndex: number) {
  //   const contentItem = this.contentArray[contentIndex];

  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(contentItem.component);

  //   const viewContainerRef = this.content.viewContainerRef;
  //   viewContainerRef.clear();

  //   const componentRef = viewContainerRef.createComponent(componentFactory);
  //   (<ContentComponent>componentRef.instance).data = contentItem.data;
  // }

  // switch() {
  //   setInterval(() => {
  //     this.currentIndex = (this.currentIndex + 1) % this.contentArray.length;
  //     this.loadComponent(this.currentIndex);
  //   }, 5000);
  // }

  loadComponent(codename: string) {
    const contentItem = this.contentArray.find(i => i.codename === codename);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(contentItem.component);

    const viewContainerRef = this.content.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<ContentComponent>componentRef.instance).data = null;
  }

}
