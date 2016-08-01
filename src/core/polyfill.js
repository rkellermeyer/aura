Function.isFunction = (f)=> typeof f === 'function';
Function.noop = ()=> {return null}


window.pointerDownName = 'MSPointerDown';
window.pointerUpName = 'MSPointerUp';
window.pointerMoveName = 'MSPointerMove';

if(window.PointerEvent) {
  window.pointerDownName = 'pointerdown';
  window.pointerUpName = 'pointerup';
  window.pointerMoveName = 'pointermove';
}

// Simple way to check if some form of pointerevents is enabled or not
window.PointerEventsSupport = false;
if(window.PointerEvent || window.navigator.msPointerEnabled) {
  window.PointerEventsSupport = true;
}

window._Animation = window.Animation;





(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());