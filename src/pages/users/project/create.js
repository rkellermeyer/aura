import {Container, inject} from 'aurelia-dependency-injection';
import {ProjectModel} from 'server/project';
import projects from 'server/project';
import portal from 'app-portal';
import {User} from 'services/user';

@inject(User)
export class ProjectCreate {
  project = {};

  constructor(user) {
    this.user = user
  }

  canActivate() {
    portal.setConfig('portalContext', 'default')
  }

  submit() {
    let title = this.project.title;
    this.user.createProject(this.project);
  }

  setStatus(event, project) {
    let value = event.target.value;
  }
}
