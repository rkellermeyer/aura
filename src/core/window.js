import channel from './channel';
import {DisableScroll} from './actions';

var body_ = document.body;
var appbar_;

class WindowManager {

  constructor() {
    window.onscroll = (event)=> this.onscroll(event);

  }

  onscroll(event) {
    let bodyscrolltop = body_.scrollTop;
    let appbarHeight;
    appbar_ = appbar_ = appbar_ || document.querySelector('#appBar');

    if (!appbar_) return;

    appbarHeight = appbar_.clientHeight;
    appbar_.float(bodyscrolltop > (appbarHeight / 2));
  }
}


const WIN = new WindowManager();


export { WIN }
