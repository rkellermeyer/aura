import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';
import channel from 'core/channel';
import portal from 'app-portal';
import server from 'server';
import {PortalAside} from './aside';

portal.aside = new PortalAside();


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

  bind() {
    server.get('/api/statuses').then(response => {
      this.filterOptions = response.content;
      console.log(this.filterOptions)
    })
  }

  routerConfigChanged(config) {
    this.headerNav = this.headerNav || this.element.querySelector('#header-nav');
    this.headerAnchor = this.headerNav.querySelector('a');
    let showBack = config.name !== 'portal';
    this.headerAnchor.classList[showBack ? 'add' : 'remove']('show-back-icon')
  }

  attached() {
    channel.publish('document-overflow', 'hidden');
  }

  detached() {
    channel.publish('document-overflow');
  }
}
