import {inject} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-http-client';
import {AuthInterceotor} from 'server/interceptor'
import {Cookie} from 'aurelia-cookie';

const HTTP_HEADERS = {
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'X-Requested-With': 'Fetch',
    'X-XSRF-TOKEN': Cookie.get('XSRF-TOKEN'),
    'Content-Type':"application/json;charset=utf-8"
  }
}


@inject(HttpClient)
export class Http {
  constructor(http) {
    http.configure(config => {
    config
      .withBaseUrl(this._endpoint)
      .withHeader('Accept', 'application/json, text/plain, */*')
      .withHeader('X-XSRF-TOKEN', Cookie.get('XSRF-TOKEN'))
      .withHeader('Content-Type', 'application/json;charset=utf-8')
      .withInterceptor(new AuthInterceotor(http))
    })

    this.http = http;
    this.getHttp = ()=> http;
  }
}
