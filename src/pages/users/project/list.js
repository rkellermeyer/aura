import {inject} from 'aurelia-dependency-injection';
import state from 'app-state';
import {Users} from 'server/users';
import projects from 'server/project';


@inject(Users)
export class ProjectList {

  /**
   *   description
   */
  projects:Array = [];

  constructor(users) {
    this.users = users;
  }

  activate(params, config, navModel) {
    this.router = navModel.router;

    projects.all().then(()=> {
      this.projects = projects.toArray();
      console.log(this.projects)
    })

    // state.authorize( authorized => {
    //   this.authorized = authorized;
    //   console.log(this.authorized.projects);
    //   this.projects = this.authorized.projects;
    // })
  }

  setStatus(event, project) {
    let value = event.target.value;
  }

  createProject() {
    this.router.navigate('#/portal/projects/create')
  }
}
