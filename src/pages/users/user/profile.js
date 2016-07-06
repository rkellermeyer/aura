import {inject} from 'aurelia-framework';
import {Users} from 'services/user';
import {HttpClient} from 'aurelia-fetch-client';

export class UserProfile {
  heading = 'User Profile';
  users = [];

  activate(params) {
    return Users.select(params.id)
      .then(user => {
        this.user = user
        this.profile = this.user.model.user_profile
        console.log(this.user)
      });
  }
}
