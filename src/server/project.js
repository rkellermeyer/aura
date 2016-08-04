import {Server} from './index';
import {observable} from 'aurelia-binding';
import state from 'app-state';

export class ProjectProfileModel {
  teaser:String;
  overview:String;
  category_id:Number;
  statuses:Array = [];
  user_id:Number;
  project:ProjectModel;
}

export class ProjectModel {
  funding_goal:String;
  title: String;
  abtz:String;
}

class Projects {

  @observable current = null;

  map = new Object();

  constructor() {
    this.server = state.containerGet(Server)
  }

  toArray() {
    return _.values(this.map);
  }

  currentChanged(project, oldProject) {
    if (oldProject) {
      oldProject.isSelected = false;
    }

    if (project) {
      project.isSelected = true;
    }
  }

  all() {
    return this.server.getProjects().then((projects)=> {
      return  projects.map(model => {
        let project = this.hasProject(model.id) ? this.getProjectById(model.id) : new Project(model);
        this.setProject(model.id, project);
        return project;
      })
    })
  }

  hasProject(id) {
    return !!this.map[id];
  }

  getProjectById(id) {
    return this.map[id];
  }

  setProject(id, project) {
    this.map[id] = project;
  }

  createProject(model) {
    return new Project(model);
  }

  saveProject(model) {
    let project = new Project(model);

    if (!model.user_id) {
      model.user_id = state.authorized.id;
      model.userRef = state.authorized._id;
    }

    if (model._id) {
      return this.server.updateProject(model._id, model);
    }

    return this.server.newProject(model)
      .then(model => {
        project.model = null;
        project.model = model;
        project.assign(model);
        return project;
      })
  }

  deleteProject(project) {
    return this.server.deleteProject(project.model._id);
  }
}

const projects = new Projects();

export default projects;

export class Project {
  model:ProjectProfileModel;

  constructor(model) {
    this.assign(model);
    this.repo   = projects;
    this.server = projects.server;
  }

  assign(instruction:Object = {}):ProjectProfileModel {
    if (!this.model) {
      this.model = instruction
    }
  }

  select() {
    projects.current = this;
  }

  save() {
    return this.repo.saveProject(this);
  }

  delete() {
    return this.server.deleteProject(this);
  }
}


