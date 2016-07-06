import {resolver} from 'aurelia-dependency-injection';
import {Endpoint} from './endpoint';
import {HttpClient} from 'aurelia-http-client';

const HTTP_HANDLERS = {};

export class Request {
  static clients   = [];
  static endpoints = [];

  static registerClient(config) {
    return (target)=> {
      if (!config.name) {
        throw new Error('Client registration requires a name as a first argument');
      }

      if (Request.clients[config.name]) {
        throw new Error('Trying to register a client whos name already exists');
      }

      config.target = target;
      Request.clients[config.name] = config;
      Request.clients.push(config);

      return target;
    }
  }

  static registerEndpoint(config) {
    return (target)=> {
      if (!config.client) {
        throw new Error('Endpoint registration requires a client name');
      }

      config.target = target;
      Request.endpoints.push(config);
      return target;
    }
  }

  initialize(aurelia) {
    let client;
    let endpoint;

    while(client = Request.clients.shift()) {
      client.instance = client.target.instance = aurelia.container.get(client.target);
      aurelia.container.registerInstance(client.target, client.instance);
      aurelia.container.registerInstance(client.name, client.instance);

      client.instance.http     = new HttpClient();
      client.instance.http.configure(config => {
        if ('configure' in client.instance) {
          client.instance.configure(config);
        }
        else {
          config.withBaseUrl(client.baseUrl);
        }
      })

      if ('initialize' in client.instance) {
        client.instance.initialize(client.instance.http, aurelia.container);
      }
    }

    while(endpoint = Request.endpoints.shift()) {
      endpoint.instance = endpoint.target.instance = aurelia.container.get(endpoint.target);
      aurelia.container.registerInstance(endpoint.target, endpoint.instance);

      if (endpoint.client) {
        endpoint.client = new Endpoint(aurelia.container.get(endpoint.client), endpoint.url);
      }

      if ('configure' in endpoint.instance) {
        endpoint.client.configure(config => {
          endpoint.instance.configure(config);
        })
      }

      if ('initialize' in endpoint.instance) {
        endpoint.instance.initialize(endpoint.client, aurelia);
      }
    }
  }
}
