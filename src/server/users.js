import {Server} from './index';
import {observable} from 'aurelia-binding';
import {inject} from 'aurelia-dependency-injection';

class UserModel {
  model = null;

  constructor() {

  }

  getProjects() {

  }
}

UserModel.current = new UserModel();
UserModel.active  = new UserModel();


@inject(Server)
export class Users {

  /**
   *   The current logged in user
   */
  static current  = null;

  /**
   *   If previewing a specific user's profile, this represents the user being viewed
   */
  static active   = null;

  @observable current = null;
  @observable active  = null;

  list = [];

  constructor(server, model) {
    this.server = server;
    this.model  = model;

    UserModel.current.repo = this;
    UserModel.active.repo = this;

    this.server.getUsers().then(users => {
      this.list = users;
    })
  }

  currentChanged(model) {
    if (model) {
      if (!Users.current) {
        Users.current = UserModel.current;
      }

      this.currentUser = Users.current;
      this.currentUser.model = model;
    }
    else {
      UserModel.current.model = null;
      Users.current = this.currentUser = null;
    }
  }

  activeChanged(model) {
    if (model) {
      if (!Users.active) {
        Users.active = UserModel.active;
      }

      this.activeUser = Users.active;
      this.activeUser.model = model;
    }
    else {
      UserModel.active.model = null;
      Users.active = this.currentUser = null;
    }
  }


  getAllProjects() {
    return this.server.getProjects();
  }
}
