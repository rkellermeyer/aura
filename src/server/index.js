import {inject} from 'aurelia-dependency-injection';
import {Http} from './http';
import state from 'app-state';
import store from './store';

const endpoints_ = {
  users: '/api/users',
  projects: '/api/project_profiles',
  currentUser: '/api/users/me'
}



@inject(Http)
export class Server {

  constructor(http) {
    this.http = http.getHttp();
  }

  getCurrentUser() {
    return this.http.get(endpoints_.currentUser)
      .then(response => {
        return response.ok ? response.json() : {}
      })
      .catch(error => {
        console.error('Error fetching the currentUser from the server');
        console.log(error);
      })
  }

  getUsers() {
    return this.http.get(endpoints_.users)
      .then(response => {
        return response.ok ? response.json() : {}
      })
      .catch(error => {
        console.error('Error fetching users from the server');
        console.log(error.response);
      })
  }

  getProjects() {
    return this.http.get(endpoints_.projects)
      .then(response => {
        return response.content;
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  getUserProjects(id) {
    this.getProjects().then(projects => {
      return projects.filter(p => p.user_id === id);
    })
  }

  newProject(body) {
    return this.http.post(endpoints_.projects, body)
      .then(response => {
        if (response.isSuccess) {
          return response.content;
        }
      })
      .catch(err => console.log(err.response))
  }

  updateProject(_id, body) {
    let endpoint = join(endpoints_.projects, _id);
    return this.http.put(endpoint, body)
      .then((response)=> {
        return response.content;
      })
      .catch(err => console.log(err.response));
  }

  deleteProject(_id, body) {
    let endpoint = join(endpoints_.projects, _id);
    return this.http.delete(endpoint, body)
      .then((response)=> {
        return response.content;
      })
      .catch(err => console.log(err.response));
  }
}



function join(...args) {
  return args.join('/').replace(/(\/\/)+/g, '/');
}
