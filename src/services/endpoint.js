import {HttpClient} from 'aurelia-http-client';
import {Util} from './util';

function normalize(base, next) {
  base = base.split('/').filter(k => k.trim());
  base.push(next)
  return base.join('/');
}

function handleError(title, message) {
  return (error)=> {
    console.error(error);
    console.info(message);
    throw new Error(`Fetch Error: ${title}`)
  }
}

export class FetchEndpoint {
  constructor(http, baseUrl) {
    this.http    = http;
    this.baseUrl = baseUrl;
  }

  get() {
    return this.http.get(this.baseUrl).then(r => r.json()).catch(handleError('GET', 'error from get request'));
  }

  post(data) {
    return this.http.post(this.basretueUrl, data).then(r => r.json()).catch(handleError('FIND', 'error from find request'));
  }

  find(id) {
    return this.http.get(normalize(this.baseUrl, id)).then(r => r.json()).catch(handleError('FIND', 'error from post request'));
  }

  put(id, data) {
    return this.http.put(normalize(this.baseUrl, id), data).catch(handleError('FIND', 'error from put request'));
  }
}




const ENDPOINTS = {};
export class Endpoint {
  constructor(baseUrl, url) {
    let http = ENDPOINTS[baseUrl];
    if (!http) {
      http = ENDPOINTS[baseUrl] = new HttpClient();
      http.configure(config => {
        config.withBaseUrl(baseUrl);
      })
    }
    this.url  = url;
    this.http = http;
  }

  get(url, ...args) {
    url = url ? (this.url ? Util.normalize(this.url, url) : url) : (this.url || '');
    return this.http.get(url, ...args);
  }

  post(url, ...args) {
    url = url ? (this.url ? Util.normalize(this.url, url) : url) : (this.url || '');
    return this.http.post(url, ...args);
  }

  put(url, ...args) {
    url = url ? (this.url ? Util.normalize(this.url, url) : url) : (this.url || '');
    return this.http.put(url, ...args);
  }

  delete(url, ...args) {
    url = url ? (this.url ? Util.normalize(this.url, url) : url) : (this.url || '');
    return this.http.delete(url, ...args);
  }
}



