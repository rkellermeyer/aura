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
          route: ['signup'],
          moduleId: 'pages/auth/signup', name: 'signup', title: 'Signup',
          nav: true,
        },
        {
          route: ['logout'],
          moduleId: 'pages/auth/logout', name: 'logout', title: 'Logout',
          nav: true,
          auth: true
        },
        {
          route: 'portal',
          moduleId: 'pages/users/portal', name: 'portal', title: 'Portal',
          nav: true,
          auth: true,
        },
        {
          route: 'dreamer',
          moduleId: 'pages/users/dreamer', name: 'dreamer', title: 'Portal',
          nav: true,
          auth: true,
        },
        {
          route: 'investor',
          moduleId: 'pages/users/investor', name: 'investor', title: 'Portal',
          nav: true,
          auth: true,
        },
        {
          route: 'show-down',
          moduleId: 'pages/show-down/index', name: 'show-down', title: 'Show Down',
          nav: true,
          auth: true,
        },
        {
          route: 'child-router',
          moduleId: 'child-router', name: 'child-router', title: 'Child Router',
          nav: true,
          auth: true,
        },
        {
          route: 'search-results',
          name: 'search-results', moduleId: 'pages/search/results',
          nav: false,
          auth: true,
        }
      ]);
    }
  }
}








