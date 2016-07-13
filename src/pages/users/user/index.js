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
      nav: true,
      settings: {scope, context}
    })
    config.mapRoute({
      route: 'projects',
      moduleId: 'pages/project/list',
      name: 'projects',
      title: 'Projects',
      nav: true,
      settings: {scope, context}
    })
    config.mapRoute({
      route: ['settings'],
      moduleId: './settings',
      name: 'settings',
      title: 'Settings',
      nav: true,
      settings: {scope, context}
    })
    config.mapRoute({
      route: 'projects/create',
      moduleId: 'pages/project/create',
      name: 'project-create',
      title: 'Create Projects',
      nav: false,
      settings: {scope, context}
    })
    config.mapRoute({
      route: 'projects/:id',
      moduleId: 'pages/project/overview',
      name: 'project',
      title: 'Project',
      nav: false,
      settings: {scope, context}
    })

    this.router = router;
  }

  activate(params) {
    Users.select(params.id).then((user)=> {
      this.context.user = user;
    })
  }
}
