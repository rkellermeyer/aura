Element.prototype.find = function(selector) {
  return this.querySelector(selector);
}

Element.prototype.findall = function(selector) {
  return Array.from(this.querySelectorAll(selector));
}


Element.prototype.class = function(...classNames) {
  let len = classNames.length;
  let first = len && classNames[0];
  let setType;

  if (!len) return;
  if (len === 1 && first === '') {
    this.className = '';
  }

  while(first = classNames.shift()) {
    first = first.trim();
    setType = first.startsWith('+=') ? 'add' : first.startsWith('-=') ? 'remove' : null;

    if (setType) {
      this.classList[setType](first.substr(2))
    }

    else {
      this.className = first;
    }
  }
}
