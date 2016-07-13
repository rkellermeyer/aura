import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';

let twoWay = {defaultBindingMode: 2}

@customElement('ui-select')
@inject(DOM.Element, ElementEvents)
export class UISelect {
  @bindable(twoWay) value = null;
  @bindable multiple      = null;
  @bindable options       = null;
  @bindable placeholder   = null;

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

  bind() {
    console.log(this)
  }

  attached(){
    this.select2 = $(this._element.querySelector('select')).select2({
      placeholder: this.placeholder,
      allowClear: true,
      tags: true
    });
  }
}
