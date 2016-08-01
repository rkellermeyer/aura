import {Authorization} from 'app-core';

export class AppRouter {
  configure(routerConfig, router) {
    appRouterConfig(routerConfig);
    this.router = router;
    function appRouterConfig(config) {
      config.title = 'Aura';
      config.addPipelineStep('authorize', Authorization);
      config.map([
        {
          route: ['', 'welcome'], name: 'welcome', title: 'Welcome',
          moduleId: 'pages/welcome/index',
          nav: true,

        },
        {
          route: ['login'],
          moduleId: 'pages/auth/login', name: 'logout', title: 'Login',
          nav: true,
        },
        {
          route: ['logout'],
          moduleId: 'pages/auth/logout', name: 'logout', title: 'Logout',
          nav: true,
        },
        {
          route: 'portal',
          moduleId: 'pages/users/portal', name: 'portal', title: 'Portal',
          nav: true,
        },
        {
          route: 'show-down',
          moduleId: 'pages/show-down/index', name: 'show-down', title: 'Show Down',
          nav: true,
        },
        {
          route: 'child-router',
          moduleId: 'child-router', name: 'child-router', title: 'Child Router',
          nav: true,
        },
        {
          route: 'search-results',
          name: 'search-results', moduleId: 'pages/search/results',
          nav: false
        }
      ]);
    }
  }
}








