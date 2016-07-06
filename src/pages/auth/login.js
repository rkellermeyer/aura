import {inject} from 'aurelia-dependency-injection';
import {Auth} from 'services/auth';
import {Router} from 'aurelia-router';

@inject(Auth, Router)
export class Login {
  auth = Auth;
  constructor(auth, router) {
    this.authService = auth;
    this.router = router;
  }

  login() {
    this.authService.login();
    this.router.navigate('#/');
  }
}
