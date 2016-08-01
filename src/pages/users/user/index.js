import {Users} from 'server/users';
import {inject} from 'aurelia-dependency-injection';
import portal from 'app-portal';

@inject(Users)
export class UserPage {
  context = {};

  constructor(users) {
    this.users = users;

    portal.configureNav(navigation => {
      navigation.map([
        {
          route: 'settings',
          icon: 'settings',
          title: 'Settings'
        }
      ])
    })
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
    if (this.users.current) {
      this.context.user = this.users.current;
    }
  }
}
