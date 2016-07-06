import {inject} from 'aurelia-dependency-injection';
import {Request} from './service';


export function client(name, baseUrl) {
  return Request.registerClient({name, baseUrl});
}

export function endpoint(client, url) {
  return Request.registerEndpoint({client, url});
}
