import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {observable, computedFrom} from 'aurelia-binding';
import {DOM} from 'aurelia-pal';
import {ES} from 'core/es';

var twoWay = {defaultBindingMode: 2};
const keyCodes  = {};
keyCodes.DOWN   = 40;
keyCodes.UP     = 38;
keyCodes.RIGHT  = 39;
keyCodes.LEFT   = 37;
keyCodes.DELETE = 8;
keyCodes.TAB    = 9;

class Option {
  @observable element = null;

  _keyProperty = '';

  constructor(model, list, viewModel) {
    this.list = list
    this.model = model
    this.viewModel = viewModel
  }

  @computedFrom('_keyProperty')
  get display() {
    return this.viewModel.display ? this.model[this.viewModel.display] : this.model.value;
  }

  remove() {
    let index = this.list.indexOf(this.model);
    if (~index) {
      this.list.splice(index, 1);
    }
  }

  focus() {
    this.element.focus()
  }

  elementChanged(node) {
    if (!node) return;
    node.tabIndex = 0;
    node.style.pointerEvents = 'auto';
    node.tagOption = this;
  }
}


@customElement('tag-input')
@inject(DOM.Element, ElementEvents)
export class TagInput {
  @bindable(twoWay) selected = [];
  @bindable options = [];
  @bindable display = null;
  @bindable label = null;

  searchValue = '';
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
    this.searchNavigation = new SearchNavigation(this);
  }

  _mapOptions(options) {
    options.forEach(o => {
      o.tagOption = new Option(o, options, this)
    })
  }

  attached() {
    this.searchNavigation.bind(this.control, this.list);
  }

  selectedChanged(value) {
    if (!value) {
      this.selected = [];
    }
  }

  selectOption() {
    const option = this.options.find(o => o[this.display] === this.searchValue);
    if (option) {
      option.tagOption = option.tagOption || new Option(option, this.selected, this);
      option.tagOption.list = this.selected;
      this.selected.push(option);
      this.searchValue = '';
      this.control.focus();
    }
  }

  optionsChanged() {
    if (this.options) {
      this._mapOptions(this.options)
    }
  }
}

export class SearchNavigation {
  constructor(viewModel) {
    this.viewModel = viewModel
  }


  bind(control, list) {
    this.list    = list;
    this.control = control;
    const events = this.viewModel._events;

    const viewModel = this.viewModel;
    events.subscribe('blur', (event)=> {
      if (event.target === control) {
        event.preventDefault();
        viewModel.selectOption();
      }
    }, true)

    events.subscribe('keydown', (event)=> {
      const code = event.keyCode;
      const keyCodeProps = {
        top: code === keyCodes.TOP,
        left: code === keyCodes.LEFT,
        right: code === keyCodes.RIGHT,
        bottom: code === keyCodes.BOTTOM,
        delete: code === keyCodes.DELETE,
        tab: code === keyCodes.TAB
      }
      if (document.activeElement === control) {
        controlListener.call(this, event, event.target, keyCodeProps);
      }
      else if (list.contains(event.target)) {
        listListener.call(this, event, event.target, keyCodeProps);
      }
    }, true);

    function listListener(event = {}, node:HTMLElement, options = {}) {
      const isItem = event.target.nodeName === 'LI';
      const isForm = event.target.nextElementSibling && event.target.nextElementSibling.nodeName === 'FORM';
      console.log(event)
      if (isItem && options.left) {
        const previousSibling = event.target.previousElementSibling || control;
        event.preventDefault();
        if (previousSibling) {
          previousSibling.focus();
        }
      }

      else if ((isItem || isForm) && options.right) {
        const nextSibling = isForm ? control : event.target.nextElementSibling ? event.target.nextElementSibling : control;
        event.preventDefault();
        if (nextSibling) {
          nextSibling.focus();
        }
      }
      else if (isItem && options.delete) {
        event.preventDefault();
        const previousSibling = event.target.previousElementSibling;
        const tagOption = event.target.tagOption;

        tagOption.remove();

        if (previousSibling) {
          previousSibling.focus();
        }
        else {
          control.focus();
        }
      }
    }

    function controlListener(event = {}, node:HTMLElement, options = {}) {
      if (options.delete && !viewModel.searchValue) {
        event.preventDefault();
        const model = viewModel.selected[viewModel.selected.length -1];
        if (model) {
          const previousSibling = model.tagOption.element.previousElementSibling;
          model.tagOption.remove();
          viewModel.searchValue = model.tagOption.display;
          control.focus();
        }
      }

      else if (options.left) {
        event.preventDefault();
        const cursorPosition = DOM.getCaretPosition(control);

        if (cursorPosition === 0) {
          const model = viewModel.selected[viewModel.selected.length -1];
          if (model) {
            model.tagOption.focus();
          }
        }
      }
    }
  }
}
