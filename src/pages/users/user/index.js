import {Auth} from 'services/auth';
import {Users} from 'services/user';

export class UserPage {

  auth = Auth;
  context = {};

  constructor() {
    this.context.auth = this.auth;
  }

  configureRouter(config, router) {
    let context = this.context;
    let scope   = {
      projects(projects) {
        return projects.filter(p => p.user_id === Auth.user.id);
      }
    }

    config.mapRoute({
      route: ['', 'profile'],
      moduleId: './profile',
      name: 'profile',
      title: 'Profile',
      settings: {scope, context}
    })
    config.mapRoute({
      route: ['update'],
      moduleId: './update',
      name: 'update',
      title: 'Update',
      settings: {scope, context}
    })
    config.mapRoute({
      route: 'projects',
      moduleId: 'pages/project/list',
      name: 'projects',
      title: 'Projects',
      settings: {scope, context}
    })
    config.mapRoute({
      route: 'projects/:id',
      moduleId: 'pages/project/overview',
      name: 'project',
      title: 'Project',
      settings: {scope, context}
    })
  }

  activate(params) {
    console.dir(Users)
    Users.select(params.id).then((user)=> {
      this.context.user = user;
    })
  }
}
