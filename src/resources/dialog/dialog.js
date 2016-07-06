import {inject} from 'aurelia-dependency-injection';
import {processContent, customElement, bindable, ElementEvents} from 'aurelia-templating';
import {EventAggregator} from 'aurelia-event-aggregator';
import {animate, scale, translate3d} from 'core/animate';
import {DOM} from 'aurelia-pal';
import {DialogCompiler} from './compiler';

@customElement('dialog')
@inject(DOM.Element, ElementEvents, EventAggregator)
export class Dialog {
  @bindable value = null;
  @bindable steps = 0;
  @bindable currentStep = 0;

  /**
   *   Container's Element event instance
   */
  _events:ElementEvents;

  /**
   *   The viewModel's HTML Element
   */
  _element:HTMLElement;

  constructor(element, events, eventAggregator) {
    this._element = element;
    this._events = events;
    this.eventAggregator = eventAggregator;
  }

  bind() {
    this.slotNode   = this._element.previousSibling;
    this.parentNode = this._element.parentNode;
  }

  attached() {
    if (this.steps) {
      this.stepElements = Array.from(this._element.querySelectorAll('dialog-step'));
      this.stepElements.forEach((step, index) => {

        step.au.controller.viewModel.onNext = ()=> {
          if (index !== (this.stepElements.length -1)) {
            this.currentStep = index+1;
          }
          else {
            this._events.publish('complete')
          }
        }
        if (index) {
          step.au.controller.viewModel.onBack = ()=> {
            this.currentStep = index-1;
          }
        }
      })
    }
  }

  getContainer() {
    this.container = document.querySelector('dialog-window');
    if (!this.container) {
      document.body.appendChild(this.container = document.createElement('dialog-window'));
    }
    return this.container;
  }

  activateDialog() {

    let frames = {
      from: {transform: scale(1.2), opacity: 0},
      to: {transform: scale(1), opacity: 1}
    }

    animate(document.querySelector('main'), {
      from: {filter: 'blur(0)'},
      to: {filter: 'blur(3px)'},
    })

    return new Promise(resolve => {
      this.currentResolve = ()=> {
        this.currentResolve = null;
        return resolve()
      }

      this.getContainer().appendChild(this._element);

      animate(this._element, frames, {duration:200}).then(()=> {
        this.getContainer().style.pointerEvents = 'auto';

        this.getContainer().events.subscribeOnce('click', (event)=> {
          if (!this._element.contains(event.target)) {
            this.deactivateDialog()
          }
        });
      })
    })
  }

  deactivateDialog() {
    let frames = {
      from: {transform: scale(1), opacity: 1},
      to: {transform: scale(1.2), opacity: 0},
    }
    animate(document.querySelector('main'), {
      from: {filter: 'blur(3px)'},
      to: {filter: 'blur(0)'},
    })

    return animate(this._element, frames, {duration:200}).then(()=> {
      this.getContainer().style.pointerEvents = 'none';
      this.parentNode.insertBefore(this._element, this.slotNode);
      this.currentResolve && this.currentResolve()
    })
  }

  currentStepChanged(value, last) {
    console.log(value)
    let frames;
    let stepSize = this.stepElements.length;
    let offset   = (100 / stepSize) * (last  || 0);
    let next     = (100 / stepSize) * (value || 0);

    frames = {
      from : {transform: translate3d(-1 * offset)},
      to: {transform: translate3d(-1 * next)}
    }

    animate(this._element.querySelector('dialog-container'), frames);
  }
}
