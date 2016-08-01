

Element.prototype.find = function(selector) {
  return this.querySelector(selector);
}

Element.prototype.findall = function(selector) {
  return Array.from(this.querySelectorAll(selector));
}

Element.prototype.css = function(key, value) {
  let options = key;
  if (typeof key === 'string') {
    options = {}
    options[key] = value;
  }

  Object.assign(this.style, options);
}


Element.prototype.fadeOut = function(duration) {
  duration = duration|| 300;
  return this.animate([{opacity: 1}, {opacity: 0}], duration);
}

Element.prototype.fadeIn = function(duration) {
  duration = duration|| 300;
  return this.animate([{opacity: 0}, {opacity: 1}], duration);
}

Element.prototype.getOffset = function() {
    var elem = this;
    var docElem, win,
      box = {top: 0, left: 0},
      doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
        box = elem.getBoundingClientRect();
    }
    win = window
    let offset = {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft,
    };
    offset.right = (window.innerWidth - offset.left) - elem.clientWidth;
    return offset;
}

// Element.prototype.class = function(...classNames) {
//   let len = classNames.length;
//   let first = len && classNames[0];
//   let setType;

//   if (!len) return;
//   if (len === 1 && first === '') {
//     this.className = '';
//   }

//   while(first = classNames.shift()) {
//     first = first.trim();
//     setType = first.startsWith('+=') ? 'add' : first.startsWith('-=') ? 'remove' : null;

//     if (setType) {
//       this.classList[setType](first.substr(2))
//     }

//     else {
//       this.className = first;
//     }
//   }
// }
