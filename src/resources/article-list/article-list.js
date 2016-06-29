import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';

@customElement('article-list')
@inject(DOM.Element, ElementEvents)
export class AppFooter {
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
    this._element = element;
    this._events = events;
  }

  attached(){}
}
