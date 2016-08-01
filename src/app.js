import {inject} from 'aurelia-dependency-injection';
import {AppRouter} from 'app-router';

@inject(AppRouter)
export class App {

  constructor(appRouterConfig) {
    this.appRouterConfig = appRouterConfig;
  }

  configureRouter(...args) {
    this.appRouterConfig.configure(...args);
  }
}
