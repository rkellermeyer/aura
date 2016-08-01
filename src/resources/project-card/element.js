import {Animation, AnimationGroup, Keyframe, translate3d, rotateY} from 'core/animate';

// From Tween.js (MIT license)
// @see https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L480-L484
let timingFunctionExpand = function (t) {
  return --t * t * t * t * t + 1;
};

// From Tween.js (MIT license)
// @see https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L480-L484
let timingFunctionCollapse = function (t) {
  if ((t *= 2) < 1) {
    return 0.5 * t * t * t * t * t;
  }

  return 0.5 * ((t -= 2) * t * t * t * t + 2);
};
const position_ = {
  FRONT: 'front',
  BACK: 'back'
}

const flipFrames_ = [
  {transform: rotateY(180)},
  {transform: rotateY(0)}
]

const rotateLeftFrames_ = [
  {transform: 'rotate(0deg) translate3d(0, 0, 0)'},
  {transform: 'rotate(-35deg) translate3d(-200%, 0, 0)'}
]


const rotateRightFrames_ = [
  {transform: 'rotate(0deg) translate3d(0, 0, 0)'},
  {transform: 'rotate(35deg) translate3d(200%, 0, 0)'}
]

const rotateOptions_ = {
  duration: 200
}

const flipOptions_ = {
  fill:'both',
  duration: 200,
  direction: 'alternate-reverse'
}


function calculateFromScreenBounds(n) {
  return ((100 * n) / window.screen.availWidth);
}

export default class Card {

  position:String = position_.FRONT;

  animations:Object = {};

  frames:Object = {};

  backdrop = document.createElement('card-backdrop');

  constructor(element, events) {
    this.element = element;
    this.events = events;

    this.frames.rotateRight = new Keyframe(element, rotateRightFrames_, rotateOptions_),
    this.frames.rotateLeft =  new Keyframe(element, rotateLeftFrames_, rotateOptions_),
    this.frames.flip = new Keyframe(element, flipFrames_, flipOptions_),

    this.animations.rotateRight = new Animation(this.frames.rotateRight);
    this.animations.rotateLeft = new Animation(this.frames.rotateLeft);
    this.animations.flip = new Animation(this.frames.flip);

    window.anim = this.animation;

    events.subscribe('click', (event)=> {
      if (this.onclick) this.onclick();
      if (event.target.classList.contains('card-rotate-left')) {
        event.preventDefault();
        return this.rotateOutLeft();
      }
      if (event.target.classList.contains('card-rotate-right')) {
        event.preventDefault();
        return this.rotateOutRight();
      }
      if (event.target.classList.contains('card-toggle-flip')) {
        event.preventDefault();
        return this.flip();
      }
    }, true);
  }

  flip() {
    if (this.isAnimating) return;

    if (this._isSmallScreenSize()) {
      this.isAnimating = true;
      this.animations.flip.onfinish = ()=> this.isAnimating = false;
      return this.animations.flip.run();
    }

    return this.displayCard();
  }

  rotateOutRight() {
    if (this.isAnimating) return
    this.isAnimating = true;
    this.animations.rotateRight.onfinish = (event)=> {
      this.element.events.publish('card-rotate-right', event);
      this.isAnimating = false;
    }
    this.animations.rotateRight.play()
  }

  rotateOutLeft() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.animations.rotateLeft.onfinish = (event)=> {
      this.isAnimating = false;
      this.element.events.publish('card-rotate-left', event);
    }
    this.animations.rotateLeft.play()
  }

  displayCard() {
    let rect = this.element.getBoundingClientRect();
    let size = rect.height > rect.width ? rect.height : rect.width;
    let currentLeft = calculateFromScreenBounds(rect.left);

    this.element.appendChild(this.backdrop);
    this.element
    this.backdrop.animate([
      {transform: `scale(3) `}
    ])

  }

  _isSmallScreenSize() {
    return window.screen.availWidth < 768;
  }
}


