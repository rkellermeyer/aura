import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';

@customElement('user-profile')
@inject(DOM.Element, ElementEvents)
export class UserProfile {
  @bindable value = null;
  /**
   *   Container's Element event instance
   */
  _events:ElementEvents;

  /**
   *   The viewModel's HTML Element
   */
  _element:HTMLElement;

  constructor(element, events) {
    console.log({auth:this.auth})
    this._element = element;
    this._events = events;
    this.$element = $(this._element);
  }

  attached() {
    this.dropdown  = new Dropdown(this._element, {
      menu: true,
      handle: this._element.find('icon'),
      container: this._element.find('container')
    })
    this.dropdown.close();
    this.dropdown.bind();
  }

  detached() {
    this.dropdown.unbind();
  }
}
