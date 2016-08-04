import {Container, inject} from 'aurelia-dependency-injection';
import {Redirect} from 'aurelia-router';
import {User} from 'services/user';
import portal from 'app-portal';

@inject(User)
export class ProjectMembers {

  constructor(user) {
    this.user = user
  }

  canActivate(params, config) {
    if (!this.user.projects.selectedProject) {
      return new Redirect('#/portal/projects');
    }

    this.project = this.user.projects.selectedProject;
    this.projectMembers = this.project.members || [];
    portal.setConfig('portalContext', 'project');

    portal.navAction = {
      title: 'Invite',
      method: ()=> this.inviteMember()
    }
  }

  canDeactivate() {
    portal.navAction = null;
  }

  inviteMember() {}

  setStatus(event, project) {
    let value = event.target.value;
  }
}
