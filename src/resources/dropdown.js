import {Container, inject} from 'aurelia-dependency-injection';
import {translate3d} from 'core/animate';
import {EventAggregator} from 'aurelia-event-aggregator';

export class Dropdown {

  _containerSelector = '[data-dropdown]';
  _handleSelector    = '[data-toggle-dropdown]';

  constructor(element, options = {}) {
    this.setElement(element);
    this.setContainer(options.container);
    this.setHandle(options.handle);
    this.eventAggegator = Container.instance.get(EventAggregator);
    this.isMenu = `menu` in options ? options.menu : this.isMenu;
  }

  setElement(element:HTMLElement) {
    if (element instanceof Element) {
      element.classList.add('dropdown');
      return this.element = element;
    }
    throw new Error('Downdown args[0] must be of type element');
  }
  setContainer(selector = '') {
    this.container = this.container || document.createElement('dropdown-container');

    let container = selector instanceof Element ? selector : this.element.find(selector || this._containerSelector);
    if (container instanceof Element) {
      container.classList.add('dropdown-container', 'menu');

      container.parentNode.insertBefore(this.container, container);
      this.container.appendChild(container);
      return this.container;
    }
    throw new Error('Downdown options.container must be of type element, or child selector');
  }

  setHandle(selector = '') {
    let handle = selector instanceof Element ? selector : this.element.find(selector || this._handleSelector);
    if (handle instanceof Element) {
      handle.classList.add('dropdown-handle');
      return this.handle = handle;
    }
    throw new Error('Downdown options.handle must be of type element, or child selector');
  }

  bind() {
    this.clickListener = this.handle.events.subscribe('click', ()=> {
      this.toggle(true);
    })

  }

  unbind() {
    this.clickListener.dispose();
    if (this.docListener) {
      this.docListener.dispose();
    }
  }

  toggle(open) {
    this.isOpen = (typeof open === 'boolean') ? open : !this.isOpen;
    this.container.style.display = this.isOpen ? '' : 'none';
    if (this.isOpen) {
      this.docListener = document.events.subscribe('click', (e)=> {
        this.toggle(false);
      })
    }
    else {
      if (this.docListener) {
        this.docListener.dispose();
      }
    }
  }

  open() {
    this.toggle(true);
  }

  close() {
    this.toggle(false);
  }
}
