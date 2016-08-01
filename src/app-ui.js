import state from 'app-state';
import {StateEvent} from 'core/actions';


export class UIState extends StateEvent {}
export class UI {
  state = {};

  setState(options) {
    this.state = state;
  }
}

export default state.register('ui', UI, UIState);
