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

  response(message) {
    console.log('---http:response--')
    console.log(message)
    return message;
  }

  requestError(error) {
    console.log('---http:requestError--')
    console.log({errResponse: error.response, statusText: error.statusText, status: error.statusCode});
    throw error;
    // throw error;
  }

  responseError(error) {
    console.log('---http:responseError--')
    console.log({errResponse: error.response, statusText: error.statusText, status: error.statusCode});
    throw error;
    // throw error;
  }
}
