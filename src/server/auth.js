import {inject} from 'aurelia-dependency-injection';
import {Cookie} from 'aurelia-cookie';
import {Http} from './http';
import {Users} from './users';
import {ProfileNav, Authorize} from 'core/actions';
import {EventAggregator} from 'aurelia-event-aggregator';
import channel from 'core/channel';
import server from 'server';

@inject(Http, Users, EventAggregator)
export class Authentication {

  constructor(http, users) {
    this.http  = http.getHttp();
    this.users = users;

    this._userToken = Cookie.get('token');

    if (this._userToken) {
      this.tryFetchingCurrent();
    }
  }

  tryFetchingCurrent() {
    if (!Cookie.get('token')) return Promise.resolve(null);

    return server.get('/api/users/me')
      .then(response => {
        channel.publish(new ProfileNav(response.content));
        channel.publish(new Authorize(response.content));
        return this.users.current = response.content;
      })
      .catch(err => {
        Cookie.delete('token');
        console.log(err)
      })
  }

  create(body) {
    const method = 'POST';
    return server.post('/api/users', body)
      .then(response => {
        // console.log(response)
      })
      .catch(err => {
        console.error(err)
      })
  }

  login(body) {
    const method = 'POST';
    return server.post('/auth/local', body)
      .then(response => {
        let content;
        let token;
        if (response.isSuccess) {
          content = response.content;
          token = content.token;
          Cookie.set('token', token);
        }
        return this.tryFetchingCurrent()
      })
      .catch(err => {
        console.error(err)
      })
  }

  getUsers() {
    return server.get('/api/users')
      .then(response => {
        return response
      })
      .then(response => {
        // console.log(response)
      })
      .catch(err => {
        console.error(err);
      })
  }
}

