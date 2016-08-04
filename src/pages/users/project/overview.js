import portal from 'app-portal';
import {Container, inject} from 'aurelia-dependency-injection';
import {Redirect} from 'aurelia-router';
import {User} from 'services/user';

@inject(User)
export class ProjectOverView {

  constructor(user) {
    this.user = user;
  }

  canActivate(params, config, navModel) {
    this.router = navModel.router;

    if (!this.user.projects.selectedProject) {
      return new Redirect('#/portal/projects');
    }

    this.project = this.user.projects.selectedProject;

    portal.setConfig('portalContext', 'project');
  }

  canDeactivate() {
    portal.setConfig('portalContext', 'default')
  }

  setStatus(event, project) {
    let value = event.target.value;
  }
}
