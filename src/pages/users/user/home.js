import portal from 'app-portal';

export class PortalHome {
  constructor() {}

  canActivate() {
    portal.setConfig('portalContext', 'default')
  }

  set header(value) {
    this._header = value;
    this.startAnimations(value);
  }

  startAnimations(header) {
    if (!header) return;

    // TweenMax.to(this.h2, 3, {
    //   // transform: 'rotateX(0deg)'
    // })
  }
}
