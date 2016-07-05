import instruction from './instruction';
import {writeJSON, readJSON} from 'fs-utils';
import path from 'path';
import request from 'request';

class Database {
  baseUrl = 'http://api.idyuh.com/';
  store = [];

  constructor() {
    instruction.forEach(info => this.loadAPI(info.name, info));
  }

  loadAPI(name, info) {
    let success;
    let error;
    info = info || instruction.find(i => i.name === name);

    if (info.name in this.store) {
      return Promise.resolve(this.store[info.name])
    }

    success = (data)=> {
      info.data = data
      this.store.push(info);
      this.store[info.name] = info;
      return info;
    }

    error = (err)=> {
      console.log(err)
    }

    if (!info.path && info.request) {
      return this.request(info).then(success).catch(error)
    }
    return this.readFile(info.path).then(success).catch(error)
  }

  saveAPI(name, data) {
    let info = this.store[name];
    info.data = data;
    return this.writeFile(info.path, info.data)
      .then(()=> info)
      .catch(err => {
        console.log(err)
      })
  }

  request(info) {
    return new Promise((resolve, reject)=> {
      request(this.baseUrl + info.request, (err, result, body)=> {
        if (!err) return resolve(result);
        return reject(err);
      })
    })
  }

  readFile(file) {
    file = path.resolve(__dirname, file);
    return new Promise((resolve, reject) => {
      readJSON(file, (err, data)=> {
        if (!err) return resolve(data);
        reject(err);
      })
    })
  }

  writeFile(file, data) {
    file = path.resolve(__dirname, file);
    return new Promise((resolve, reject)=> {
      writeJSON(file, data, (err, data)=> {
        if (!err) return resolve(data);
        reject(err);
      })
    })
  }
}


export default new Database();
