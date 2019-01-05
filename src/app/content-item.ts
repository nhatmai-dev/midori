import { Type } from '@angular/core';

export class ContentItem {
    // constructor(codename: string, public component: Type<any>, public data: any) {}
    codename: string;
    name: string;
    icon: string;
    component: Type<any>;
}
