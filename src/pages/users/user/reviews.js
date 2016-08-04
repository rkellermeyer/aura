import portal from 'app-portal';

export class UserReviews {
  canActivate() {
    portal.setConfig('portalContext', 'default')
  }
}
