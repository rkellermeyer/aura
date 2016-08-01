import {computedFrom} from 'aurelia-binding';


export class UserPortal {

  router = null;

  _title = 'Portal';

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
      buildRoute('settings', {
        nav: true,
        icon: 'settings'
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
      buildRoute('project-overview', {
        moduleId: './project/overview',
        route: 'project/overview/:id',
        title: 'Project Overview',
      }),
      buildRoute('project-create', {
        moduleId: './project/create',
        route: 'projects/create',
        title: 'New Project',
      }),
      buildRoute('project-update', {
        moduleId: './projects/update',
        route: 'project/update/:id',
        title: 'Update Project',
      })
    ])

    config.mapUnknownRoutes(()=> {
      return 'views/404';
    })

    console.log(this)

    this.router = router;
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
