import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {Dropdown} from 'resources/dropdown';
import {DOM} from 'aurelia-pal';
import {User} from 'services/user';
import channel from 'core/channel';


@customElement('auth-nav')
@inject(DOM.Element, ElementEvents, User)
export class AuthNav {
  @bindable value = null;

  /**
   *   Container's Element event instance
   */
  events:ElementEvents;

  /**
   *   The viewModel's HTML Element
   */
  element:HTMLElement;

  constructor(element, events, user) {
    this.element = element;
    this.events = events;
    this.user = user;
  }

  attached(){
    this.dropdown  = new Dropdown(this.element, {
      menu: true,
      handle: this.element.find('icon'),
      container: this.element.find('container')
    })
    this.dropdown.close();
    this.dropdown.bind();
  }

  detached() {
    this.dropdown.unbind();
  }
}
