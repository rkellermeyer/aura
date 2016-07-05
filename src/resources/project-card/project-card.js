import {inject} from 'aurelia-dependency-injection';
import {processContent, customElement, bindable, ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';
import CardCompiler from './compiler';
import CardMotion from './motion';


@customElement('project-card')
@processContent(CardCompiler)
@inject(DOM.Element, ElementEvents)
export class ProjectCard {

  @bindable model;
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

  onswipeOut(position) {
    position = position > 0 ? 'right' : 'left';
    this._element.events.publish(`swipe-${position}-end`, this);
  }

  detached() {
    if (this.cardMotion) {
      this.cardMotion.dispose();
    }
  }

  attached(){
    this.cardMotion = new CardMotion(this);
  }
}
