import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {Dropdown} from 'resources/dropdown';
import {DOM} from 'aurelia-pal';
import {Authorize} from 'core/actions';
import channel from 'core/channel';


@customElement('auth-nav')
@inject(DOM.Element, ElementEvents)
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

  constructor(element, events) {
    this.element = element;
    this.events = events;

    channel.subscribe(Authorize, (payload)=> {
      this.authorized = payload.instruction;
    })
  }

  attached(){
    this.dropdown  = new Dropdown(this.element, {
      menu: true,
      handle: this.element.find('picture'),
      container: this.element.find('container')
    })
    this.dropdown.close();
    this.dropdown.bind();
  }

  detached() {
    this.dropdown.unbind();
  }
}
