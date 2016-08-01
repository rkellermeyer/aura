import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, ElementEvents} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';

@customElement('welcome-card')
@inject(Element, ElementEvents)
export class WelcomeCard {

  @bindable picture = null;
  @bindable background = null;

  isScaled = false;

  constructor(element, events) {
    this._element = element;
    this._events = events;
  }

  bind(context) {
    this.context = context.card;
  }

  attached() {
    this._content = this._element.querySelector('card-content');

    this._events.subscribe('mouseenter', (event)=> {
      if (event.target === this._element) {
        this.scaleUp();
      }
    })

    this._events.subscribe('mouseleave', (event)=> {
      if (event.target === this._element) {
        this.scaleDown();
      }
    })

    this._events.publish('attach-directive-card')
  }

  detach() {
    this._events.publish('detach-directive-card')
  }

  scaleUp() {
    if (!this.isScaled) {
      this.isScaled = true;

      // this._content.animate([
      //   {transform: 'scale(1)'},
      //   {transform: 'scale(1.2)'},
      // ], {fill:'forwards', duration: 400, easing: 'ease-out'});
    }
  }

  scaleDown() {
    if (this.isScaled) {
      this.isScaled = false;

      // this._content.animate([
      //   {transform: 'scale(1.2)'},
      //   {transform: 'scale(1)'},
      // ], {fill:'forwards', duration: 400, easing: 'ease-in'});
    }
  }
}









/**
 * Designed by @Taras Shypka
 * https://dribbble.com/Bugsster
 * Coded by @Balaj Marius for @Designmodo
 * http://mariusbalaj.com | http://designmodo.com
 */

