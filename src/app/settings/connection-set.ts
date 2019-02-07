import { ConnectionInfo } from './connection-info';

export class ConnectionSet {
    constructor(public erpConnectionInfo: ConnectionInfo, public tdConnectionInfo: ConnectionInfo) {}
}
