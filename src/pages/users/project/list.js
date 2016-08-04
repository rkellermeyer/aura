import {inject} from 'aurelia-dependency-injection';
import state from 'app-state';
import {User} from 'services/user';
import portal from 'app-portal';

@inject(User)
export class ProjectList {

  /**
   *   description
   */
  projects:Array = [];

  portal = portal;
  state  = state;

  constructor(user) {
    this.user = user;
  }

  canActivate() {
    portal.setConfig('portalContext', 'default')
  }

  activate(params, config, navModel) {
    this.router = navModel.router;
    portal.navAction = {
      title: 'Add',
      method: ()=> this.createProject()
    }
  }

  selectProject(project) {
    project.select();
    this.router.navigate('#/portal/project/overview');
  }

  setStatus(event, project) {
    let value = event.target.value;
  }

  createProject() {
    this.router.navigate('#/portal/projects/create')
  }

  deactivate() {
    portal.navAction = null;
  }
}
