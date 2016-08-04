import portal from 'app-portal';

const collapseFrames = [
  {flex: '0 0 200px'},
  {flex: '0 0 80px'},
]

const expandFrames = [
  {flex: '0 0 80px'},
  {flex: '0 0 200px'},
]

export class PortalAside {
  element = null;

  expand() {
    portal.setConfig('asideExpanded', true);
    this.animate()
  }

  collapse() {
    portal.setConfig('asideExpanded', false);
    this.animate()
  }

  toggleExpand() {
    portal.setConfig('asideExpanded', !portal.config.asideExpanded);
    this.animate()
  }

  animate() {
    const expanded = portal.config.asideExpanded;
    const frames = expanded ? collapseFrames : expandFrames;
    if (!this.element) return;

    this.element.classList[expanded ? 'add' : 'remove'](`portal-expanded`);
    this.element.animate(frames, {
      duration: 200,
      fill: 'forwards',
      easing: 'ease-out'
    })
  }
}
