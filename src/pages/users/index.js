export class Users {
  router = null;

  configureRouter(config, router){

    config.map([
      {
          route: ['', 'list']
        , moduleId: './list'
        , title: 'Users'
        , name: 'users'
        , settings: {}
      },
      buildRoute('profile', {
        nav: true,
      }),
      buildRoute('settings', {
        nav: true
      }),
      buildRoute('projects', {
        moduleId: 'pages/projects/list',
        nav: true,
      }),
      buildRoute('projects', {
        moduleId: 'pages/projects/overview',
        route: 'projects/overview'
      }),
      {
        route: 'profile',
        moduleId: './user/profile',
        title: 'Profile',
        name: 'profile',
        auth: true,
        nav: true,
      }
    ])

    config.mapUnknownRoutes(()=> {
      return 'views/404';
    })

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
