import {Container, inject} from 'aurelia-dependency-injection';
import {Project} from 'request/idyuh-project';


export class ProjectList {
  /**
   *   description
   */
  projects:Array = [];

  activate(params, config) {
    Project.instance.get()
      .then(projects => {
        if ('scope' in config.settings && 'projects' in config.settings.scope) {
          return config.settings.scope.projects(projects);
        }
        return projects;
      })
      .then(projects => this.projects = projects);

  }
}
