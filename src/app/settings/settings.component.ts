import { Component, OnInit, Input, AfterContentInit, AfterViewInit, NgZone } from '@angular/core';
import { ContentComponent } from '../content-interface';

import { Observable } from 'rxjs';
import { Environment } from '../environment-enum';
import { StateManagementService } from '../state-management.service';
import { isNullOrUndefined } from 'util';
import { ConnectionInfo } from './connection-info';
import { ElectronService } from 'ngx-electron';
import { ConnectionSet } from './connection-set';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements ContentComponent, OnInit {
  @Input() data: any;
  selectedAccountId: number;
  selectedEnvironment: string;
  applicationUserKey: string;
  erpUser: string;
  erpPassword: string;
  erpConnectionString: string;
  tdUser: string;
  tdPassword: string;
  tdConnectionString: string;
  environments: string[];
  isSettingsSaving: boolean;
  isTestingErpConnection: boolean;
  isTestingTdConnection: boolean;

  constructor(private stateManagementService: StateManagementService,
    private _notificationService: NotificationService,
    private _electronService: ElectronService,
    private _ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.isSettingsSaving = false;
    this.isTestingErpConnection = false;
    this.isTestingTdConnection = false;
    this.environments = this.getEnvironmentArray();
    this.stateManagementService.getIsSettingsSaving().subscribe(
      result => this.isSettingsSaving = result
    );
    this.stateManagementService.getAccountId().subscribe(
      savedAccountId => {
        if (!isNullOrUndefined(savedAccountId)) {
          this.selectedAccountId = savedAccountId;
        }
      }
    );
    this.stateManagementService.getApplicationUserKey().subscribe(
      result => this.applicationUserKey = result
    );
    this.stateManagementService.getEnvironment().subscribe(
      savedEnvironment => {
        if (!isNullOrUndefined(savedEnvironment)) {
          this.selectedEnvironment = savedEnvironment;
        } else {
          this.selectedEnvironment = this.environments[0];
        }
      }
    );
    this.loadConnectionForSelectedEnvironment(this.selectedEnvironment);
  }

  getCodeName(): string {
    return 'sttn';
  }

  private setAccountId(accountId: number) {
    this.selectedAccountId = accountId;
  }

  private setEnvironment(environment: string) {
    this.selectedEnvironment = environment;
    this.loadConnectionForSelectedEnvironment(environment);
  }

  private loadConnectionForSelectedEnvironment(environment: string) {
    this._electronService.ipcRenderer.on('read-settings-file-resp', (event, arg) => {
      this._ngZone.run(() => {
        const connectionSet: ConnectionSet = JSON.parse(arg);
        if (connectionSet.erpConnectionInfo) {
          this.erpConnectionString = connectionSet.erpConnectionInfo.connectString;
          this.erpUser = connectionSet.erpConnectionInfo.user;
          this.erpPassword = connectionSet.erpConnectionInfo.password;
        } else {
          this.erpConnectionString = null;
          this.erpUser = null;
          this.erpPassword = null;
        }
        if (connectionSet.tdConnectionInfo) {
          this.tdConnectionString = connectionSet.tdConnectionInfo.connectString;
          this.tdUser = connectionSet.tdConnectionInfo.user;
          this.tdPassword = connectionSet.tdConnectionInfo.password;
        } else {
          this.tdConnectionString = null;
          this.tdUser = null;
          this.tdPassword = null;
        }
      });
    });
    this._electronService.ipcRenderer.send('read-settings-file', this.selectedEnvironment);
  }

  private getEnvironmentArray(): string[] {
    const myEnum = [];
    const objectEnum = Object.keys(Environment);
    const keys = objectEnum.slice(objectEnum.length / 2);

    for (let i = 0; i < keys.length; i++) {
      myEnum.push(keys[i]);
    }
    return myEnum;
  }

  testErpConnection() {
    if (this.isTestingErpConnection) {
      // prevent double click
      return;
    }

    if (isNullOrUndefined(this.erpConnectionString) || !this.erpConnectionString) {
      this._notificationService.showError('ERP Connection String is required', null);
      return;
    }

    if (isNullOrUndefined(this.erpUser) || !this.erpUser) {
      this._notificationService.showError('ERP User is required', null);
      return;
    }

    if (isNullOrUndefined(this.erpPassword) || !this.erpPassword) {
      this._notificationService.showError('ERP Password is required', null);
      return;
    }

    this.isTestingErpConnection = true;
    this._electronService.ipcRenderer.on('test-erp-connection-resp', (event, arg) => {
      this._ngZone.run(() => {
        const result = arg;
        if (result === 'OK') {
          this._notificationService.showInfo(result, () => this.isTestingErpConnection = false );
        } else {
          this._notificationService.showError(result, () => this.isTestingErpConnection = false );
        }
      });
    });
    const erpConnectionInfo = new ConnectionInfo(this.erpUser, this.erpPassword, this.erpConnectionString);
    this._electronService.ipcRenderer.send('test-erp-connection', JSON.stringify(erpConnectionInfo));
  }

  testTdConnection() {
    if (this.isTestingTdConnection) {
      // prevent double click
      return;
    }

    if (isNullOrUndefined(this.tdConnectionString) || !this.tdConnectionString) {
      this._notificationService.showError('TD Connection String is required', null);
      return;
    }

    if (isNullOrUndefined(this.tdUser) || !this.tdUser) {
      this._notificationService.showError('TD User is required', null);
      return;
    }

    if (isNullOrUndefined(this.tdPassword) || !this.tdPassword) {
      this._notificationService.showError('TD Password is required', null);
      return;
    }

    this.isTestingTdConnection = true;
    this._electronService.ipcRenderer.on('test-td-connection-resp', (event, arg) => {
      this._ngZone.run(() => {
        const result = arg;
        if (result === 'OK') {
          this._notificationService.showInfo(result, () => this.isTestingTdConnection = false );
        } else {
          this._notificationService.showError(result, () => this.isTestingTdConnection = false );
        }
      });
    });
    const tdConnectionInfo = new ConnectionInfo(this.tdUser, this.tdPassword, this.tdConnectionString);
    this._electronService.ipcRenderer.send('test-td-connection', JSON.stringify(tdConnectionInfo));
  }

  saveSettings() {
    if (this.isSettingsSaving) {
      // prevent double click
      return;
    }

    if (isNullOrUndefined(this.selectedAccountId)) {
      this._notificationService.showError('Account Id is required', null);
      return;
    }

    if (isNullOrUndefined(this.erpConnectionString) || !this.erpConnectionString) {
      this._notificationService.showError('ERP Connection String is required', null);
      return;
    }

    if (isNullOrUndefined(this.erpUser) || !this.erpUser) {
      this._notificationService.showError('ERP User is required', null);
      return;
    }

    if (isNullOrUndefined(this.erpPassword) || !this.erpPassword) {
      this._notificationService.showError('ERP Password is required', null);
      return;
    }

    if (isNullOrUndefined(this.tdConnectionString) || !this.tdConnectionString) {
      this._notificationService.showError('TD Connection String is required', null);
      return;
    }

    if (isNullOrUndefined(this.tdUser) || !this.tdUser) {
      this._notificationService.showError('TD User is required', null);
      return;
    }

    if (isNullOrUndefined(this.tdPassword) || !this.tdPassword) {
      this._notificationService.showError('TD Password is required', null);
      return;
    }

    this.isSettingsSaving = true;
    this.stateManagementService.setAccountId(this.selectedAccountId);
    this.stateManagementService.setEnvironment(this.selectedEnvironment);
    this.getApplicationUserKey().subscribe(applicationUserKeyRes => {
      if (applicationUserKeyRes === '') {
        this._notificationService.showInfo('Account ' + this.selectedAccountId + ' does not exist', () => this.isSettingsSaving = false );
        this.isSettingsSaving = false;
      } else {
        this.applicationUserKey = applicationUserKeyRes;
        this.stateManagementService.setApplicationUserKey(applicationUserKeyRes);
        this.writeSettingsFile().subscribe(writeFileRes => {
          if (writeFileRes === 'OK') {
            this.stateManagementService.setIsSettingsSaved(true);
            this._notificationService.showInfo('OK', () => this.isSettingsSaving = false );
          } else {
            this.stateManagementService.setIsSettingsSaved(false);
            this._notificationService.showInfo('FAILED', () => this.isSettingsSaving = false );
          }
        });
      }
    });
  }

  private getApplicationUserKey(): Observable<string> {
    const tdConnectionInfo = new ConnectionInfo(this.tdUser, this.tdPassword, this.tdConnectionString);
    return new Observable(observer => {
      this._electronService.ipcRenderer.on('get-application-user-key-resp', (event, result) => {
        this._ngZone.run(() => {
          observer.next(result);
        });
      });
      this._electronService.ipcRenderer.send('get-application-user-key', JSON.stringify(tdConnectionInfo), this.selectedAccountId);
    });
  }

  private writeSettingsFile(): Observable<string> {
    const erpConnectionInfo = new ConnectionInfo(this.erpUser, this.erpPassword, this.erpConnectionString);
    const tdConnectionInfo = new ConnectionInfo(this.tdUser, this.tdPassword, this.tdConnectionString);
    const connectionSet = new ConnectionSet(erpConnectionInfo, tdConnectionInfo);
    return new Observable(observer => {
      this._electronService.ipcRenderer.on('write-settings-file-resp', (event, result) => {
        this._ngZone.run(() => {
          observer.next(result);
        });
      });
      this._electronService.ipcRenderer.send('write-settings-file', this.selectedEnvironment, JSON.stringify(connectionSet, null, '\t'));
    });
  }
}
