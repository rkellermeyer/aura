import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';

const twoWay = {defaultBindingMode:2}

@customElement('status-filter')
@inject(DOM.Element, ElementEvents)
export class StatusFilter {
  @bindable(twoWay) value = null;

  @bindable options = null;

  open = false;

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
  }

  attached(){}
}
