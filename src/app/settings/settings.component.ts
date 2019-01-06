import { Component, OnInit, Input, AfterContentInit, AfterViewInit } from '@angular/core';
import { ContentComponent } from '../content-interface';

import * as M from 'materialize-css/dist/js/materialize.min.js';
import { Environment } from '../environment-enum';
import { StateManagementService } from '../state-management.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements ContentComponent, OnInit, AfterViewInit {
  @Input() data: any;
  selectedAccountId: number;
  selectedEnvironment: string;
  environments: string[];
  options = {
    coverTrigger: false
  };

  constructor(private stateManagementService: StateManagementService) {
  }

  ngOnInit(): void {
    this.stateManagementService.getAccountId().subscribe(
      savedAccountId => {
        console.log('savedAccountId: ' + savedAccountId);
        if (!isNullOrUndefined(savedAccountId)) {
          this.selectedAccountId = savedAccountId;
        }
      }
    );

    this.environments = this.getEnvironmentArray();
    this.stateManagementService.getEnvironment().subscribe(
      savedEnvironment => {
        console.log('savedEnvironment: ' + savedEnvironment);
        if (!isNullOrUndefined(savedEnvironment)) {
          this.selectedEnvironment = savedEnvironment;
        } else {
          this.selectedEnvironment = this.environments[0];
        }
      }
    );
  }

  ngAfterViewInit(): void {
    const elems = document.querySelectorAll('.dropdown-trigger');
    const instances = M.Dropdown.init(elems, this.options);
    M.updateTextFields();
  }

  getCodeName(): string {
    return 'sttn';
  }

  setAccountId(accountId: number) {
    this.selectedAccountId = accountId;
  }

  setEnvironment(environment: string) {
    this.selectedEnvironment = environment;
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
    this.stateManagementService.setAccountId(this.selectedAccountId);
    this.stateManagementService.setEnvironment(this.selectedEnvironment);
    M.Toast.dismissAll();
    if (isNullOrUndefined(this.selectedAccountId)) {
      M.toast(
        {
          html: 'Account Id is required',
          displayLength: 1000,
          outDuration: 0,
          classes: 'red rounded'
        });
    } else {
      M.toast(
        {
          html: 'OK!',
          displayLength: 1000,
          outDuration: 0,
          classes: 'green rounded'
        });
    }
  }
}
