import {Container} from 'aurelia-dependency-injection';
import {ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';

Object.defineProperty(Element.prototype, 'events', {
  get() {
    return this._events = this._events || new ElementEvents(this);
  }
})

Object.defineProperty(document, 'events', {
  get() {
    return document._events = document._events || new ElementEvents(document.documentElement);
  }
})

Object.defineProperty(DOM, 'events', {
  get() {
    return document._events = document._events || new ElementEvents(document.documentElement);
  }
})

Object.defineProperty(DOM, 'Events', {
  get() {
    return ElementEvents
  }
})


/*
** Returns the caret (cursor) position of the specified text field.
** Return value range is 0-oField.value.length.
*/
DOM.getCaretPosition = function (oField) {

  // Initialize
  var iCaretPos = 0;

  // IE Support
  if (document.selection) {

    // Set focus on the element
    oField.focus();

    // To get cursor position, get empty selection range
    var oSel = document.selection.createRange();

    // Move selection start to 0 position
    oSel.moveStart('character', -oField.value.length);

    // The caret position is selection length
    iCaretPos = oSel.text.length;
  }

  // Firefox support
  else if (oField.selectionStart || oField.selectionStart == '0')
    iCaretPos = oField.selectionStart;

  // Return results
  return iCaretPos;
}
