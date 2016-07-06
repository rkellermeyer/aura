import {inject} from 'aurelia-dependency-injection';
import {Auth} from 'services/auth';
import {Router, Redirect} from 'aurelia-router';

@inject(Auth, Router)
export class Login {
  auth = Auth;
  constructor(auth, router) {
    this.authService = auth;
    this.router = router;
  }

  canActivate() {
    this.authService.logout();
    return new Redirect('#/')
  }
}
