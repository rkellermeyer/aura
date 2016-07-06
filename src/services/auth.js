import {inject} from 'aurelia-dependency-injection';
import {User} from 'services/user';
import {HttpClient, json} from 'aurelia-fetch-client';
import {checkCookie, getCookie, removeCookie} from './cookie';
import {Util} from './util';

@inject(HttpClient)
export class Auth {
  constructor(http) {
    http.configure((config)=> {
      config
          .withBaseUrl(this._endpoint)
          .withDefaults({
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'X-Requested-With': 'Fetch'
            }
          })
          .withInterceptor({
            request(request) {
              if (checkCookie('token') && Util.isSameOrigin(config.url)) {
                request.headers.append('Authorization', authHeader);
              }
              console.log(`Requesting ${request.method} ${request.url}`);
              return request;
            }
          })
    })

    this.http = http;

    if (localStorage.getItem('uid')) {
      this.login();
    }
  }

  login(body) {
    return this.http.fetch('api/users/1')
    .then(res => res.json())
    .then(resp => {
      this.loggedInUser = resp;
      Auth.user = this.loggedInUser
      localStorage.setItem('uid', Auth.user.id);
      return Auth.user;
    })
    .catch(error => {
      console.error(error)
    });
  }

  logout() {
    localStorage.setItem('uid', '');
    Auth.user = null;
  }
}
