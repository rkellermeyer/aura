import {Container, inject} from 'aurelia-framework';
// import {Project} from 'request/idyuh-project';
import projects from 'server/project';

export class ShowDown {

  accepted = [];
  denied   = [];

  activate() {
    projects.all().then(prs => {
      this.projects = prs;
    })
  }

  acceptedProject(project) {
    let index = this.projects.indexOf(project);
    if (~index) {
      this.projects.splice(index, 1)
    }
    this.accepted.push(project);
  }

  deniedProject(project) {
    let index = this.projects.indexOf(project);
    if (~index) {
      this.projects.splice(index, 1)
    }
    this.denied.push(project);
  }
  //configureRouter(){}
}
