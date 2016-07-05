import {Container} from 'aurelia-dependency-injection';
import {Fetch} from './http';
import './user';
import './project';

export function configure(aurelia) {
  Fetch.instance = aurelia.container.get(Fetch);

  aurelia.container.registerInstance(Fetch, Fetch.instance);
  Fetch.instance.load();
}

