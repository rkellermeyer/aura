import {Container, inject} from 'aurelia-framework';
import {Project} from 'services/project';

export class ShowDown {

  accepted = [];
  denied   = [];

  activate() {
    Project.idyuh.get().then(res => {
      this.projects = res.project_profiles.map(p => (p.title = p.title || p.teaser.replace(/([a-zA-Z]+).+/, '$1')) && p);
      console.log(this.projects)
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
