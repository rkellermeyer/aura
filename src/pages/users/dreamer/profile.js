import {inject} from 'aurelia-framework';
import state from 'app-state';
import {computedFrom} from 'aurelia-binding';
import {User} from 'services/user';
import portal from 'app-portal';


@inject(User)
export class UserProfile {
  heading = 'User Profile';

  constructor(user) {
    this.user = user;
  }

  canActivate() {
    portal.setConfig('portalContext', 'default')
  }

  activate() {
    console.log(this.user);
  }
}
