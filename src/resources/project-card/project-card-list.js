import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';

@customElement('project-card-list')
@inject(DOM.Element, ElementEvents)
export class ProjectCardList {
  @bindable value = null;
  @bindable swipeLeft;
  @bindable swipeRight;

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

  get clientHeight() {
    this._element.offsetParent && this._element.offsetParent.clientHeight - 200;
  }

  bind(context) {

    let ontouch = (event)=> {
      if (event.target.nodeName === 'BUTTON') {return};

      let target = event.target;
      while(target.nodeName !== 'PROJECT-CARD' && target.nodeName !== 'PROJECT-CARD-LIST') {
        target = target.parentNode;
      }

      if (target.nodeName === 'PROJECT-CARD' && 'cardMotion' in target) {
        target.cardMotion.onTouchStart(event);
      }
    }

    this._events.subscribe('touchstart', ontouch, true);
    this._events.subscribe('mousedown',  ontouch, true);

    this._events.subscribe('swipe-left-end', (event)=> {
      if (this.swipeLeft) {
        this.swipeLeft.call(context, event.detail.model);
      }
    })

    this._events.subscribe('swipe-right-end', (event)=> {
      if (this.swipeRight) {
        this.swipeRight.call(context, event.detail.model);
      }
    })
  }
}
