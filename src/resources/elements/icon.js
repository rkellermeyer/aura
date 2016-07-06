import {inject} from 'aurelia-dependency-injection';
import {noView, customElement, bindable, ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';
import {Loader} from 'aurelia-loader';
import {Cache} from 'services/cache';

const default_paths = {
  checkmark: 'checkmark.svg',
  close: 'close.svg',
  person: 'person.svg',
  more: 'more-vert.svg',
  'more-vert': 'more-vert.svg',
}

@customElement('icon')
@noView()
@inject(DOM.Element, ElementEvents, Loader, Cache)
export class IconElement {
  @bindable type = null;

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

  _getCached(icon) {
    return
  }

  _loadIcon(icon) {
    if (!icon) return Promise.resolve('');
    if (icon in default_paths) {
      icon = default_paths[icon];
    }
    let found
    if (found = this._cache.getItem(`icon.${icon}`)) {
      return Promise.resolve(found);
    }

    return this._loader.loadText(`resources/icons/${icon}`).then(text => {
      this._cache.setItem(`icon.${icon}`, text);
      return text;
    })
  }

  typeChanged(value) {
    this._loadIcon(value).then(text => {
      this._element.innerHTML = text;
      this.svg = this._element.querySelector('svg');
    })
  }

  attached(){}
}
