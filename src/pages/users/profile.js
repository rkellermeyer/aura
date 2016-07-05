import {inject} from 'aurelia-framework';
import {Users} from 'services/user';
import {HttpClient} from 'aurelia-fetch-client';

@inject(Users)
export class UserProfile {
  heading = 'User Profile';
  users = [];

  constructor(service) {
    this.service = service;
  }

  activate(params) {
    return this.service.find(params.id)
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
