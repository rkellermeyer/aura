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
  @bindable resizable = false;

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

    if (this.control && this.control.nodeName === 'TEXTAREA') {
      this.handleResize();
    }

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

  detached() {
    if (this.control) {
      this.control.events.disposeAll();
    }
  }

  handleResize() {

    const control = this.control;
    const events  = control.events;

    events.subscribe('change',  resize, true);
    events.subscribe('cut',     delayedResize, true);
    events.subscribe('paste',   delayedResize, true);
    events.subscribe('drop',    delayedResize, true);
    events.subscribe('keydown', delayedResize, true);

    function resize () {
      control.style.height = 'auto';
      control.style.height = control.scrollHeight+'px';
    }

    /* 0-timeout to get the already changed text */
    function delayedResize () {
      const id = setTimeout(()=> {
        clearTimeout(id);
        resize();
      }, 0);
    }
  }
}
