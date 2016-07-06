import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DOM} from 'aurelia-pal';
import {Auth} from 'services/auth';

@customElement('app-bar')
@inject(DOM.Element, ElementEvents, EventAggregator)
export class AppBar {

  @bindable router:Router = null;
  @bindable routeConfig:NavModel = null;

  /**
   *   Container's Element event instance
   */
  _events:ElementEvents;

  /**
   *   The viewModel's HTML Element
   */
  _element:HTMLElement;

  constructor(element, events, eventAggregator) {
    this._element = element;
    this._events = events;
    this.eventAggregator = eventAggregator;
    this.auth = Auth;
  }

  attached(){}

  atcivateLogin() {

    this.eventAggregator.publish('show-login-dialog', {
      onComplete: ()=> {
        console.log('dialog closed')
      }
    });
  }

  logout() {
    Auth.user = null;
  }
}
