export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Users' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' },
      { route: 'user-profile/:id', name: 'user-profile', moduleId: 'user-profile', nav: false },  
      { route: 'search-results', name: 'search-results', moduleId: 'search-results', nav: false }
    ]);

    this.router = router;                                                                  
  }
}
