import {inject} from 'aurelia-dependency-injection';
import {Authentication} from 'server/auth';
import {Router} from 'aurelia-router';

@inject(Authentication, Router)
export class Login {
  auth = Authentication;
  user = {};
  constructor(auth, router) {
    this.authService = auth;
    this.router = router;
  }

  activate() {
    document.documentElement.classList.add('hide-ui');
  }

  deactivate() {
    document.documentElement.classList.remove('hide-ui');
  }

  submit() {
    this.authService.login(this.user).then((user)=> {
      console.log(user)
      this.router.navigate(`#/portal`);
    })
  }
}
