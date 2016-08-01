import {inject} from 'aurelia-dependency-injection';
import {noView, customElement, bindable, ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';
import {Loader} from 'aurelia-loader';
import {Cache} from 'services/cache';

const default_paths = {
  'checkmark': 'checkmark.svg',
  'close': 'close.svg',
  'person': 'person.svg',
  'more': 'more-vert.svg',
  'more-vert': 'more-vert.svg',
  'add-box':'add-box.svg',
  'fiber':'fiber.svg'
}

@customElement('icon')
@inject(DOM.Element, ElementEvents, Loader, Cache)
export class IconElement {

  @bindable type = null;
  @bindable md = null;

  /**
   *   Container's Element event instance
   */
  _events:ElementEvents;

  /**
   *   The viewModel's HTML Element
   */
  _element:HTMLElement;

  constructor(element, events, loader, cache) {
    this._element = element;
    this._events = events;
    this._loader = loader;
    this._cache = cache;
  }

  _loadIcon(icon) {
    // console.log('icon')
    if (!icon) return Promise.resolve('');
    if (icon in default_paths) {
      icon = default_paths[icon];
    }
    else {
      icon = icon + '.svg';
    }
    let found
    if (found = this._cache.getItem(`icon.${icon}`)) {
      return Promise.resolve(found);
    }

    // console.log('loading icon')
    return this._loader.loadText(`resources/icons/${icon}`).then(text => {
      // console.log('text')
      this._cache.setItem(`icon.${icon}`, text);
      return text;
    })
  }

  mdChanged(value) {
    if (value) {
      value = value.replace(/\s+|\-/, '_');
      this._element.innerHTML = `<i class="material-icons">${value}</i>`;
      this.mdicon = this._element.querySelector('.material-icons');
    }
    else if (this.mdicon) {
      this._element.removeChild(this.mdicon);
      this.mdicon = null;
    }
  }

  typeChanged(value) {
    // console.log(icon)
    this._loadIcon(value).then(text => {
      this._element.innerHTML = text;
      this.svg = this._element.querySelector('svg');
    })
  }

  attached(){
    this.md = this.md || this._element.getAttribute('md') || false;
    if (this.md) {
      this.mdChanged(this.md);
    }
  }
}
