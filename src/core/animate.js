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
  ease: swiftEaseOutTimingFunction
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

export function scale(value) {
  return `scale(${value})`
}
