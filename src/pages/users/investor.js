import {computedFrom} from 'aurelia-binding';
import portal from 'app-portal';


export class UserPortal {

  router = null;

  configureRouter(config, router){
    config.title = 'User Portal';
    config.map([
      {
          route: ['']
        , moduleId: './investor/home'
        , title: 'Portal'
        , name: 'portal'
        , settings: {}
      },
      buildRoute('profile', {
        nav: true,
        icon: 'account_circle'
      }),
      buildRoute('inbox', {
        moduleId: './inbox/index',
        nav: true,
        icon: 'sms'
      }),
      buildRoute('project-search', {
        moduleId: './investor/project/search',
        nav: false,
        // icon: 'apps'
      }),
      buildRoute('projects', {
        moduleId: './project/list',
        nav: true,
        icon: 'apps'
      }),
      buildRoute('groups', {
        moduleId: './investor/groups',
        nav: true,
        icon: 'group'
      }),
      buildRoute('reviews', {
        moduleId: './investor/reviews',
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
        moduleId: './investor/project/profile',
        route: 'projects/:projectId',
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

  activate() {
    portal.navAction = {
      title: 'Search',
      method: ()=> this.router.navigate('#/investor/project-search')
    }
  }

  bind() {
    this.router.projectNavigation = this.router.routes
      .filter(route => {
        return route.project;
      })
      .map(route => {
        route.navModel.href =  '#/investor/' +route.route;
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
  let moduleId = `./investor/${name}`
  let config = {route, name, title, nav, auth, settings, moduleId};
  return Object.assign(config, options);
}
