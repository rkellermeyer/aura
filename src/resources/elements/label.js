import {Container, inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents, processContent} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';

function processLabel(compiler, resources, element, instruction) {

  let child = element.firstChild;
  let span;
  while(child) {
    let next = child.nextSibling;

    if (child.nodeType == 3 && child.textContent.trim()) {
      span = DOM.createElement('span')
      span.classList.add('text');
      element.insertBefore(span, child);
      span.appendChild(child);
    }

    child = next;
  }

  if (!!element.querySelector('switch')) {
    element.classList.add('has-switch');
  }

  return true;
}



@customElement('label')
@processContent(processLabel)
@inject(DOM.Element, ElementEvents, Container)
export class Label {
  @bindable value = null;

  /**
   *   Container's Element event instance
   */
  _events:ElementEvents;

  /**
   *   The viewModel's HTML Element
   */
  _element:HTMLElement;

  constructor(element, events, container) {
    this._element = element;
    this._events = events;

    this.instruction = container.instruction.elementInstruction;
    this.hasInput = this.instruction.hasInput;

  }

  attached(){
    this.control = this._element.querySelector('input, textarea');
    this.border  = this._element.querySelector('label-border');

    this._events.subscribe('focus', (event)=> {
      if (event.target === this.control) {
        this._element.classList.add('focus');
      }
    }, true)

    this._events.subscribe('blur', (event)=> {
      if (event.target === this.control) {
        this._element.classList.remove('focus');
      }
    }, true)
  }
}
