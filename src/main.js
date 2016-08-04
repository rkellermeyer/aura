import 'app-core';
import 'core/aurelia-container';
import 'core/action-events';
import 'app-state';
import 'app-portal';
import 'whatwg-fetch';
import environment from './environment';
import {Authentication} from 'server/auth';

// Configure Bluebird Promises.
// Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});


export function configure(aurelia) {

  aurelia.container.registerInstance(Authentication, aurelia.container.get(Authentication));

  aurelia.use
    .defaultBindingLanguage()
    .developmentLogging()
    .defaultResources()
    .history()
    .router()
    .eventAggregator()
    .feature('resources')

  aurelia.start().then(() => aurelia.setRoot());
}