directiveCards();
function directiveCards() {

  let attached = new Map();
  let winHeight = window.screen.availHeight;
  let winWidth  = window.screen.availWidth;
  let currentCard;

  let getRotation = (pos, mid, max)=> {
    return ((mid - pos) / mid) * max;
  }

  let mousemove = (event)=> {

    if (!currentCard) {
      return;
    }

    let clientWidth  = currentCard.clientWidth;
    let clientHeight = currentCard.clientHeight;
    let size = clientWidth;

    if (clientHeight > clientWidth) {
      size = clientHeight;
    }

    if (!currentCard.currentOffset) {
      currentCard.currentOffset = currentCard.getOffset();
    }

    if (winHeight !== window.screen.availHeight || winWidth !== window.screen.availWidth) {
      currentCard.currentOffset = currentCard.getOffset();
    }

    let o = currentCard.currentOffset;

    let x = ((event.offsetX || event.layerX) - (clientWidth / 2));
    let y = ((event.offsetY || event.layerY) - (clientHeight / 2));

    let xpos = event.pageX - o.left;
    let ypos = event.pageY - o.top;

    let centerX = (clientWidth / 2);
    let centerY = (clientHeight / 2);
    let theta = Math.atan2(x, y); //angle between cursor and center of poster in RAD
    let angle = theta * 180 / Math.PI - 90; //convert rad in degrees
    if (angle < 0) {
      angle = angle + 360;
    }
    let gradientX = (xpos / (centerX * 2)) * 100;
    let gradientY = (ypos / (centerY * 2)) * 100;
    let gradient  = 2 * (Math.max(centerX*2, centerY*2)*2);
    let maxRotation = 12;
    let maxTranslate = 5;

    let radialX = getRotation(xpos, centerX, maxRotation);
    let radialY = getRotation(ypos, centerY, maxRotation);
    let tranX   = getRotation(xpos, centerX, maxTranslate);
    let tranY   = getRotation(ypos, centerY, maxTranslate);

    let translateX = (-1 * tranX);
    let translateY = (-1 * tranY);
    let rotateX = (-1 * radialY);
    let rotateY = radialX;
    let transform = `translate3d(${translateX}%, ${translateY}%, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    let radialGradient = `radial-gradient(${gradient}px at ${gradientX}% ${gradientY}%, rgba(255,255,255, .25), transparent)`;
    let shadowX = (-0.5 * getRotation(xpos, centerX, 12))
    let shadowY = (24 + (-0.5 * getRotation(ypos, centerY, 12)))
    let spread  = 24;
    let shadowColor = 'rgba(0, 0, 0, .33)';
    let shadow = `${shadowX}px ${shadowY}px ${spread}px -10px ${shadowColor}, 0 12px 20px -6px rgba(0,0,0,0.3)`;

    requestAnimationFrame(()=> {
      if (currentCard) {
        currentCard.shineNode.css('background', radialGradient);
        currentCard.css('transform', transform);
        currentCard.bgNode.css('boxShadow', shadow);
      }
    })
  }

  let attachCard = (e)=> {
    let node = e.target;
    node.contentNode = node.querySelector('card-content');
    node.shineNode = node.querySelector('.shine');
    node.bgNode = node.querySelector('card-background');
    attached.set(node, node);

    node.events.subscribe('mouseenter', ()=> {
      if (e.target !== node) return;
      currentCard = node;
    })

    node.events.subscribe('mouseleave', (e)=> {
      if (e.target !== node) return;
      if (currentCard === node) {
        currentCard = null;
      }
      node.css({
        transitionDuration: '0.2s',
        transform: ''
      })
      node.shineNode.css({
        background: ''
      })
      node.bgNode.css({
        boxShadow: ''
      })
    })
  }

  let detachCard = (e)=> {
    if (attached.has(e.target)) {
      e.target.events.disposeAll();
      attached.delete(e.target);
    }
  }


  document.events.subscribe('attach-directive-card', attachCard, true);
  document.events.subscribe('detach-directive-card', detachCard, true);
  document.events.subscribe('mousemove', mousemove, true);
}


function init3dcard(element, events) {

  // element = element.querySelector('card-content');

  let content = element.querySelector('card-content');
  let shine   = element.querySelector('.shine');
  let layers  = Array.from(element.querySelectorAll('div[class*="layer-"]'));

  content.css('-webkit-transform-style', 'preserve-3d');
  content.css('transform-style', 'preserve-3d');

  let contentWidth;
  let contentHeight;
  let contentScale;

  let setDefaultStyle = [];
  let setCardStyle = ()=> {
    contentWidth  = content.clientWidth;
    contentHeight = content.clientHeight;
    contentScale  = contentWidth/700;
    content.css('transform','translate3d(0,0,0) matrix3d(1,0,0.00,0.00,0.00,1,0.00,0,0,0,1,0,0,0,0,1) scale('+contentScale+')')
  }

  setCardStyle()

  events.subscribe('mousemove', (e)=> {

    let height = content.clientHeight

    let w = document.body.clientWidth; //window width
    let h = document.body.clientHeight; //window height
    let offsetX = 0.5 - e.pageX / w; //cursor position X
    let offsetY = 0.5 - e.pageY / h; //cursor position Y
    let dy = e.pageY - h / 2; //@h/2 = center of poster
    let dx = e.pageX - w / 2; //@w/2 = center of poster

    console.log({dy, dx})

    let theta = Math.atan2(dy, dx); //angle between cursor and center of poster in RAD
    let angle = theta * 180 / Math.PI - 90; //convert rad in degrees
    let offsetPoster = 5;
    let transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)'; //poster transform

    //get angle between 0-360
    if (angle < 0) {
      angle = angle + 360;
    }

    //gradient angle and opacity
    shine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + e.pageY / h + ') 0%,rgba(255,255,255,0) 80%)');

    //poster transform
    content.css('transform', transformPoster);

    //parallax foreach layer
    layers.forEach((layer)=> {
      let offsetLayer    = layer.dataset.offset || 0;
      let transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';
      layer.css('transform', transformLayer);
    });
  });
}










/*








http://codepen.io/theElkman/pen/oxzPjZ?editors=0110
// Set height
    card.height(cardHeight);

    // Generate hover effect
    card
      .mouseover(function(){
        card.mousemove(function(e){
          // Find mouse X position in card
          mouseScreenPositionX = e.pageX;
          cardLeftPosition = card.offset().left;
          mousePosX = ((mouseScreenPositionX - cardLeftPosition)/cardWidth);
          // Calculate maxtrix3d X value
          matrix3dX = ((mousePosX/10000)*1.5)-0.0001;

          // Find mouse Y position in card
          mouseScreenPositionY = e.pageY;
          cardTopPosition = card.offset().top;
          mousePosY = ((mouseScreenPositionY-cardTopPosition)/cardHeight);
          // Calculate maxtrix3d Y value
          matrix3dY = ((mousePosY/10000)*1.65)-0.0001;

          // Set CSS
          card.css('transform', 'translate3d(0,-5px,0) matrix3d(1,0,0.00,'+matrix3dX+',0.00,1,0.00,'+matrix3dY+',0,0,1,0,0,0,0,1) scale('+cardContentScale*1.04+')');
        });
      })
      .mouseout(function(){
        // Unset CSS on mouseleave
        card.css('transform','translate3d(0,0,0) matrix3d(1,0,0.00,0.00,0.00,1,0.00,0,0,0,1,0,0,0,0,1) scale('+cardContentScale+')');
      });
  }

  // Execute function
  setCardStyle();
  $(window).on('resize', function(){
      setCardStyle();
  })
});
 */


