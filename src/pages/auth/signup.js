import {inject} from 'aurelia-dependency-injection';
import {Authentication} from 'server/auth';
import {Router} from 'aurelia-router';

const defaultUser = {
  email: '',
  roles: [],
  firstName: '',
  lastName: '',
  password: '',
  confirm: ''
};


@inject(Authentication, Router)
export class Signup {

  user = {};

  constructor(authentication, router) {
    this.authentication = authentication;
    this.router = router;
    this.user = Object.assign({}, defaultUser);
  }

  activate() {
    document.documentElement.classList.add('hide-ui');
  }

  deactivate() {
    document.documentElement.classList.remove('hide-ui');
  }


  submit() {
    this.passwordError = (this.user.confirm !== this.user.password)

    if (this.passwordError) {
      console.log('passwords do not match', this.user)
      return this.passwordError = true;
    }

    if (!this.user.email) {
      console.log('email required')
      return this.emailError = true;
    }

    return this.authentication.signup(this.user).then(()=> {
      this.router.navigate(`#/portal`);
    })
  }
}
