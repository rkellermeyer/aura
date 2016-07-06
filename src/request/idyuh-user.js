import {endpoint} from './decorators';

@endpoint('idyuh', 'user_profiles')
export class User {

  initialize(client) {
    this.client = client;
    this.get  = (...args)=> client.get(...args);
    this.find = (...args)=> client.find(...args);
  }
}
