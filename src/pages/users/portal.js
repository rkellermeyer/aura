import {inject} from 'aurelia-dependency-injection';
import {Redirect} from 'aurelia-router';
import {computedFrom} from 'aurelia-binding';
import {User} from 'services/user';

@inject(User)
export class UserPortal {

  router = null;

  _title = 'Portal';

  constructor(user) {
    this.user = user
  }

  canActivate() {
    return new Redirect('#/'+this.user.role);
  }

  @computedFrom('_title')
  get title() {
    return (this.router && this.router.currentInstruction) ? this.router.currentInstruction.config.title : this._title;
  }

  configureRouter(config, router){
    config.title = 'User Portal';
    config.map([
      {
          route: ['']
        , moduleId: './user/home'
        , title: 'Portal'
        , name: 'portal'
        , settings: {}
      },
      buildRoute('profile', {
        nav: true,
        icon: 'account_circle'
      }),
      buildRoute('projects', {
        moduleId: './project/list',
        nav: true,
        icon: 'apps'
      }),
      buildRoute('groups', {
        moduleId: './user/groups',
        nav: true,
        icon: 'group'
      }),
      buildRoute('reviews', {
        moduleId: './user/reviews',
        nav: true,
        icon: 'rate_review'
      }),
      buildRoute('project-create', {
        moduleId: './project/create',
        route: 'projects/create',
        title: 'New Project',
      }),
      buildRoute('project-overview', {
        moduleId: './project/overview',
        route: 'project/overview',
        title: 'Project Overview',
        project: true,
        icon: 'folder',
      }),
      buildRoute('project-profile', {
        moduleId: './project/profile',
        route: 'project/profile',
        title: 'Project Profile',
        project: true,
        icon: 'folder_special',
      }),

      buildRoute('project-members', {
        moduleId: './project/members',
        route: 'project/members',
        title: 'Project Members',
        project: true,
        icon: 'group',
      }),

      buildRoute('project-update', {
        moduleId: './project/update',
        route: 'project/update/:id',
        title: 'Update Project',
        project: true,
      })
    ])

    config.mapUnknownRoutes(()=> {
      return 'views/404';
    })

    console.log(this)

    this.router = router;
  }

  bind() {
    this.router.projectNavigation = this.router.routes
      .filter(route => {
        return route.project;
      })
      .map(route => {
        route.navModel.href =  '#/portal/' +route.route;
        return route.navModel
      })
  }
}

function buildRoute(name, options) {
  let route    = name;
  let title    = _.capitalize(name);
  let nav      = false;
  let auth     = false;
  let settings = {};
  let moduleId = `./user/${name}`
  let config = {route, name, title, nav, auth, settings, moduleId};
  return Object.assign(config, options);
}
