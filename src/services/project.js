import {Container, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Idyuh, Api} from './http';

@inject(HttpClient)
export class Project {
  constructor(http) {
    http.configure(config => {
      config.withBaseUrl('http://api.idyuh.com');
    })
    this.http = http;
  }

  get() {
    return this.http.get('project_profiles')
      .then(r => {
        return r.content.project_profiles;
      })
      .catch(error => {
        return console.error(error);
      })
  }
}
