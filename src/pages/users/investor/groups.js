import portal from 'app-portal';

export class UserGroups {
  canActivate() {
    portal.setConfig('portalContext', 'default')
  }
}
