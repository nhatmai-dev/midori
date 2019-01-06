import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class StateManagementService {
    private accountIdBehaviorSubject = new BehaviorSubject<number>(null);
    private environmentBehaviourSubject = new BehaviorSubject<string>(null);

    constructor() {}

    setAccountId(accountId: number) {
        console.log('StateManagementService has received AccountId: ' + accountId);
        this.accountIdBehaviorSubject.next(accountId);
    }

    getAccountId(): BehaviorSubject<number> {
        return this.accountIdBehaviorSubject;
    }

    setEnvironment(environment: string) {
        console.log('StateManagementService has received Environment: ' + environment);
        this.environmentBehaviourSubject.next(environment);
    }

    getEnvironment(): BehaviorSubject<string> {
        return this.environmentBehaviourSubject;
    }

}
