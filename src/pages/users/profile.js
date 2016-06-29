import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class UserProfile {
  heading = 'User Profile';
  users = [];

  constructor(http) {
    http.configure(config => {
      config
          .useStandardConfiguration()
          .withBaseUrl('http://api.idyuh.com/');
    });

    this.http = http;
  }

  activate(params) {
    return this.http.fetch('user_profiles/' + params.id)
        .then(response => response.json())
        .then(user => this.user = user);
  }

  describeName() {
    let user = this.user;
    if (!this._describeName) {
      this._describeName = `${user.prefix} ${user.first_name} ${user.middle_initial} ${user.last_name} ${user.suffix}`;
    }
    return this._describeName
  }
}
