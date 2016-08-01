import {Cache} from 'services/cache';
import {Container} from 'aurelia-dependency-injection';
import channel from 'core/channel';
import {Authorize} from 'core/actions';

class State {

  ui:UI  = null;

  app:App = null;

  portal:Portal = null;

  authorized:Authorized = null;

  constructor() {
    channel.subscribe(Authorize, (payload)=> {
      this.authorized = payload.instruction;
    });
  }

  authorize(callback) {
    let resolveCallback = (a)=> {
      return callback ? callback(a) : Promise.resolve(a);
    }

    if (this.authorized) {
      return resolveCallback(this.authorized);
    }

    return new Promise(resolve => {
      channel.subscribeOnce(Authorize, (payload)=> {
        resolve(resolveCallback(payload.instruction));
      })
    })
  }

  register(key, Class, EventType) {

    Class.instance = Container.get(Class);
    Container.register(Class, Class.instance);

    Object.defineProperty(this, key, {
      get() {
        return Class.instance;
      }
    })

    return Class.instance;
  }


  containerGet(key) {
    return Container.get(key);
  }

  __cacheSetItem(key, value) {
    return Container.get(Cache).setItem(key, value);
  }

  __cacheGetItem(key) {
    return Container.get(Cache).getItem(key);
  }
}

const state = new State();

export default state;

window.state = state;

