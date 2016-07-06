import 'whatwg-fetch';
import environment from './environment';
import 'dom';
import 'polyfill';
import 'core/element';
import 'services/index';
import {Request} from 'request/service';
import 'request/idyuh-client';
import 'request/idyuh-project';
import 'request/idyuh-user';



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
  aurelia.container.get(Request).initialize(aurelia);
  aurelia.start().then(() => aurelia.setRoot());
}
