import {inject} from 'aurelia-framework';
import {User} from 'request/idyuh-user';
import {HttpClient} from 'aurelia-fetch-client';

export class UserProfile {
  heading = 'User Profile';
  users = [];

  activate(params) {
    return User.instance.find(params.id)
      .then(user => this.user = user);
  }

  describeName() {
    let user = this.user;
    if (this.user && !this._describeName) {
      this._describeName = `${user.prefix} ${user.first_name} ${user.middle_initial} ${user.last_name} ${user.suffix}`;
    }

    return this._describeName
  }
}
