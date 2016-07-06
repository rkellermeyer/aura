//import {Container, inject} from 'aurelia-dependency-injection';

export class Users {
  router:Router = null;

  configureRouter(config, router){

    config.map([
      {
          route: ['', 'list']
        , moduleId: './list'
        , title: 'Users'
        , name: 'users'
        , settings: {}
      },
      {
          route: ':id'
        , moduleId: './user/index'
        , title: 'User'
        , name: 'user'
        , settings: {}
      }
    ])

    config.mapUnknownRoutes(()=> {
      return 'views/404';
    })

    this.router = router;
  }
}
