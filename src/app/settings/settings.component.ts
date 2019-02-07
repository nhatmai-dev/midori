import { Component, OnInit, Input, AfterContentInit, AfterViewInit, NgZone } from '@angular/core';
import { ContentComponent } from '../content-interface';

import * as M from 'materialize-css/dist/js/materialize.min.js';
import { Environment } from '../environment-enum';
import { StateManagementService } from '../state-management.service';
import { isNullOrUndefined } from 'util';
import { ConnectionInfo } from './connection-info';
import { ElectronService } from 'ngx-electron';
import { ConnectionSet } from './connection-set';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements ContentComponent, OnInit, AfterViewInit {
  @Input() data: any;
  selectedAccountId: number;
  selectedEnvironment: string;
  erpUser: string;
  erpPassword: string;
  erpConnectionString: string;
  tdUser: string;
  tdPassword: string;
  tdConnectionString: string;
  environments: string[];
  isSettingsSaving: boolean;

  constructor(private stateManagementService: StateManagementService, private _electronService: ElectronService, private _ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.isSettingsSaving = false;
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
    this.stateManagementService.getEnvironment().subscribe(
      savedEnvironment => {
        if (!isNullOrUndefined(savedEnvironment)) {
          this.selectedEnvironment = savedEnvironment;
        } else {
          this.selectedEnvironment = this.environments[0];
        }
      }
    );
    this._electronService.ipcRenderer.on('write-settings-file-resp', (event, arg) => {
      this._ngZone.run(() => {
        M.Toast.dismissAll();
        if (arg === 'OK') {
          this.stateManagementService.setIsSettingsSaved(true);
          M.toast({
            html: 'OK!',
            displayLength: 1000,
            outDuration: 0,
            classes: 'green rounded',
            completeCallback: () => {
              this.isSettingsSaving = false;
            }
          });
        } else {
          this.stateManagementService.setIsSettingsSaved(false);
          M.toast(
            {
              html: 'FAILED!',
              displayLength: 1000,
              outDuration: 0,
              classes: 'red rounded',
              completeCallback: () => {
                this.isSettingsSaving = false;
              }
            });
        }
      });
    });
    this._electronService.ipcRenderer.on('read-settings-file-resp', (event, arg) => {
      this._ngZone.run(() => {
        const connectionSet: ConnectionSet = JSON.parse(arg);
        if (connectionSet.erpConnectionInfo) {
          this.erpConnectionString = connectionSet.erpConnectionInfo.connectionString;
          this.erpUser = connectionSet.erpConnectionInfo.user;
          this.erpPassword = connectionSet.erpConnectionInfo.password;
        } else {
          this.erpConnectionString = null;
          this.erpUser = null;
          this.erpPassword = null;
        }
        if (connectionSet.tdConnectionInfo) {
          this.tdConnectionString = connectionSet.tdConnectionInfo.connectionString;
          this.tdUser = connectionSet.tdConnectionInfo.user;
          this.tdPassword = connectionSet.tdConnectionInfo.password;
        } else {
          this.tdConnectionString = null;
          this.tdUser = null;
          this.tdPassword = null;
        }
      });
    });
    this.loadConnectionForSelectedEnvironment(this.selectedEnvironment);
  }

  ngAfterViewInit(): void {

  }

  getCodeName(): string {
    return 'sttn';
  }

  setAccountId(accountId: number) {
    this.selectedAccountId = accountId;
  }

  setEnvironment(environment: string) {
    this.selectedEnvironment = environment;
    this.loadConnectionForSelectedEnvironment(environment);
  }

  loadConnectionForSelectedEnvironment(environment: string) {
    this._electronService.ipcRenderer.send('read-settings-file', this.selectedEnvironment);
  }

  getEnvironmentArray(): string[] {
    const myEnum = [];
    const objectEnum = Object.keys(Environment);
    const keys = objectEnum.slice(objectEnum.length / 2);

    for (let i = 0; i < keys.length; i++) {
      myEnum.push(keys[i]);
    }
    return myEnum;
  }

  saveSettings() {
    if (isNullOrUndefined(this.selectedAccountId)) {
      M.Toast.dismissAll();
      M.toast(
        {
          html: 'Account Id is required',
          displayLength: 1000,
          outDuration: 0,
          classes: 'red rounded'
        });
    } else if (!this.isSettingsSaving) {
      this.isSettingsSaving = true;
      this.stateManagementService.setAccountId(this.selectedAccountId);
      this.stateManagementService.setEnvironment(this.selectedEnvironment);
      const erpConnectionInfo = new ConnectionInfo(this.erpUser, this.erpPassword, this.erpConnectionString)
      const tdConnectionInfo = new ConnectionInfo(this.tdUser, this.tdPassword, this.tdConnectionString)
      const connectionSet = new ConnectionSet(erpConnectionInfo, tdConnectionInfo);
      this._electronService.ipcRenderer.send('write-settings-file', this.selectedEnvironment, JSON.stringify(connectionSet));
    }
  }
}
