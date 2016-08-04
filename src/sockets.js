import {inject} from 'aurelia-dependency-injection';
import io from 'socket.io-client';
import channel from 'app-core';

window.io = io;

class Sockets {

  constructor() {
    window.sio = this.io = io('', {
      // Send auth token on connection, you will need to DI the Auth service above
      // 'query': 'token=' + Auth.getToken()
      path: '/socket.io-client'
    })

    console.log(this.io)

    this.io.on('connect', ()=> {
      console.log('connected');
    })

    this.io.on('project:save', (data)=> {
      console.log(data)
    })
  }

  subscribe(key, callback) {
    return this.io.on(key, callback);
  }

  publish(key, data) {
    this.io.emit(key, data);
  }
}

const sockets = new Sockets();

export default sockets;

export {Sockets}
