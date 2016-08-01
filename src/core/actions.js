const defaultProfileImage = 'images/Nikola-Tesla-200x200.png';

export class ProfileNav {
  constructor(options) {
    this.instruction = options;
    options.image = options.image || defaultProfileImage;
  }
}

export class Authorize {
  constructor(options) {
    this.instruction = options;
  }
}

export class DocumentScroll {
  overflow = '';

  exec(value) {
    requestAnimationFrame(()=> {
      document.documentElement.css({overflow});
    })
  }
}

export class StateEvent {
  constructor(instruction) {
    this.instruction = instruction;
  }

  bind(context) {
    this.context  = context;
    this.history  = context.state;
    this.state    = Object.assign({}, this.history, this.instruction);
    context.setState(this.state);
  }

  dispose() {
    if (this.context.state === this.state) {
      this.context.state = this.history;
    }
  }
}



export class PortalState extends StateEvent {};
export class AppState extends StateEvent {};
export class UIState extends StateEvent {};



