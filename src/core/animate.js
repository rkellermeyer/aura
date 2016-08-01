const swiftEaseOutTimingFunction   = 'cubic-bezier(0.25, 0.8, 0.25, 1)';
const swiftEaseInTimingFunction    = 'cubic-bezier(0.55, 0, 0.55, 0.2)';
const swiftEaseInOutTimingFunction = 'cubic-bezier(0.35, 0, 0.25, 1)';
const direction = 'alternate';
const fill = 'forwards';
const duration = 150;

const defaultOptions = {
  fill: 'forwards',
  direction: 'alternate',
  duration: 150,
}

const easing = {
  swiftOut: swiftEaseOutTimingFunction,
  swiftIn: swiftEaseInTimingFunction,
  swiftInOut: swiftEaseInOutTimingFunction
}

export function animate(element, frames, options = {}) {
  options = Object.assign({}, defaultOptions, options);
  return new Promise(resolve => {
    element.animate([frames.from, frames.to], options).onfinish = ()=> {
      resolve();
    }
  })
}


export function translate3d(x=0, y=0, z=0) {
  return `translate3d(${x}%, ${y}%, ${z})`
}

export function translateY(x=0) {
  return `translateY(${x}%)`
}

export function translateX(x=0) {
  return `translateX(${x}%)`
}

export function scale(value) {
  return `scale(${value})`
}

export function rotateY(v:Number = 0) {
  return `rotateY(${v}deg)`
}

export function rotateX(v:Number = 0) {
  return `rotateY(${v}deg)`
}

export function rotate(v:Number = 0) {
  return `rotate(${v}deg)`
}

export class Keyframe extends KeyframeEffect {
  constructor(element, frames, timings) {
    if (typeof timings === 'number') timings = {duration: timings};
    timings = Object.assign({}, defaultOptions, timings);
    if ('easing' in timings && timings.easing in easing) {
      timings.easing = easing[timings.easing];
    }
    super(element, frames, timings);
  }
}


export class AnimationGroup extends GroupEffect {
  constructor(first, ...frames) {
    super(Array.isArray(first) ? first : [first, ...frames])
  }

  play() {
    return document.timeline.play(this);
  }
}


export class Animation extends _Animation {

  _reversed = false;

  constructor(frames:Keyframe, timeline:AnimationTimeline) {
    timeline = timeline || document.timeline;
    super(frames, timeline);
  }

  reverse() {
    super.reverse();
    this._reversed = !this._reversed;
  }

  run() {
    if (this.isFinished()) {
      return this.reverse();
    }
    if (this.isIdle()) {
      return this.play();
    }
  }

  isPaused() {
    return this.playState === 'paused';
  }

  isIdle() {
    return this.playState === 'idle';
  }

  isRunning() {
    return this.playState === 'running';
  }

  isFinished() {
    return this.playState === 'finished';
  }
}
