import {DOM} from 'aurelia-pal';

const className:Object<String> = {
  DRAGGING: 'dragging',
  TOUCH: 'touch'
}

const sideRotation:Object<Number> = {
  FRONT: 0, BACK: -180
};

const rotateY:Function = (value)=> {
  return `rotatey(${value}deg)`;
}

const transformX:Function = (value)=> {
  return `transform3d(${value}px, 0, 0)`;
}

function flipCard (element) {
  let nextSide    = 'BACK';
  if (element.classList.contains('flipped-back')) {
    nextSide    = 'FRONT';
    element.classList.remove('flipped-back');
  }
  else {
    element.classList.add('flipped-back');
  }

  let nextRotation = sideRotation[nextSide];
  return new Promise(resolve => {

    element.events.subscribeOnce('transitionend', ()=> {
      resolve();
    })

    Object.assign(element.style, {
      '-webkit-transition': 'all 0.5s ease 0s',
              'transition': 'all 0.5s ease 0s',
               'transform': rotateY(nextRotation)
    })
  })
}

function getPoint(event) {
  var point = {};
  if (event.targetTouches) {
    // console.log(event.targetTouches[0]);
    point.x = event.targetTouches[0].clientX;
    point.y = event.targetTouches[0].clientY;
  }
  else {
    // Either Mouse event or Pointer Event
    point.x = event.clientX;
    point.y = event.clientY;
  }
  return point;
}

function makeVelocityCalculator (e_init, callback) {
    var point = getPoint(e_init);
    var x = point.x,
        y = point.y,
        t = Date.now();
    return function(e) {
        var next = getPoint(e)
        var new_x = next.x,
            new_y = next.y,
            new_t = Date.now();
        var x_dist = new_x - x,
            y_dist = new_y - y,
            interval = new_t - t;
        var velocity = Math.sqrt(x_dist*x_dist+y_dist*y_dist)/interval;
        callback(velocity);
        // update values:
        x = new_x;
        y = new_y;
        t = new_t;
    };
}


export default function CardMotion(viewModel:ViewModel) {
  let _events  = viewModel._events;
  let _element = viewModel._element;

  Object.defineProperty(_element, 'cardMotion', {
    get:()=> this
  })

  let touchMoveEvent;
  let mouseMoveEvent;
  let nextpoint       = {};
  let nextX           = {};
  let currentX        = 0;
  let canceled        = false;
  let moved           = false;
  let initialPosition = {};
  let velocity        = 0;
  let lastVelocity    = 0;
  let currentSide     = 'FRONT';
  let nextRotate      = 0;
  let currentRotate   = 0;
  let calculate;

  let onend = (event)=> {
    event.preventDefault();
    if (!moved) {
      console.log(event)
      return flipCard(_element, currentSide).then(()=> {
        currentSide = currentSide === 'FRONT' ? 'BACK' : 'FRONT';
      })
    }

    _element.currentAnim && _element.currentAnim.cancel();
    _element.currentAnim = null;

    moved = false;
    touchMoveEvent && touchMoveEvent.dispose();
    mouseMoveEvent && mouseMoveEvent.dispose();
    currentX = nextX
    currentRotate = nextRotate;
    let test = currentX < 0 ? currentX * -1 : currentX;

    if (test > ((_element.clientWidth / 3) * 2)) {
      currentX = (currentX < 0 ? _element.clientWidth * -2 : _element.clientWidth * 2);
      currentRotate = currentX < 0 ? -45 : 45;
    }
    else {
      currentX = 0;
      currentRotate = 0;
    }

    window.requestAnimationFrame(()=> {
      _element.style.transition = `all 0.5s ease-out 0s`;
      if (currentX !== 0) {
        _element.style.transition = `all ${velocity}s linear 0s`;
      }
      _element.events.subscribeOnce('transitionend', ()=> {
        _element.classList.remove('active');
        if (currentX !== 0) {
          viewModel.onswipeOut(currentX);
        }
      })
      _element.style.transform = `translate3d(${currentX}px, 0, 0) rotate(${currentRotate}deg)`;
      velocity = 0;
      lastVelocity = 0;
    })
  }

  let onmove = (event)=> {
    event.preventDefault();

    if (moved === false) {
      moved = true;
      _element.style.transition = 'initial';
      _element.classList.add('active');
      return initialPosition = getPoint(event);
    }

    nextpoint = getPoint(event);
    calculate(event);

    window.requestAnimationFrame(()=> {
      _element.style.transition = 'initial';
      nextX = currentX - (initialPosition.x - nextpoint.x);
      let r = (nextX / 45);

      nextRotate = nextX < 0 ? (nextRotate - 1) : (nextRotate + 1);
      _element.style.transform = `translate3d(${nextX}px, 0, 0) rotate(${r}deg)`;
    })
  }

  this.onTouchStart = (e)=> {
    canceled = false;
    moved    = false;

    e.preventDefault();

    calculate = makeVelocityCalculator(e, v => {
      velocity = lastVelocity || v;
      lastVelocity = v;
    })

    DOM.events.subscribeOnce('touchend', (event)=> {
      onend(event);
    })

    DOM.events.subscribeOnce('mouseup', (event)=> {
      onend(event);
    })

    DOM.events.subscribeOnce('touchcancel', (event)=> {
      onend(event)
    });

    touchMoveEvent = DOM.events.subscribe('touchmove', (event)=> {
      onmove(event);
    });

    mouseMoveEvent = DOM.events.subscribe('mousemove', (event)=> {
      if (document.documentElement.classList.contains('platform-ios') || document.documentElement.classList.contains('platform-md')) {
        onmove(event);
      }
    });
  }

  this.dispose = ()=> {
    _element.events.disposeAll();
  }
}





