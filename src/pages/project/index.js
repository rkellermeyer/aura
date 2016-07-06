//import {Container, inject} from 'aurelia-dependency-injection';

export class Projects {
  configureRouter(config, router){
    config.map([
      {
          route: ['', 'list']
        , moduleId: './list'
        , title: 'Projects'
        , name: 'list'
        , settings: {}
      },
      {
          route: [':id', ':id/overview']
        , moduleId: './overview'
        , title: 'Project Overview'
        , name: 'overview'
        , settings: {}
      },
      {
          route: ':id/update'
        , moduleId: './update'
        , title: 'Update Project'
        , name: 'update'
        , settings: {}
      }
    ])

    config.mapUnknownRoutes(()=> {
      return 'views/404';
    })

    this.router = router;
  }
}
