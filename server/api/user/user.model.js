'use strict';
import Database from '../../data/database';
import request from 'request';

class UserModel {

  constructor() {
    Database.loadAPI('users').then(store => this.store = store);
  }

  index() {
    return Database.loadAPI('users').then(res => {
      resolve(res.data.user_profiles);
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
}


export default new UserModel();
