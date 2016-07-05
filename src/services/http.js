import {Container, inject} from 'aurelia-framework';
import {FetchEndpoint} from './endpoint';
import {HttpClient} from 'aurelia-fetch-client';

const base  = '/api/'
const idyuh = 'http://api.idyuh.com/';


@inject(HttpClient)
export class BaseEndpoint {
  _endpoints = new Map();

  constructor(http, endpoint) {
    this._endpoint = endpoint || base;
    http.configure(config => {
      config
          .useStandardConfiguration()
          .withBaseUrl(this._endpoint);
    });
    this.http = http;
  }

  createService(url) {
    if (this._endpoints.has(url)) return this._endpoints.get(url);
    this._endpoints.set(url, new FetchEndpoint(this.http, url));
    return this._endpoints.get(url);
  }
}

@inject(HttpClient)
export class Idyuh extends BaseEndpoint {
  constructor(http) {
    super(http, idyuh);
  }
}

@inject(HttpClient)
export class Api extends BaseEndpoint {
  constructor(http) {
    super(http, base);
  }
}

export function registerApi(...services) {
  return Fetch.registerApi({services});
}

@inject(Api, Idyuh, Container)
export class Fetch {

  static apis = [];
  static registerApi(config) {
    return (target)=> {
      config.target = target;
      Fetch.apis.push(config);
      return target;
    }
  }

  constructor(api, idyuh, container) {
    this.container = container;
    this.handlers = {api, idyuh};
  }

  createService(base, url) {
    let handler = this.handlers.api;
    if (typeof base === 'string' && base in this.handlers) {
      handler = this.handlers[base];
    }
    return handler.createService(url);
  }

  load() {
    Fetch.apis.forEach(config => {
      config.instance = this.container.get(config.target);
      (config.target.services || config.services).forEach(s => {
        config.instance[s.base] = config.target[s.base] = this.createService(s.base, s.url);
      })
      if ('initialize' in config.instance) {
        config.instance.initialize(this);
      }
      this.container.registerInstance(config.target, config.instance);
    })
  }
}
