import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';
import {Auth} from 'services/auth';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('login-dialog')
@inject(DOM.Element, ElementEvents, Auth, EventAggregator)
export class LoginDialog {
  @bindable value = null;

  newUser = {};

  /**
   *   Container's Element event instance
   */
  _events:ElementEvents;

  /**
   *   The viewModel's HTML Element
   */
  _element:HTMLElement;

  constructor(element, events, auth, eventAggregator) {
    this._element = element;
    this._events = events;
    this._auth = auth;
    this.eventAggregator = eventAggregator;
  }

  attached(){
    this.subscription = this.eventAggregator.subscribe('show-login-dialog', (payload)=> {
      this.dialog.activateDialog().then(()=> {
        payload.onComplete();
      })
    })
  }

  detached() {
    this.subscription.dispose();
  }

  complete() {
    let body = {
      email: this.newUser.email,
      password: this.newUser.password,
      roles: [this.newUser.roles]
    }

    this._auth.login(body).then(res => {
      this.dialog.deactivateDialog();
    })
  }
}
