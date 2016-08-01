import {checkCookie, getCookie, removeCookie} from 'services/cookie';
import Util from 'services/util';

let currentConfig;
const HTTP_HEADERS = {
  credentials: 'same-origin',
  mode: 'no-cors',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'X-Requested-With': 'Fetch',
  }
};

const HTTP_INTERCEPTOR = {
  request(request) {
    if (checkCookie('token') && Util.isSameOrigin(currentConfig.url)) {
      request.headers.set('XSRF-TOKEN', getCookie('XSRF-TOKEN'));
      request.headers.set('X-UI-GUID', getCookie('token'))
      request.headers.set('Authorization', 'Bearer '+ getCookie('token'));
      // console.log(getCookie('XSRF-TOKEN'))
    }
    console.log(`Requesting ${request.method} ${request.url}`, request.headers);
    return request;
  }
};

export function configureHTTP(config) {
  currentConfig = config;
  config
    .withBaseUrl(`http://localhost:9000`)
    .withDefaults(HTTP_HEADERS)
    .withInterceptor(HTTP_INTERCEPTOR);
}
