import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';
import {Authentication} from 'server/auth';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('login-dialog')
@inject(DOM.Element, ElementEvents, Authentication, EventAggregator)
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

    this.subscription = this.eventAggregator.subscribe('show-signup-dialog', (payload)=> {
      this.isSignup = true;
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
      password: this.newUser.password
    }

    if (this.isSignup) {
      this.isSignup = false;
      return this._auth.create(body).then(res => {
        this.dialog.deactivateDialog();
      })
    }

    this._auth.login(body).then(res => {
      this.dialog.deactivateDialog();
    })
  }
}
