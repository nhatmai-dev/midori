import { Injectable } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize.min.js';

@Injectable()
export class NotificationService {
    constructor() {}

    showInfo(content: string, callback: () => void) {
        // M.Toast.dismissAll();
        M.toast({
            html: content,
            displayLength: 1000,
            classes: 'teal rounded',
            completeCallback: callback
        });
    }

    showError(content: string, callback: () => void) {
        // M.Toast.dismissAll();
        M.toast({
            html: content,
            displayLength: 1000,
            classes: 'red darken-1 rounded',
            completeCallback: callback
        });
    }
}
