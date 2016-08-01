import Util from 'services/util';
import {Cookie} from 'aurelia-cookie';

export class AuthInterceotor {

  constructor(http) {
    this.http = http;
  }

  request(request) {
    let isOrigin = Util.isSameOrigin(this.http.baseUrl);
    let token    = Cookie.get('token')
    let r = request;
    request.headers.add('X-XSRF-TOKEN', Cookie.get('XSRF-TOKEN'));

    if (token && isOrigin) {
      request.headers.add('Authorization', 'Bearer '+ Cookie.get('token') || Cookie.get('XSRF-TOKEN'));
    }

    // console.log(request)
    // console.log(request.headers);
    console.log(`Requesting ${request.method} ${request.url}`);
    return request;
  }
}
