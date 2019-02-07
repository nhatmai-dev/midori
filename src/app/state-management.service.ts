import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConnectionSet } from './settings/connection-set';

@Injectable()
export class StateManagementService {
    private accountIdBehaviorSubject = new BehaviorSubject<number>(null);
    private environmentBehaviourSubject = new BehaviorSubject<string>(null);
    private connectionSetBehaviorSubject = new BehaviorSubject<ConnectionSet>(null);
    private isSettingsSavedBehaviorSubject = new BehaviorSubject<boolean>(false);
    private isSettingsSavingBehaviorSubject = new BehaviorSubject<boolean>(false);
    private applicationUserKey = new BehaviorSubject<string>(null);

    constructor() {}

    setAccountId(accountId: number) {
        this.accountIdBehaviorSubject.next(accountId);
    }

    getAccountId(): BehaviorSubject<number> {
        return this.accountIdBehaviorSubject;
    }

    setEnvironment(environment: string) {
        this.environmentBehaviourSubject.next(environment);
    }

    getEnvironment(): BehaviorSubject<string> {
        return this.environmentBehaviourSubject;
    }

    setIsSettingsSaved(isSettingsSaved: boolean) {
        this.isSettingsSavedBehaviorSubject.next(isSettingsSaved);
    }

    getIsSettingsSaved(): BehaviorSubject<boolean> {
        return this.isSettingsSavedBehaviorSubject;
    }

    setConnectionSet(connectionSet: ConnectionSet) {
        this.connectionSetBehaviorSubject.next(connectionSet);
    }

    getConnectionSet(): BehaviorSubject<ConnectionSet> {
        return this.connectionSetBehaviorSubject;
    } 

    setIsSettingsSaving(isSettingsSaving: boolean) {
        this.isSettingsSavingBehaviorSubject.next(isSettingsSaving);
    }

    getIsSettingsSaving(): BehaviorSubject<boolean> {
        return this.isSettingsSavingBehaviorSubject;
    }

    setApplicationUserKey(applicationUserKey: string) {
        this.applicationUserKey.next(applicationUserKey);
    }

    getApplicationUserKey() {
        return this.applicationUserKey;
    }
}
