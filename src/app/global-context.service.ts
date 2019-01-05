// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { SidebarItem } from './sidebar/sidebar-item';

// @Injectable()
// export class GlobalContextService {
//     private accountIdBehaviorSubject = new BehaviorSubject<string>(null);
//     private environmentBehaviourSubject = new BehaviorSubject<string>(null);
//     private itemBehaviorSubject = new BehaviorSubject<SidebarItem>(null);


//     constructor() {}

//     setAccountId(accountId: string) {
//         this.accountIdBehaviorSubject.next(accountId);
//     }

//     getAccountId(): BehaviorSubject<string> {
//         return this.accountIdBehaviorSubject;
//     }

//     setEnvironment(environment: string) {
//         this.environmentBehaviourSubject.next(environment);
//     }

//     getEnvironment(): BehaviorSubject<string> {
//         return this.environmentBehaviourSubject;
//     }

//     setItem(item: SidebarItem) {
//         this.itemBehaviorSubject.next(item);
//     }

//     getItem(): BehaviorSubject<SidebarItem> {
//         return this.itemBehaviorSubject;
//     }
// }
