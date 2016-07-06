'use strict';
import Database from '../../data/database';
import request from 'request';

class UserModel {

  constructor() {
    Database.loadAPI('users').then(store => this.store = store);
  }

  index() {
    return Database.loadAPI('users').then(res => {
      return res.data.users
    })
  }

  find(id) {
    return new Promise((resolve, reject) => {
      request(Database.baseUrl + 'user_profiles/'+id, (err, resp, body)=> {
        if (!err) return resolve(resp.body)
        return reject(err);
      })
    })
  }

  findById(id) {
    return this.find(id);
  }

  findByEmail(email) {
    return new Promise(resolve => {
      request(Database.baseUrl + 'user_profiles/'+id, (err, resp, body)=> {
        if (!err) return resolve(resp.body.users.find(user => user.email === email))
        return reject(err);
      })
    })
  }
}


export default new UserModel();


export class User {
  constructor(data) {
    this.data = data;
  }
}
