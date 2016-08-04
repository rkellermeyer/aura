import {inject} from 'aurelia-dependency-injection';
import {processContent, customElement, bindable, ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';
import CardCompiler from './compiler';
import CardMotion from './motion';
import Card from './element';

import 'gsap';

@customElement('project-card')
@processContent(CardCompiler)
@inject(DOM.Element, ElementEvents)
export class ProjectCard {

  @bindable model:Object = null;
  @bindable flip:Boolean = false;
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
    // this.card = new Card(element, events);
  }

  onswipeOut(position) {
    position = position > 0 ? 'right' : 'left';
    this._element.events.publish(`swipe-${position}-end`, this);
  }

  attached() {
    this._events.subscribe('click', ()=> {
      // this.expand()
    })

    this._events.subscribe('mouseover', ()=> {
      // console.log('over')
    })
  }

  detached() {
    if (this.cardMotion) {
      // this.cardMotion.dispose();
    }
  }

  flipChanged(value) {
    if (value && !this.cardMotion) {
      // this.cardMotion = new CardMotion(this);
    }
  }

  collapse() {
    if (!this.isExpanded) {
      return this.expand();
    }

    this.isExpanded = false;

    let backdrop = this.backdrop
    let node     = this._element;
    let parent   = node.parentNode;

    TweenMax.to(parent, 0.4, {
      maxHeight: parent.minHeight + 'px',
      ease: Expo.easeOut
    })

    TweenMax.to(node, 0.3, {
      flexBasis: '50%',
      alignSelf: 'flex-start',
      ease: Expo.easeOut
    })

    TweenMax.to(backdrop, 0.4, {
      transform: 'scale(0)',
      ease: Expo.easeOut
    })
  }

  expand() {
    if (this.isExpanded) {
      return this.collapse();
    }

    this.isExpanded = true;

    let node   = this._element;
    let parent = node.parentNode;
    let base   = parent.parentNode;
    let scrollLeft = parent.scrollLeft;
    let maxRight = scrollLeft + base.clientWidth;


    parent.minHeight = parent.clientHeight;

    TweenMax.to(parent, 0.3, {
      maxHeight: '100%',
      ease: Expo.easeOut,
      scrollLeft: (node.offsetLeft - 30) + 'px'
    })

    TweenMax.to(node, 0.5, {
      flexBasis: '95%',
      alignSelf: 'center',
      ease: Expo.easeOut
    })

    TweenMax.to(this.backdrop, 1, {
      transform: 'scale(7)',
      ease: Expo.easeOut
    })
  }
}
