import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DOM} from 'aurelia-pal';
import {Authorize} from 'core/actions';
import state from 'app-state';
import channel from 'core/channel';

@customElement('app-bar')
@inject(Element, ElementEvents)
@bindable({
  name: 'router'
})
@bindable({
  name: 'routerConfig'
})
export class AppBar {
  state = state;
  constructor(element, events) {
    this.element = element;
    this.events = events;

    element.__proto__.float = (e)=> this.float(e);
  }

  float(value=true) {
    this.backdrop = this.backdrop = this.backdrop || this.element.querySelector('[name="backdrop"]');


    if (!this.backdrop) return;
    if (typeof value !== 'boolean') return;

    if (value !== this.isFloat) {
      this.isFloat = value;
      return this.backdrop.css({opacity: value ? 1 : 0})
    }
  }

  activateSignup() {
    this.eventAggregator.publish('show-signup-dialog', {
      onComplete: ()=> {
        console.log('dialog closed')
      }
    });
  }

  atcivateLogin() {
    this.eventAggregator.publish('show-login-dialog', {
      onComplete: ()=> {
        console.log('dialog closed')
      }
    });
  }

  logout() {
  }
}
