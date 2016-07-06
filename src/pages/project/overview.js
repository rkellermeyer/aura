import {Project} from 'request/idyuh-project';

export class ProjectOverview {
  /**
   *   description
   */
  project:ProjectModel = null;

  activate(params) {
    Project.instance.current(params.id).then((project)=> {
      this.project = project;
    })
  }
}
