
import {EventAggregator} from 'aurelia-event-aggregator';
import {Authorize} from './actions';

export class EventChannel extends EventAggregator {

  subscribe(nameOrClass, callback) {
    let instance;

    if (nameOrClass === Authorize && Authorize.instance) {
      callback(Authorize.instance);
      return {dispose(){}}
    }

    return super.subscribe(nameOrClass, callback);
  }

  subscribeOnce(nameOrClass, callback) {
    let instance;

    if (nameOrClass === Authorize && Authorize.instance) {
      callback(Authorize.instance);
      return {dispose(){}}
    }

    return super.subscribeOnce(nameOrClass, callback);
  }

  publish(message, payload) {
    if (message instanceof Authorize) {
      Authorize.instance = message;
    }
    super.publish(message, payload);
  }
}


const channel = new EventChannel();
export default channel;
