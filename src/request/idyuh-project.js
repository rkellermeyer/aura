import {endpoint} from './decorators';

@endpoint('idyuh', 'project_profiles')
export class Project {

  configure(config) {
    config.getKey('project_profiles');
    config.findKey('project_profile');
  }

  initialize(client) {
    this.client = client;
    this.get  = (...args)=> client.get(...args);
    this.find = (...args)=> client.find(...args);
  }

  current(id) {
    if (this._currentProject) {
      return Promise.resolve(this._currentProject);
    }
    return this.find(id).then(project => {
      this._currentProject = project;
      return this._currentProject;
    })
  }
}
