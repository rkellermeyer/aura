import {Container} from 'aurelia-dependency-injection';
import {Cookie} from 'aurelia-cookie';
import {Http} from 'server/http';

export class Server {
  authToken = Cookie.get('token');
  start() {}

  get(...a) {
    return httpGet(...a);
  }

  post(...a) {
    return httpPost(...a);
  }

  put(...a) {
    return httpPut(...a);
  }

  patch(...a) {
    return httpPatch(...a);
  }

  socketOn(...a) {
    return window.sio.on(...a)
  }

  socketOff(...a) {
    return window.sio.off(...a);
  }

  getCookie(...a) {
    return Cookie.get(...a);
  }

  setCookie(...a) {
    return Cookie.set(...a);
  }

  deleteCookie(...a) {
    return Cookie.delete(...a);
  }
}

const server = new Server();
export default server;


function httpGet(...args) {
  return Container.get(Http).get(...args);
}

function httpPost(...args) {
  return Container.get(Http).post(...args);
}

function httpPut(...args) {
  return Container.get(Http).put(...args);
}

function httpPatch(...args) {
  return Container.get(Http).patch(...args);
}
