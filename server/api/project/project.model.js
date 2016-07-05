'use strict';
import Database from '../../data/database';

class ProjectModel {

  constructor() {
    Database.loadAPI('project_profiles').then(store => this.store = store);
  }

  index() {
    return Database.loadAPI('project_profiles').then(res => {
      resolve(res.data.project_profiles);
    })
  }

  find(id) {
    return this.index().then((data)=> {
      if (!id) return data;
      return data.find(item => item.id === id);
    })
  }

  findById(id) {
    return this.find(id);
  }
}


export default new ProjectModel();
