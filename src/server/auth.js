import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-dependency-injection';
import {Cookie} from 'aurelia-cookie';
import {Http} from './http';
import {Users} from './users';
import {ProfileNav, Authorize, UserLoggedIn, UserLoggedOut} from 'core/actions';
import {EventAggregator} from 'aurelia-event-aggregator';
import channel from 'core/channel';
import server from 'server';

import {User} from 'services/user';

@inject(Http, Users, EventAggregator)
export class Authentication {

  constructor(http, users) {
    this.http  = http.getHttp();
    this.users = users;


    this.tryFetchingCurrent().catch((a)=> {
      console.log(a)
    })
  }

  tryFetchingCurrent() {
    if (!Cookie.get('token')) return Promise.resolve(null);

    return server.get('/api/users/me')
      .then(response => {
        console.log(response)
        const user = User.authorize(response.content);
        return user;
      })
      .catch(err => {
        Cookie.delete('token');
        console.log({errResponse: err.response, statusText: err.statusText, status: err.statusCode});
      })
  }

  create(body) {
    const method = 'POST';
    return server.post('/api/users', body)
      .then(response => {
        // console.log(response)
      })
      .catch(err => {
        console.log(err.response)
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
        console.log(err.response)
      })
  }

  signup(user) {

    return server.post('/api/users', user).then((resp)=> {
      const token = resp.content.token;
      if (token) {
        Cookie.set('token', token);
      }
      return this.tryFetchingCurrent();
    })

    function authenticate() {
      const client = new HttpClient();
      return client.createRequest('http://api.idyuh.com/users')
        .asPost()
        .withHeader('Content-Type', 'application/json')
        .withParams({ user })
        .send()
        .then(resp => {
          if (resp.content) {
            return postUser(resp.content.user)
          }
        })
        .catch(err => console.log(err.response))
    }
  }

  logout() {
    User.unauthorize()
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
        console.log(err.response)
      })
  }
}

