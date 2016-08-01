export class PortalHome {
  constructor() {}

  set header(value) {
    this._header = value;
    this.startAnimations(value);
  }

  startAnimations(header) {
    if (!header) return;
    header.innerHTML = `<h1>Welcome</h1>`;
    this.h2 = header.firstChild;
    header.style.margin = 'auto';

    TweenMax.set(this.h2, {
      transform: 'rotateX(90deg)',
      textAlign: 'center',
      fontSize: '120px',
      margin: 'auto',
      textShadow: '2px 4px 5px rgba(0,0,0,0.3)',

    })

    TweenMax.to(this.h2, 3, {
      transform: 'rotateX(0deg)'
    })
  }
}
