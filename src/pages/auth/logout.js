import {inject} from 'aurelia-dependency-injection';
import {Router, Redirect} from 'aurelia-router';
import {Cookie} from 'aurelia-cookie';
import state from 'app-state';

// @inject(Auth, Router)
export class Logout {
  canActivate() {
    state.authorized = null;
    Cookie.delete('token')
    return new Redirect('#/login')
  }
}
