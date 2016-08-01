import {Container} from 'aurelia-dependency-injection';
import {ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';

Object.defineProperty(Element.prototype, 'events', {
  get() {
    return this._events = this._events || new ElementEvents(this);
  }
})

Object.defineProperty(document, 'events', {
  get() {
    return document._events = document._events || new ElementEvents(document.documentElement);
  }
})

Object.defineProperty(DOM, 'events', {
  get() {
    return document._events = document._events || new ElementEvents(document.documentElement);
  }
})

Object.defineProperty(DOM, 'Events', {
  get() {
    return ElementEvents
  }
})
