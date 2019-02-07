import { Component, OnInit, Input, VERSION, NgZone } from '@angular/core';
import { ContentComponent } from '../content-interface';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements ContentComponent {

  @Input() data: any;
  appVersion: string;
  angularVersion: string;
  nodeVersion: string;
  electronVersion: string;
  chromeVersion: string;
  v8Version: string;

  constructor(private _electronService: ElectronService, private _ngZone: NgZone) {
    this.angularVersion = VERSION.full;
    this.getAppVersion();
    this.getNodeVersion();
    this.getElectronVersion();
    this.getChromeVersion();
    this.getV8Version();
  }

  getNodeVersion() {
    this._electronService.ipcRenderer.on('get-node-version-resp', (event, arg) => {
      this._ngZone.run(() => {
        this.nodeVersion = arg;
      });
    });
    this._electronService.ipcRenderer.send('get-node-version');
  }

  getElectronVersion() {
    this._electronService.ipcRenderer.on('get-electron-version-resp', (event, arg) => {
      this._ngZone.run(() => {
        this.electronVersion = arg;
      });
    });
    this._electronService.ipcRenderer.send('get-electron-version');
  }

  getChromeVersion() {
    this._electronService.ipcRenderer.on('get-chrome-version-resp', (event, arg) => {
      this._ngZone.run(() => {
        this.chromeVersion = arg;
      });
    });
    this._electronService.ipcRenderer.send('get-chrome-version');
  }

  getV8Version() {
    this._electronService.ipcRenderer.on('get-v8-version-resp', (event, arg) => {
      this._ngZone.run(() => {
        this.v8Version = arg;
      });
    });
    this._electronService.ipcRenderer.send('get-v8-version');
  }
  getAppVersion() {
    this._electronService.ipcRenderer.on('get-app-version-resp', (event, arg) => {
      this._ngZone.run(() => {
        this.appVersion = arg;
      });
    });
    this._electronService.ipcRenderer.send('get-app-version');
  }

  getCodeName(): string {
    return 'abt';
  }
}
