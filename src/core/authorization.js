import {inject} from 'aurelia-dependency-injection';
import {Redirect} from 'aurelia-router';
import {User} from 'services/user';
import state from 'app-state';

@inject(User)
export class Authorization {

  constructor(user) {
    this.user = user
  }

  run(instruction, next) {
    let nextConfig = instruction.config;

    if (state.authorized) {
      nextConfig.user = state.authorized;
    }

    if (instruction.getAllInstructions().some(i => i.config.auth)) {
      var isLoggedIn = !!(state.user && state.user.model);
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}
