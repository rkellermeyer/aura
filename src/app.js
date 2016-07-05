
export class App {
  configureRouter(config, router) {
    config.title = 'Aura';
    config.map([
      {
        route: ['', 'welcome'],
        name: 'welcome',
        moduleId: 'pages/welcome/index',
        nav: true,
        title: 'Welcome'
      },
      {
        route: 'users',
        name: 'users',
        moduleId: 'pages/users/index',
        nav: true,
        title: 'Users'
      },
      {
        route: 'show-down',
        name: 'show-down',
        moduleId: 'pages/show-down/index',
        nav: true,
        title: 'Show Down'
      },
      {
        route: 'user-profile/:id',
        name: 'user-profile',
        moduleId: 'pages/users/profile',
        nav: false
      },
      {
        route: 'child-router',
        name: 'child-router',
        moduleId: 'child-router',
        nav: true,
        title: 'Child Router'
      },
      {
        route: 'search-results',
        name: 'search-results',
        moduleId: 'pages/search/results',
        nav: false
      }
    ]);

    this.router = router;
  }
}
