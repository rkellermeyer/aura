import 'whatwg-fetch';
import environment from './environment';
import 'dom';
import 'polyfill';
import 'services/index';

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});


export function configure(aurelia) {
  aurelia.use
    .developmentLogging()
    .standardConfiguration()
    .feature('resources')
    .feature('services')

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }
  aurelia.start().then(() => aurelia.setRoot());
}
