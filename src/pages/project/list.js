import {Container, inject} from 'aurelia-dependency-injection';
import {Project} from 'request/idyuh-project';


export class ProjectList {
  /**
   *   description
   */
  projects:Array = [];
  statusTypes:Array = Project.instance.statusTypes;

  canActivate(params, config) {
    return Project.instance.get()
      .then(projects => {
        if ('scope' in config.settings && 'projects' in config.settings.scope) {
          this.context = config.settings.context;
          return config.settings.scope.projects(projects);
        }
        return projects;
      })
      .then(projects => this.projects = projects);
  }

  setStatus(event, project) {
    let value = event.target.value;
  }
}
