import {Container, inject} from 'aurelia-dependency-injection';
import {ProjectModel} from 'server/project';
import projects from 'server/project';
// import {Project} from 'request/idyuh-project';


export class ProjectCreate {
  project = {};

  canActivate(params, config) {
  }

  submit() {
    let title = this.project.title;
    let project = projects.saveProject(this.project)
  }

  setStatus(event, project) {
    let value = event.target.value;
  }
}
