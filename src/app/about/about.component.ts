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
  angularVersion: string;
  nodeVersion: string;
  electronVersion: string;
  chromeVersion: string;
  v8Version: string;

  constructor(private _electronService: ElectronService, private _ngZone: NgZone) {
    this.angularVersion = VERSION.full;
    this._electronService.ipcRenderer.on('get-node-version-resp', (event, arg) => {
      this._ngZone.run(() => {
        this.nodeVersion = arg;
      });
    });
    this._electronService.ipcRenderer.on('get-electron-version-resp', (event, arg) => {
      this._ngZone.run(() => {
        this.electronVersion = arg;
      });
    });
    this._electronService.ipcRenderer.on('get-chrome-version-resp', (event, arg) => {
      this._ngZone.run(() => {
        this.chromeVersion = arg;
      });
    });
    this._electronService.ipcRenderer.on('get-v8-version-resp', (event, arg) => {
      this._ngZone.run(() => {
        this.v8Version = arg;
      });
    });
    this.getNodeVersion();
    this.getElectronVersion();
    this.getChromeVersion();
    this.getV8Version();
  }

  getNodeVersion() {
    this._electronService.ipcRenderer.send('get-node-version');
  }

  getElectronVersion() {
    this._electronService.ipcRenderer.send('get-electron-version');
  }

  getChromeVersion() {
    this._electronService.ipcRenderer.send('get-chrome-version');
  }

  getV8Version() {
    this._electronService.ipcRenderer.send('get-v8-version');
  }

  getCodeName(): string {
    return 'abt';
  }
}
