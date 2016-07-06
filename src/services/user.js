import {Container, inject} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-http-client';
import {Endpoint} from './endpoint';

class UserModel {
  constructor(list, model) {
    this.model = model;
    this.id    = model.id;
  }

  select() {
    if (Users.current && Users.current !== this) {
      Users.current.isSelected = false;
    }
    this.isSelected = true;
    Users.current = this;
  }
}


export class Users {

  users = [];
  constructor() {
    this._globalEndpoint = new Endpoint('http://api.idyuh.com', 'users');
    this.http = new Endpoint('http://api.idyuh.com', 'user_profiles');
  }

  all() {
    if (this.users.length) {
      return Promise.resolve(this.users);
    }
    return this._globalEndpoint.get().then((res)=> {
      this.users = res.content.users.map(users => {
        return new UserModel(this, users);
      });
      return this.users;
    })
  }

  find(id) {
    let user;
    return this.all().then((users)=> {
      return users.find(user => user.id === parseFloat(id))
    })
  }

  select(id) {
    if (Users.current && Users.current.id === parseFloat(id)) {
      return Promise.resolve(Users.current);
    }

    return this.find(id).then((user)=> {
      user.select()
      return user;
    })
  }

  static find(...args) {
    return Users.instance.find(...args)
  }

  static get(...args) {
    return Users.instance.get(...args)
  }

  static select(...args) {
    return Users.instance.select(...args)
  }
}

Users.instance = new Users();
Container.instance.registerInstance(Users, Users.instance);
