import {Container, inject} from 'aurelia-dependency-injection';
// import {Project} from 'request/idyuh-project';


export class ProjectList {
  /**
   *   description
   */
  projects:Array = [];
  // statusTypes:Array = Project.instance.statusTypes;

  canActivate(params, config) {
    if (config.name === 'projects') {
    }
  }

  setStatus(event, project) {
    let value = event.target.value;
  }
}
