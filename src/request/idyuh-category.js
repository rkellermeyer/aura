import {endpoint} from './decorators';

@endpoint('idyuh', 'categories')
export class Category {

  configure(config) {
    config.getKey('categories');
  }

  initialize(client) {
    this.client = client;
    this.get  = (...args)=> client.get(...args);
  }
}
