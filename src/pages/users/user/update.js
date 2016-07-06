import {Container, inject} from 'aurelia-dependency-injection';
import {Users} from 'services/user';


//import {Container, inject} from 'aurelia-dependency-injection';


export class UpdateUser {
  /**
   *   description
   */
  activate(params) {
    return Users.select(params.id)
      .then(user => this.user = user);
  }
}
