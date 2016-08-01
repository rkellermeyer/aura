import {inject} from 'aurelia-dependency-injection';
import {customElement, processContent, noView, ElementEvents} from 'aurelia-templating';
import {compileSwitch} from './compile';

@customElement('switch')
@noView()
@processContent(compileSwitch)
@inject(Element, ElementEvents)
export class SwitchElement {
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
