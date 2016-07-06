import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {animate, translate3d} from 'core/animate';
import {DOM} from 'aurelia-pal';

@customElement('dialog-step')
@inject(DOM.Element, ElementEvents)
export class DialogStep {
  @bindable step  = 0;

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

  attached() {
    this.parentNode = this._element.parentNode;
  }

  next() {
    if (this.onNext) this.onNext()
  }

  back() {
    if (this.onBack) this.onBack()
  }
}
