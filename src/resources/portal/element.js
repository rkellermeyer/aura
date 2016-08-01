import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';
import channel from 'core/channel';
import portal from 'app-portal';

@customElement('app-portal')
@inject(DOM.Element, ElementEvents)
export class AppPortal {

  @bindable router = null;
  @bindable routerConfig = null;

  portal = portal;

  constructor(element, events) {
    this.element = element;
    this.events = events;
  }

  attached() {
    channel.publish('document-overflow', 'hidden');
  }

  detached() {
    channel.publish('document-overflow');
  }
}
