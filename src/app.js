import {Idyuh} from 'request/idyuh-client';
import {Project} from 'request/idyuh-project';

export class App {

  constructor() {
    console.log(Project.instance)
    Project.instance.get().then(res => {
      console.log(res)
    })
  }
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
        route: ['login'],
        name: 'logout',
        moduleId: 'pages/auth/login',
        nav: true,
        title: 'Login'
      },
      {
        route: ['logout'],
        name: 'logout',
        moduleId: 'pages/auth/logout',
        nav: true,
        title: 'Logout'
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
