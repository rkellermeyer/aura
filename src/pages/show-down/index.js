import {Container, inject} from 'aurelia-framework';
import {Project} from 'request/idyuh-project';


export class ShowDown {

  accepted = [];
  denied   = [];

  activate() {
    Project.instance.get().then(projects => {
      this.projects = projects.map(p => (p.title = p.title || p.teaser.replace(/([a-zA-Z]+).+/, '$1')) && p);
    });
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
