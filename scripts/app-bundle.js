define('app-core',['require','exports','module','core/polyfill','core/dom','core/animate','core/authorization','core/channel','core/es','core/window'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.rotate = exports.rotateY = exports.scale = exports.translateX = exports.translateY = exports.translate3d = exports.Keyframe = exports.Animation = exports.AnimationGroup = exports.Authorization = exports.channel = exports.WIN = exports.ES = undefined;

require('core/polyfill');

require('core/dom');

var _animate = require('core/animate');

var _authorization = require('core/authorization');

var _channel = require('core/channel');

var _channel2 = _interopRequireDefault(_channel);

var _es = require('core/es');

var _window = require('core/window');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ES = _es.ES;
exports.WIN = _window.WIN;
exports.channel = _channel2.default;
exports.Authorization = _authorization.Authorization;
exports.AnimationGroup = _animate.AnimationGroup;
exports.Animation = _animate.Animation;
exports.Keyframe = _animate.Keyframe;
exports.translate3d = _animate.translate3d;
exports.translateY = _animate.translateY;
exports.translateX = _animate.translateX;
exports.scale = _animate.scale;
exports.rotateY = _animate.rotateY;
exports.rotate = _animate.rotate;
});

define('app-portal',['require','exports','module','aurelia-binding','core/actions','app-state'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.PortalState = exports.Portal = undefined;

var _aureliaBinding = require('aurelia-binding');

var _actions = require('core/actions');

var _appState = require('app-state');

var _appState2 = _interopRequireDefault(_appState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Portal = exports.Portal = function () {
  function Portal() {
    _classCallCheck(this, Portal);

    this.state = {};
    this.config = {
      enablePersonalTitle: false,
      asideExpanded: false,
      portalContext: 'default'
    };

    this.defaultState = this.state;
    var config = _appState2.default.__cacheGetItem('portal.config') || {};
    Object.assign(this.config, config);
    _appState2.default.__cacheSetItem('portal.config', this.config);
  }

  Portal.prototype.expandAside = function expandAside() {
    this.sideExpanded = true;
  };

  Portal.prototype.setState = function setState(options) {
    this.state = options;
  };

  Portal.prototype.setConfig = function setConfig(key, value) {
    var _this = this;

    this.config[key] = value;
    var cache = _appState2.default.__cacheGetItem('portal.config') || this.config;

    Object.keys(cache).forEach(function (k) {
      if (cache[k] !== undefined) {
        cache[k] = _this.config[k];
      }
    });

    _appState2.default.__cacheSetItem('portal.config', this.config);
  };

  Portal.prototype.getConfig = function getConfig(key) {
    return this.config[key];
  };

  return Portal;
}();

var PortalState = exports.PortalState = function (_StateEvent) {
  _inherits(PortalState, _StateEvent);

  function PortalState() {
    _classCallCheck(this, PortalState);

    return _possibleConstructorReturn(this, _StateEvent.apply(this, arguments));
  }

  return PortalState;
}(_actions.StateEvent);

exports.default = _appState2.default.register('portal', Portal, PortalState);
});

define('app-router',['require','exports','module','app-core'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.AppRouter = undefined;

var _appCore = require('app-core');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppRouter = exports.AppRouter = function () {
  function AppRouter() {
    _classCallCheck(this, AppRouter);
  }

  AppRouter.prototype.configure = function configure(routerConfig, router) {
    appRouterConfig(routerConfig);
    this.router = router;
    function appRouterConfig(config) {
      config.title = 'Aura';
      config.addPipelineStep('authorize', _appCore.Authorization);
      config.map([{
        route: ['', 'welcome'], name: 'welcome', title: 'Welcome',
        moduleId: 'pages/welcome/index',
        nav: true

      }, {
        route: ['login'],
        moduleId: 'pages/auth/login', name: 'logout', title: 'Login',
        nav: true
      }, {
        route: ['signup'],
        moduleId: 'pages/auth/signup', name: 'signup', title: 'Signup',
        nav: true
      }, {
        route: ['logout'],
        moduleId: 'pages/auth/logout', name: 'logout', title: 'Logout',
        nav: true,
        auth: true
      }, {
        route: 'portal',
        moduleId: 'pages/users/portal', name: 'portal', title: 'Portal',
        nav: true,
        auth: true
      }, {
        route: 'dreamer',
        moduleId: 'pages/users/dreamer', name: 'dreamer', title: 'Portal',
        nav: true,
        auth: true
      }, {
        route: 'investor',
        moduleId: 'pages/users/investor', name: 'investor', title: 'Portal',
        nav: true,
        auth: true
      }, {
        route: 'show-down',
        moduleId: 'pages/show-down/index', name: 'show-down', title: 'Show Down',
        nav: true,
        auth: true
      }, {
        route: 'child-router',
        moduleId: 'child-router', name: 'child-router', title: 'Child Router',
        nav: true,
        auth: true
      }, {
        route: 'search-results',
        name: 'search-results', moduleId: 'pages/search/results',
        nav: false,
        auth: true
      }]);
    }
  };

  return AppRouter;
}();
});

define('app-state',['require','exports','module','services/cache','aurelia-dependency-injection','core/channel','core/actions','services/user'],function (require, exports, module) {'use strict';

exports.__esModule = true;

var _cache = require('services/cache');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _channel = require('core/channel');

var _channel2 = _interopRequireDefault(_channel);

var _actions = require('core/actions');

var _user = require('services/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function () {
  function State() {
    var _this = this;

    _classCallCheck(this, State);

    this.ui = null;
    this.app = null;
    this.portal = null;
    this.authorized = null;

    _channel2.default.subscribe(_actions.UserLoggedIn, function (payload) {
      _this.authorized = payload.instruction;
      _this.user = payload.instruction;
      console.log(_this.user);
    });

    _channel2.default.subscribe(_actions.UserLoggedOut, function (payload) {
      _this.authorized = payload.instruction;
      _this.user = _this.authorized;
    });
  }

  State.prototype.authorize = function authorize(callback) {
    var resolveCallback = function resolveCallback(a) {
      return callback ? callback(a) : Promise.resolve(a);
    };

    if (this.authorized) {
      return resolveCallback(this.authorized);
    }

    return new Promise(function (resolve) {
      _channel2.default.subscribeOnce(_actions.Authorize, function (payload) {
        resolve(resolveCallback(payload.instruction));
      });
    });
  };

  State.prototype.register = function register(key, Class, EventType) {

    Class.instance = _aureliaDependencyInjection.Container.get(Class);
    _aureliaDependencyInjection.Container.register(Class, Class.instance);

    Object.defineProperty(this, key, {
      get: function get() {
        return Class.instance;
      }
    });

    return Class.instance;
  };

  State.prototype.containerGet = function containerGet(key) {
    return _aureliaDependencyInjection.Container.get(key);
  };

  State.prototype.selectProject = function selectProject(project) {};

  State.prototype.__cacheSetItem = function __cacheSetItem(key, value) {
    return _aureliaDependencyInjection.Container.get(_cache.Cache).setItem(key, value);
  };

  State.prototype.__cacheGetItem = function __cacheGetItem(key) {
    return _aureliaDependencyInjection.Container.get(_cache.Cache).getItem(key);
  };

  return State;
}();

var state = new State();

exports.default = state;


window.state = state;
});

define('app-ui',['require','exports','module','app-state','core/actions'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UI = exports.UIState = undefined;

var _appState = require('app-state');

var _appState2 = _interopRequireDefault(_appState);

var _actions = require('core/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIState = exports.UIState = function (_StateEvent) {
  _inherits(UIState, _StateEvent);

  function UIState() {
    _classCallCheck(this, UIState);

    return _possibleConstructorReturn(this, _StateEvent.apply(this, arguments));
  }

  return UIState;
}(_actions.StateEvent);

var UI = exports.UI = function () {
  function UI() {
    _classCallCheck(this, UI);

    this.state = {};
  }

  UI.prototype.setState = function setState(options) {
    this.state = _appState2.default;
  };

  return UI;
}();

exports.default = _appState2.default.register('ui', UI, UIState);
});

define('app',['require','exports','module','aurelia-dependency-injection','app-router'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.App = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _appRouter = require('app-router');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = exports.App = (_dec = (0, _aureliaDependencyInjection.inject)(_appRouter.AppRouter), _dec(_class = function () {
  function App(appRouterConfig) {
    _classCallCheck(this, App);

    this.appRouterConfig = appRouterConfig;
  }

  App.prototype.configureRouter = function configureRouter() {
    var _appRouterConfig;

    (_appRouterConfig = this.appRouterConfig).configure.apply(_appRouterConfig, arguments);
  };

  return App;
}()) || _class);
});

define('environment',['require','exports','module'],function (require, exports, module) {"use strict";

exports.__esModule = true;
exports.default = {
  debug: false,
  testing: false
};
});

define('main',['require','exports','module','app-core','core/aurelia-container','core/action-events','app-state','app-portal','whatwg-fetch','./environment','server/auth'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.configure = configure;

require('app-core');

require('core/aurelia-container');

require('core/action-events');

require('app-state');

require('app-portal');

require('whatwg-fetch');

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

var _auth = require('server/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

function configure(aurelia) {

  aurelia.container.registerInstance(_auth.Authentication, aurelia.container.get(_auth.Authentication));

  aurelia.use.defaultBindingLanguage().developmentLogging().defaultResources().history().router().eventAggregator().feature('resources');

  aurelia.start().then(function () {
    return aurelia.setRoot();
  });
}
});

define('server',['require','exports','module','aurelia-dependency-injection','aurelia-cookie','server/http'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Server = undefined;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaCookie = require('aurelia-cookie');

var _http = require('server/http');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Server = exports.Server = function () {
  function Server() {
    _classCallCheck(this, Server);

    this.authToken = _aureliaCookie.Cookie.get('token');
  }

  Server.prototype.start = function start() {};

  Server.prototype.get = function get() {
    return httpGet.apply(undefined, arguments);
  };

  Server.prototype.post = function post() {
    return httpPost.apply(undefined, arguments);
  };

  Server.prototype.put = function put() {
    return httpPut.apply(undefined, arguments);
  };

  Server.prototype.patch = function patch() {
    return httpPatch.apply(undefined, arguments);
  };

  Server.prototype.delete = function _delete() {
    return httpDelete.apply(undefined, arguments);
  };

  Server.prototype.socketOn = function socketOn() {
    var _window$sio;

    return (_window$sio = window.sio).on.apply(_window$sio, arguments);
  };

  Server.prototype.socketOff = function socketOff() {
    var _window$sio2;

    return (_window$sio2 = window.sio).off.apply(_window$sio2, arguments);
  };

  Server.prototype.getCookie = function getCookie() {
    return _aureliaCookie.Cookie.get.apply(_aureliaCookie.Cookie, arguments);
  };

  Server.prototype.setCookie = function setCookie() {
    return _aureliaCookie.Cookie.set.apply(_aureliaCookie.Cookie, arguments);
  };

  Server.prototype.deleteCookie = function deleteCookie() {
    return _aureliaCookie.Cookie.delete.apply(_aureliaCookie.Cookie, arguments);
  };

  return Server;
}();

var server = new Server();
exports.default = server;


function httpGet() {
  var _Container$get$getHtt;

  return (_Container$get$getHtt = _aureliaDependencyInjection.Container.get(_http.Http).getHttp()).get.apply(_Container$get$getHtt, arguments);
}

function httpPost() {
  var _Container$get$getHtt2;

  return (_Container$get$getHtt2 = _aureliaDependencyInjection.Container.get(_http.Http).getHttp()).post.apply(_Container$get$getHtt2, arguments);
}

function httpPut() {
  var _Container$get$getHtt3;

  return (_Container$get$getHtt3 = _aureliaDependencyInjection.Container.get(_http.Http).getHttp()).put.apply(_Container$get$getHtt3, arguments);
}

function httpPatch() {
  var _Container$get$getHtt4;

  return (_Container$get$getHtt4 = _aureliaDependencyInjection.Container.get(_http.Http).getHttp()).patch.apply(_Container$get$getHtt4, arguments);
}

function httpDelete() {
  var _Container$get$getHtt5;

  return (_Container$get$getHtt5 = _aureliaDependencyInjection.Container.get(_http.Http).getHttp()).delete.apply(_Container$get$getHtt5, arguments);
}
});

define('services',['require','exports','module','services/cache','services/util'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Util = exports.Cache = undefined;

var _cache = require('services/cache');

var _util = require('services/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Cache = _cache.Cache;
exports.Util = _util2.default;
});

define('sockets',['require','exports','module','aurelia-dependency-injection','aurelia-cookie','socket.io-client','app-core'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Sockets = undefined;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaCookie = require('aurelia-cookie');

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _appCore = require('app-core');

var _appCore2 = _interopRequireDefault(_appCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.io = _socket2.default;

var Sockets = function () {
  function Sockets() {
    var _this = this;

    _classCallCheck(this, Sockets);

    this.connect = function () {
      var token = _aureliaCookie.Cookie.get('token');
      if (!token) return;
      window.sio = _this.io = (0, _socket2.default)('', {
        query: 'token=' + token,
        path: '/socket.io-client'
      });

      console.log(_this.io);

      _this.io.on('connect', function () {
        console.log('connected');
      });

      _this.io.on('project:save', function (data) {
        console.log(data);
      });
    };
  }

  Sockets.prototype.subscribe = function subscribe(key, callback) {
    return this.io.on(key, callback);
  };

  Sockets.prototype.publish = function publish(key, data) {
    this.io.emit(key, data);
  };

  return Sockets;
}();

var sockets = new Sockets();

exports.default = sockets;
exports.Sockets = Sockets;
});

define('users',['require','exports','module'],function (require, exports, module) {'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = exports.Users = function () {
  function Users() {
    _classCallCheck(this, Users);

    this.index = [{ name: 'bob', age: 22 }, { name: 'bob', age: 22 }, { name: 'bob', age: 22 }, { name: 'bob', age: 22 }];
  }

  Users.prototype.getUserByAge = function getUserByAge(age) {
    return this.index.find(function (p) {
      return p.age === age;
    });
  };

  return Users;
}();
});

define('core/action-events',['require','exports','module','./channel'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.setDocumentOverflow = setDocumentOverflow;

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var documentOverflow = '';
_channel2.default.subscribe('document-overflow', function (value) {
  documentOverflow = value || '';
  setDocumentOverflow(documentOverflow);
});

function setDocumentOverflow(overflow) {
  requestAnimationFrame(function () {
    document.documentElement.css({ overflow: overflow });
  });
}
});

define('core/actions',['require','exports','module'],function (require, exports, module) {'use strict';

exports.__esModule = true;

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultProfileImage = 'images/Nikola-Tesla-200x200.png';

var ProfileNav = exports.ProfileNav = function ProfileNav(options) {
  _classCallCheck(this, ProfileNav);

  this.instruction = options;
  options.image = options.image || defaultProfileImage;
};

var Authorize = exports.Authorize = function Authorize(options) {
  _classCallCheck(this, Authorize);

  this.instruction = options;
};

var UserLoggedIn = exports.UserLoggedIn = function UserLoggedIn(options) {
  _classCallCheck(this, UserLoggedIn);

  this.instruction = options;
};

var UserLoggedOut = exports.UserLoggedOut = function UserLoggedOut(options) {
  _classCallCheck(this, UserLoggedOut);

  this.instruction = options;
};

var DocumentScroll = exports.DocumentScroll = function () {
  function DocumentScroll() {
    _classCallCheck(this, DocumentScroll);

    this.overflow = '';
  }

  DocumentScroll.prototype.exec = function exec(value) {
    requestAnimationFrame(function () {
      document.documentElement.css({ overflow: overflow });
    });
  };

  return DocumentScroll;
}();

var StateEvent = exports.StateEvent = function () {
  function StateEvent(instruction) {
    _classCallCheck(this, StateEvent);

    this.instruction = instruction;
  }

  StateEvent.prototype.bind = function bind(context) {
    this.context = context;
    this.history = context.state;
    this.state = Object.assign({}, this.history, this.instruction);
    context.setState(this.state);
  };

  StateEvent.prototype.dispose = function dispose() {
    if (this.context.state === this.state) {
      this.context.state = this.history;
    }
  };

  return StateEvent;
}();

var PortalState = exports.PortalState = function (_StateEvent) {
  _inherits(PortalState, _StateEvent);

  function PortalState() {
    _classCallCheck(this, PortalState);

    return _possibleConstructorReturn(this, _StateEvent.apply(this, arguments));
  }

  return PortalState;
}(StateEvent);

;

var AppState = exports.AppState = function (_StateEvent2) {
  _inherits(AppState, _StateEvent2);

  function AppState() {
    _classCallCheck(this, AppState);

    return _possibleConstructorReturn(this, _StateEvent2.apply(this, arguments));
  }

  return AppState;
}(StateEvent);

;

var UIState = exports.UIState = function (_StateEvent3) {
  _inherits(UIState, _StateEvent3);

  function UIState() {
    _classCallCheck(this, UIState);

    return _possibleConstructorReturn(this, _StateEvent3.apply(this, arguments));
  }

  return UIState;
}(StateEvent);

;
});

define('core/animate',['require','exports','module'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.animate = animate;
exports.translate3d = translate3d;
exports.translateY = translateY;
exports.translateX = translateX;
exports.scale = scale;
exports.rotateY = rotateY;
exports.rotateX = rotateX;
exports.rotate = rotate;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var swiftEaseOutTimingFunction = 'cubic-bezier(0.25, 0.8, 0.25, 1)';
var swiftEaseInTimingFunction = 'cubic-bezier(0.55, 0, 0.55, 0.2)';
var swiftEaseInOutTimingFunction = 'cubic-bezier(0.35, 0, 0.25, 1)';
var direction = 'alternate';
var fill = 'forwards';
var duration = 150;

var defaultOptions = {
  fill: 'forwards',
  direction: 'alternate',
  duration: 150
};

var easing = {
  swiftOut: swiftEaseOutTimingFunction,
  swiftIn: swiftEaseInTimingFunction,
  swiftInOut: swiftEaseInOutTimingFunction
};

function animate(element, frames) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  options = Object.assign({}, defaultOptions, options);
  return new Promise(function (resolve) {
    element.animate([frames.from, frames.to], options).onfinish = function () {
      resolve();
    };
  });
}

function translate3d() {
  var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

  return 'translate3d(' + x + '%, ' + y + '%, ' + z + ')';
}

function translateY() {
  var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

  return 'translateY(' + x + '%)';
}

function translateX() {
  var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

  return 'translateX(' + x + '%)';
}

function scale(value) {
  return 'scale(' + value + ')';
}

function rotateY() {
  var v = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

  return 'rotateY(' + v + 'deg)';
}

function rotateX() {
  var v = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

  return 'rotateY(' + v + 'deg)';
}

function rotate() {
  var v = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

  return 'rotate(' + v + 'deg)';
}

var Keyframe = exports.Keyframe = function (_KeyframeEffect) {
  _inherits(Keyframe, _KeyframeEffect);

  function Keyframe(element, frames, timings) {
    _classCallCheck(this, Keyframe);

    if (typeof timings === 'number') timings = { duration: timings };
    timings = Object.assign({}, defaultOptions, timings);
    if ('easing' in timings && timings.easing in easing) {
      timings.easing = easing[timings.easing];
    }
    return _possibleConstructorReturn(this, _KeyframeEffect.call(this, element, frames, timings));
  }

  return Keyframe;
}(KeyframeEffect);

var AnimationGroup = exports.AnimationGroup = function (_GroupEffect) {
  _inherits(AnimationGroup, _GroupEffect);

  function AnimationGroup(first) {
    _classCallCheck(this, AnimationGroup);

    for (var _len = arguments.length, frames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      frames[_key - 1] = arguments[_key];
    }

    return _possibleConstructorReturn(this, _GroupEffect.call(this, Array.isArray(first) ? first : [first].concat(frames)));
  }

  AnimationGroup.prototype.play = function play() {
    return document.timeline.play(this);
  };

  return AnimationGroup;
}(GroupEffect);

var Animation = exports.Animation = function (_Animation2) {
  _inherits(Animation, _Animation2);

  function Animation(frames, timeline) {
    _classCallCheck(this, Animation);

    timeline = timeline || document.timeline;

    var _this3 = _possibleConstructorReturn(this, _Animation2.call(this, frames, timeline));

    _this3._reversed = false;
    return _this3;
  }

  Animation.prototype.reverse = function reverse() {
    _Animation2.prototype.reverse.call(this);
    this._reversed = !this._reversed;
  };

  Animation.prototype.run = function run() {
    if (this.isFinished()) {
      return this.reverse();
    }
    if (this.isIdle()) {
      return this.play();
    }
  };

  Animation.prototype.isPaused = function isPaused() {
    return this.playState === 'paused';
  };

  Animation.prototype.isIdle = function isIdle() {
    return this.playState === 'idle';
  };

  Animation.prototype.isRunning = function isRunning() {
    return this.playState === 'running';
  };

  Animation.prototype.isFinished = function isFinished() {
    return this.playState === 'finished';
  };

  return Animation;
}(_Animation);
});

define('core/aurelia-container',['require','exports','module','aurelia-dependency-injection'],function (require, exports, module) {'use strict';

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

_aureliaDependencyInjection.Container.get = function () {
  var _Container$instance;

  return (_Container$instance = _aureliaDependencyInjection.Container.instance).get.apply(_Container$instance, arguments);
};
_aureliaDependencyInjection.Container.register = function () {
  var _Container$instance2;

  return (_Container$instance2 = _aureliaDependencyInjection.Container.instance).registerInstance.apply(_Container$instance2, arguments);
};
});

define('core/authorization',['require','exports','module','aurelia-dependency-injection','aurelia-router','services/user','app-state'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Authorization = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaRouter = require('aurelia-router');

var _user = require('services/user');

var _appState = require('app-state');

var _appState2 = _interopRequireDefault(_appState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Authorization = exports.Authorization = (_dec = (0, _aureliaDependencyInjection.inject)(_user.User), _dec(_class = function () {
  function Authorization(user) {
    _classCallCheck(this, Authorization);

    this.user = user;
  }

  Authorization.prototype.run = function run(instruction, next) {
    var nextConfig = instruction.config;

    if (_appState2.default.authorized) {
      nextConfig.user = _appState2.default.authorized;
    }

    if (instruction.getAllInstructions().some(function (i) {
      return i.config.auth;
    })) {
      var isLoggedIn = !!(_appState2.default.user && _appState2.default.user.model);
      if (!isLoggedIn) {
        return next.cancel(new _aureliaRouter.Redirect('login'));
      }
    }

    return next();
  };

  return Authorization;
}()) || _class);
});

define('core/channel',['require','exports','module','aurelia-event-aggregator','./actions'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.EventChannel = undefined;

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _actions = require('./actions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventChannel = exports.EventChannel = function (_EventAggregator) {
  _inherits(EventChannel, _EventAggregator);

  function EventChannel() {
    _classCallCheck(this, EventChannel);

    return _possibleConstructorReturn(this, _EventAggregator.apply(this, arguments));
  }

  EventChannel.prototype.subscribe = function subscribe(nameOrClass, callback) {
    var instance = void 0;

    if (nameOrClass === _actions.Authorize && _actions.Authorize.instance) {
      callback(_actions.Authorize.instance);
      return {
        dispose: function dispose() {}
      };
    }

    return _EventAggregator.prototype.subscribe.call(this, nameOrClass, callback);
  };

  EventChannel.prototype.subscribeOnce = function subscribeOnce(nameOrClass, callback) {
    var instance = void 0;

    if (nameOrClass === _actions.Authorize && _actions.Authorize.instance) {
      callback(_actions.Authorize.instance);
      return {
        dispose: function dispose() {}
      };
    }

    return _EventAggregator.prototype.subscribeOnce.call(this, nameOrClass, callback);
  };

  EventChannel.prototype.publish = function publish(message, payload) {
    if (message instanceof _actions.Authorize) {
      _actions.Authorize.instance = message;
    }
    _EventAggregator.prototype.publish.call(this, message, payload);
  };

  return EventChannel;
}(_aureliaEventAggregator.EventAggregator);

var channel = new EventChannel();
exports.default = channel;
});

define('core/dom',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal'],function (require, exports, module) {'use strict';

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

Object.defineProperty(Element.prototype, 'events', {
  get: function get() {
    return this._events = this._events || new _aureliaTemplating.ElementEvents(this);
  }
});

Object.defineProperty(document, 'events', {
  get: function get() {
    return document._events = document._events || new _aureliaTemplating.ElementEvents(document.documentElement);
  }
});

Object.defineProperty(_aureliaPal.DOM, 'events', {
  get: function get() {
    return document._events = document._events || new _aureliaTemplating.ElementEvents(document.documentElement);
  }
});

Object.defineProperty(_aureliaPal.DOM, 'Events', {
  get: function get() {
    return _aureliaTemplating.ElementEvents;
  }
});

_aureliaPal.DOM.getCaretPosition = function (oField) {
  var iCaretPos = 0;

  if (document.selection) {
    oField.focus();

    var oSel = document.selection.createRange();

    oSel.moveStart('character', -oField.value.length);

    iCaretPos = oSel.text.length;
  } else if (oField.selectionStart || oField.selectionStart == '0') iCaretPos = oField.selectionStart;

  return iCaretPos;
};
});

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Element.prototype.find = function (selector) {
  return this.querySelector(selector);
};

Element.prototype.findall = function (selector) {
  return Array.from(this.querySelectorAll(selector));
};

Element.prototype.css = function (key, value) {
  var options = key;
  if (typeof key === 'string') {
    options = {};
    options[key] = value;
  }

  Object.assign(this.style, options);
};

Element.prototype.fadeOut = function (duration) {
  duration = duration || 300;
  return this.animate([{ opacity: 1 }, { opacity: 0 }], duration);
};

Element.prototype.fadeIn = function (duration) {
  duration = duration || 300;
  return this.animate([{ opacity: 0 }, { opacity: 1 }], duration);
};

Element.prototype.getOffset = function () {
  var elem = this;
  var docElem,
      win,
      box = { top: 0, left: 0 },
      doc = elem && elem.ownerDocument;

  docElem = doc.documentElement;

  if (_typeof(elem.getBoundingClientRect) !== (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined))) {
    box = elem.getBoundingClientRect();
  }
  win = window;
  var offset = {
    top: box.top + win.pageYOffset - docElem.clientTop,
    left: box.left + win.pageXOffset - docElem.clientLeft
  };
  offset.right = window.innerWidth - offset.left - elem.clientWidth;
  return offset;
};
define("core/element", [],function(){});

define('core/es',['require','exports','module'],function (require, exports, module) {"use strict";

exports.__esModule = true;
var ES = exports.ES = {};

ES.timeout = function () {
  var duration = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var callback = arguments[1];

  if (!callback) {
    return new Promise(function (resolve) {
      runTimeout(resolve, duration);
    });
  }
  runTimeout(callback, duration);
};

function runTimeout(callback) {
  var duration = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  var timeoutId = setTimeout(function () {
    callback();
    clearTimeout(timeoutId);
  }, duration);
}

ES.safeAssign = function () {
  var target = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var source = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var options = arguments[2];

  var assign = void 0;
  var prop = void 0;
  var key = void 0;
  var len = void 0;
  var i = void 0;

  if (!options) {
    return Object.keys(options).forEach(function (key) {
      return key in target ? target[key] = options[key] : null;
    });
  }

  assign = function assign(key, value) {
    if (options.ignoredKeys && ~options.ignoredKeys.indexOf(key)) {
      return;
    }
    if (value === undefined && options.allowUndefined) {
      target[key] = value;
    } else if (value === null && options.allowNull) {
      target[key] = value;
    } else if ((value === null || target === undefined) && options.defaults) {
      target[key] = options.defaults[key];
    } else {
      target[key] = value;
    }
  };

  if (options.keys) {
    len = options.keys.length - 1;
    i = -1;

    while (i++ < len) {
      key = options.keys[i];
      prop = source[key];
      assign(key, prop);
    }
  }
  return target;
};
});

'use strict';

Function.isFunction = function (f) {
    return typeof f === 'function';
};
Function.noop = function () {
    return null;
};

window.pointerDownName = 'MSPointerDown';
window.pointerUpName = 'MSPointerUp';
window.pointerMoveName = 'MSPointerMove';

if (window.PointerEvent) {
    window.pointerDownName = 'pointerdown';
    window.pointerUpName = 'pointerup';
    window.pointerMoveName = 'pointermove';
}

window.PointerEventsSupport = false;
if (window.PointerEvent || window.navigator.msPointerEnabled) {
    window.PointerEventsSupport = true;
}

window._Animation = window.Animation;

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
})();
define("core/polyfill", [],function(){});

define('core/window',['require','exports','module','./channel','./actions'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.WIN = undefined;

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var body_ = document.body;
var appbar_;

var WindowManager = function () {
  function WindowManager() {
    var _this = this;

    _classCallCheck(this, WindowManager);

    window.onscroll = function (event) {
      return _this.onscroll(event);
    };
  }

  WindowManager.prototype.onscroll = function onscroll(event) {
    var bodyscrolltop = body_.scrollTop;
    var appbarHeight = void 0;
    appbar_ = appbar_ = appbar_ || document.querySelector('#appBar');

    if (!appbar_) return;

    appbarHeight = appbar_.clientHeight;
    appbar_.float(bodyscrolltop > appbarHeight / 2);
  };

  return WindowManager;
}();

var WIN = new WindowManager();

exports.WIN = WIN;
});

define('server/auth',['require','exports','module','aurelia-http-client','aurelia-dependency-injection','aurelia-cookie','./http','./users','core/actions','aurelia-event-aggregator','core/channel','server','services/user'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Authentication = undefined;

var _dec, _class;

var _aureliaHttpClient = require('aurelia-http-client');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaCookie = require('aurelia-cookie');

var _http = require('./http');

var _users = require('./users');

var _actions = require('core/actions');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _channel = require('core/channel');

var _channel2 = _interopRequireDefault(_channel);

var _server = require('server');

var _server2 = _interopRequireDefault(_server);

var _user = require('services/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Authentication = exports.Authentication = (_dec = (0, _aureliaDependencyInjection.inject)(_http.Http, _users.Users, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
  function Authentication(http, users) {
    _classCallCheck(this, Authentication);

    this.http = http.getHttp();
    this.users = users;

    this.tryFetchingCurrent().catch(function (a) {
      console.log(a);
    });
  }

  Authentication.prototype.tryFetchingCurrent = function tryFetchingCurrent() {
    if (!_aureliaCookie.Cookie.get('token')) return Promise.resolve(null);

    return _server2.default.get('/api/users/me').then(function (response) {
      console.log(response);
      var user = _user.User.authorize(response.content);
      return user;
    }).catch(function (err) {
      _aureliaCookie.Cookie.delete('token');
      console.log({ errResponse: err.response, statusText: err.statusText, status: err.statusCode });
    });
  };

  Authentication.prototype.create = function create(body) {
    var method = 'POST';
    return _server2.default.post('/api/users', body).then(function (response) {}).catch(function (err) {
      console.log(err.response);
    });
  };

  Authentication.prototype.login = function login(body) {
    var _this = this;

    var method = 'POST';
    return _server2.default.post('/auth/local', body).then(function (response) {
      var content = void 0;
      var token = void 0;
      if (response.isSuccess) {
        content = response.content;
        token = content.token;
        _aureliaCookie.Cookie.set('token', token);
      }
      return _this.tryFetchingCurrent();
    }).catch(function (err) {
      console.log(err.response);
    });
  };

  Authentication.prototype.signup = function signup(user) {
    var _this2 = this;

    return _server2.default.post('/api/users', user).then(function (resp) {
      var token = resp.content.token;
      if (token) {
        _aureliaCookie.Cookie.set('token', token);
      }
      return _this2.tryFetchingCurrent();
    });

    function authenticate() {
      var client = new _aureliaHttpClient.HttpClient();
      return client.createRequest('http://api.idyuh.com/users').asPost().withHeader('Content-Type', 'application/json').withParams({ user: user }).send().then(function (resp) {
        if (resp.content) {
          return postUser(resp.content.user);
        }
      }).catch(function (err) {
        return console.log(err.response);
      });
    }
  };

  Authentication.prototype.logout = function logout() {
    _user.User.unauthorize();
  };

  Authentication.prototype.getUsers = function getUsers() {
    return _server2.default.get('/api/users').then(function (response) {
      return response;
    }).then(function (response) {}).catch(function (err) {
      console.log(err.response);
    });
  };

  return Authentication;
}()) || _class);
});

define('server/configure',['require','exports','module','services/cookie','services/util'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.configureHTTP = configureHTTP;

var _cookie = require('services/cookie');

var _util = require('services/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentConfig = void 0;
var HTTP_HEADERS = {
  credentials: 'same-origin',
  mode: 'no-cors',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'X-Requested-With': 'Fetch'
  }
};

var HTTP_INTERCEPTOR = {
  request: function request(_request) {
    if ((0, _cookie.checkCookie)('token') && _util2.default.isSameOrigin(currentConfig.url)) {
      _request.headers.set('XSRF-TOKEN', (0, _cookie.getCookie)('XSRF-TOKEN'));
      _request.headers.set('X-UI-GUID', (0, _cookie.getCookie)('token'));
      _request.headers.set('Authorization', 'Bearer ' + (0, _cookie.getCookie)('token'));
    }
    console.log('Requesting ' + _request.method + ' ' + _request.url, _request.headers);
    return _request;
  }
};

function configureHTTP(config) {
  currentConfig = config;
  config.withBaseUrl('http://localhost:9000').withDefaults(HTTP_HEADERS).withInterceptor(HTTP_INTERCEPTOR);
}
});

define('server/http',['require','exports','module','aurelia-dependency-injection','aurelia-http-client','server/interceptor','aurelia-cookie'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Http = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaHttpClient = require('aurelia-http-client');

var _interceptor = require('server/interceptor');

var _aureliaCookie = require('aurelia-cookie');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTTP_HEADERS = {
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'X-Requested-With': 'Fetch',
    'X-XSRF-TOKEN': _aureliaCookie.Cookie.get('XSRF-TOKEN'),
    'Content-Type': "application/json;charset=utf-8"
  }
};

var Http = exports.Http = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaHttpClient.HttpClient), _dec(_class = function Http(http) {
  var _this = this;

  _classCallCheck(this, Http);

  http.configure(function (config) {
    config.withBaseUrl(_this._endpoint).withHeader('Accept', 'application/json, text/plain, */*').withHeader('X-XSRF-TOKEN', _aureliaCookie.Cookie.get('XSRF-TOKEN')).withHeader('Content-Type', 'application/json;charset=utf-8').withInterceptor(new _interceptor.AuthInterceotor(http));
  });

  this.http = http;
  this.getHttp = function () {
    return http;
  };
}) || _class);
});

define('server/index',['require','exports','module','aurelia-dependency-injection','./http','app-state','./store'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Server = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _http = require('./http');

var _appState = require('app-state');

var _appState2 = _interopRequireDefault(_appState);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var endpoints_ = {
  users: '/api/users',
  projects: '/api/project_profiles',
  currentUser: '/api/users/me'
};

var Server = exports.Server = (_dec = (0, _aureliaDependencyInjection.inject)(_http.Http), _dec(_class = function () {
  function Server(http) {
    _classCallCheck(this, Server);

    this.http = http.getHttp();
  }

  Server.prototype.getCurrentUser = function getCurrentUser() {
    return this.http.get(endpoints_.currentUser).then(function (response) {
      return response.ok ? response.json() : {};
    }).catch(function (error) {
      console.error('Error fetching the currentUser from the server');
      console.log(error);
    });
  };

  Server.prototype.getUsers = function getUsers() {
    return this.http.get(endpoints_.users).then(function (response) {
      return response.ok ? response.json() : {};
    }).catch(function (error) {
      console.error('Error fetching users from the server');
      console.log(error.response);
    });
  };

  Server.prototype.getProjects = function getProjects() {
    return this.http.get(endpoints_.projects).then(function (response) {
      return response.content;
    }).catch(function (err) {
      console.log(err.response);
    });
  };

  Server.prototype.getUserProjects = function getUserProjects(id) {
    this.getProjects().then(function (projects) {
      return projects.filter(function (p) {
        return p.user_id === id;
      });
    });
  };

  Server.prototype.newProject = function newProject(body) {
    return this.http.post(endpoints_.projects, body).then(function (response) {
      if (response.isSuccess) {
        return response.content;
      }
    }).catch(function (err) {
      return console.log(err.response);
    });
  };

  Server.prototype.updateProject = function updateProject(_id, body) {
    var endpoint = join(endpoints_.projects, _id);
    return this.http.put(endpoint, body).then(function (response) {
      return response.content;
    }).catch(function (err) {
      return console.log(err.response);
    });
  };

  Server.prototype.deleteProject = function deleteProject(_id, body) {
    var endpoint = join(endpoints_.projects, _id);
    return this.http.delete(endpoint, body).then(function (response) {
      return response.content;
    }).catch(function (err) {
      return console.log(err.response);
    });
  };

  return Server;
}()) || _class);


function join() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.join('/').replace(/(\/\/)+/g, '/');
}
});

define('server/interceptor',['require','exports','module','services/util','aurelia-cookie'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.AuthInterceotor = undefined;

var _util = require('services/util');

var _util2 = _interopRequireDefault(_util);

var _aureliaCookie = require('aurelia-cookie');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthInterceotor = function () {
  function AuthInterceotor(http) {
    _classCallCheck(this, AuthInterceotor);

    this.http = http;
  }

  AuthInterceotor.prototype.request = function request(_request) {
    var isOrigin = _util2.default.isSameOrigin(this.http.baseUrl);
    var token = _aureliaCookie.Cookie.get('token');
    var r = _request;
    _request.headers.add('X-XSRF-TOKEN', _aureliaCookie.Cookie.get('XSRF-TOKEN'));

    if (token && isOrigin) {
      _request.headers.add('Authorization', 'Bearer ' + _aureliaCookie.Cookie.get('token') || _aureliaCookie.Cookie.get('XSRF-TOKEN'));
    }

    return _request;
  };

  AuthInterceotor.prototype.response = function response(message) {
    return message;
  };

  AuthInterceotor.prototype.requestError = function requestError(error) {
    throw error;
  };

  AuthInterceotor.prototype.responseError = function responseError(error) {
    throw error;
  };

  return AuthInterceotor;
}();

exports.AuthInterceotor = AuthInterceotor;
});

define('server/project',['require','exports','module','./index','aurelia-binding','app-state'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Project = exports.ProjectModel = exports.ProjectProfileModel = undefined;

var _desc, _value, _class3, _descriptor;

var _index = require('./index');

var _aureliaBinding = require('aurelia-binding');

var _appState = require('app-state');

var _appState2 = _interopRequireDefault(_appState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectProfileModel = exports.ProjectProfileModel = function ProjectProfileModel() {
  _classCallCheck(this, ProjectProfileModel);

  this.statuses = [];
};

var ProjectModel = exports.ProjectModel = function ProjectModel() {
  _classCallCheck(this, ProjectModel);
};

var Projects = (_class3 = function () {
  function Projects() {
    _classCallCheck(this, Projects);

    _initDefineProp(this, 'current', _descriptor, this);

    this.map = new Object();

    this.server = _appState2.default.containerGet(_index.Server);
  }

  Projects.prototype.toArray = function toArray() {
    return _.values(this.map);
  };

  Projects.prototype.currentChanged = function currentChanged(project, oldProject) {
    if (oldProject) {
      oldProject.isSelected = false;
    }

    if (project) {
      project.isSelected = true;
    }
  };

  Projects.prototype.all = function all() {
    var _this = this;

    return this.server.getProjects().then(function (projects) {
      return projects.map(function (model) {
        var project = _this.hasProject(model.id) ? _this.getProjectById(model.id) : new Project(model);
        _this.setProject(model.id, project);
        return project;
      });
    });
  };

  Projects.prototype.hasProject = function hasProject(id) {
    return !!this.map[id];
  };

  Projects.prototype.getProjectById = function getProjectById(id) {
    return this.map[id];
  };

  Projects.prototype.setProject = function setProject(id, project) {
    this.map[id] = project;
  };

  Projects.prototype.createProject = function createProject(model) {
    return new Project(model);
  };

  Projects.prototype.saveProject = function saveProject(model) {
    var project = new Project(model);

    if (!model.user_id) {
      model.user_id = _appState2.default.authorized.id;
      model.userRef = _appState2.default.authorized._id;
    }

    if (model._id) {
      return this.server.updateProject(model._id, model);
    }

    return this.server.newProject(model).then(function (model) {
      project.model = null;
      project.model = model;
      project.assign(model);
      return project;
    });
  };

  Projects.prototype.deleteProject = function deleteProject(project) {
    return this.server.deleteProject(project.model._id);
  };

  return Projects;
}(), (_descriptor = _applyDecoratedDescriptor(_class3.prototype, 'current', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class3);


var projects = new Projects();

exports.default = projects;

var Project = exports.Project = function () {
  function Project(model) {
    _classCallCheck(this, Project);

    this.assign(model);
    this.repo = projects;
    this.server = projects.server;
  }

  Project.prototype.assign = function assign() {
    var instruction = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    if (!this.model) {
      this.model = instruction;
    }
  };

  Project.prototype.select = function select() {
    projects.current = this;
  };

  Project.prototype.save = function save() {
    return this.repo.saveProject(this);
  };

  Project.prototype.delete = function _delete() {
    return this.server.deleteProject(this);
  };

  return Project;
}();
});

define('server/store',['require','exports','module','sockets'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Store = undefined;

var _sockets = require('sockets');

var _sockets2 = _interopRequireDefault(_sockets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = exports.Store = function Store(server) {
  _classCallCheck(this, Store);

  this.users = [];
  this.usersmap_ = {};
  this.projects = [];
  this.projectsmap_ = {};
  this.categories = [];
};

Store.instance = new Store();

exports.default = Store.instance;
});

define('server/users',['require','exports','module','./index','aurelia-binding','aurelia-dependency-injection'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Users = undefined;

var _dec, _class2, _desc, _value, _class3, _descriptor, _descriptor2, _class4, _temp;

var _index = require('./index');

var _aureliaBinding = require('aurelia-binding');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserModel = function () {
  function UserModel() {
    _classCallCheck(this, UserModel);

    this.model = null;
  }

  UserModel.prototype.getProjects = function getProjects() {};

  return UserModel;
}();

UserModel.current = new UserModel();
UserModel.active = new UserModel();

var Users = exports.Users = (_dec = (0, _aureliaDependencyInjection.inject)(_index.Server), _dec(_class2 = (_class3 = (_temp = _class4 = function () {
  function Users(server, model) {
    var _this = this;

    _classCallCheck(this, Users);

    _initDefineProp(this, 'current', _descriptor, this);

    _initDefineProp(this, 'active', _descriptor2, this);

    this.list = [];

    this.server = server;
    this.model = model;

    UserModel.current.repo = this;
    UserModel.active.repo = this;

    this.server.getUsers().then(function (users) {
      _this.list = users;
    });
  }

  Users.prototype.currentChanged = function currentChanged(model) {
    if (model) {
      if (!Users.current) {
        Users.current = UserModel.current;
      }

      this.currentUser = Users.current;
      this.currentUser.model = model;
    } else {
      UserModel.current.model = null;
      Users.current = this.currentUser = null;
    }
  };

  Users.prototype.activeChanged = function activeChanged(model) {
    if (model) {
      if (!Users.active) {
        Users.active = UserModel.active;
      }

      this.activeUser = Users.active;
      this.activeUser.model = model;
    } else {
      UserModel.active.model = null;
      Users.active = this.currentUser = null;
    }
  };

  Users.prototype.getAllProjects = function getAllProjects() {
    return this.server.getProjects();
  };

  return Users;
}(), _class4.current = null, _class4.active = null, _temp), (_descriptor = _applyDecoratedDescriptor(_class3.prototype, 'current', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class3.prototype, 'active', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class3)) || _class2);
});

define('resources/dropdown',['require','exports','module','aurelia-dependency-injection','core/animate','aurelia-event-aggregator'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Dropdown = undefined;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _animate = require('core/animate');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dropdown = exports.Dropdown = function () {
  function Dropdown(element) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Dropdown);

    this._containerSelector = '[data-dropdown]';
    this._handleSelector = '[data-toggle-dropdown]';

    this.setElement(element);
    this.setContainer(options.container);
    this.setHandle(options.handle);
    this.eventAggegator = _aureliaDependencyInjection.Container.instance.get(_aureliaEventAggregator.EventAggregator);
    this.isMenu = 'menu' in options ? options.menu : this.isMenu;
  }

  Dropdown.prototype.setElement = function setElement(element) {
    if (element instanceof Element) {
      element.classList.add('dropdown');
      return this.element = element;
    }
    throw new Error('Downdown args[0] must be of type element');
  };

  Dropdown.prototype.setContainer = function setContainer() {
    var selector = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    this.container = this.container || document.createElement('dropdown-container');

    var container = selector instanceof Element ? selector : this.element.find(selector || this._containerSelector);
    if (container instanceof Element) {
      container.classList.add('dropdown-container', 'menu');

      container.parentNode.insertBefore(this.container, container);
      this.container.appendChild(container);
      return this.container;
    }
    throw new Error('Downdown options.container must be of type element, or child selector');
  };

  Dropdown.prototype.setHandle = function setHandle() {
    var selector = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    var handle = selector instanceof Element ? selector : this.element.find(selector || this._handleSelector);
    if (handle instanceof Element) {
      handle.classList.add('dropdown-handle');
      return this.handle = handle;
    }
    throw new Error('Downdown options.handle must be of type element, or child selector');
  };

  Dropdown.prototype.bind = function bind() {
    var _this = this;

    this.clickListener = this.handle.events.subscribe('click', function () {
      _this.toggle(true);
    });
  };

  Dropdown.prototype.unbind = function unbind() {
    this.clickListener.dispose();
    if (this.docListener) {
      this.docListener.dispose();
    }
  };

  Dropdown.prototype.toggle = function toggle(open) {
    var _this2 = this;

    this.isOpen = typeof open === 'boolean' ? open : !this.isOpen;
    this.container.style.display = this.isOpen ? '' : 'none';
    if (this.isOpen) {
      this.docListener = document.events.subscribe('click', function (e) {
        _this2.toggle(false);
      });
    } else {
      if (this.docListener) {
        this.docListener.dispose();
      }
    }
  };

  Dropdown.prototype.open = function open() {
    this.toggle(true);
  };

  Dropdown.prototype.close = function close() {
    this.toggle(false);
  };

  return Dropdown;
}();
});

define('resources/index',['require','exports','module'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.configure = configure;
function configure(config) {
  config.globalResources(['./app-bar/app-bar', './app-footer/app-footer', './project-card/project-card', './project-card/project-card-list', './dialog/dialog', './dialog/dialog-step', './dialog/login-dialog', './tab-bar/element', './select/element', './elements/icon', './elements/fab', './elements/action', './elements/page-title', './elements/label', './auth-nav/element', './portal/element', './switch/element', './tag-input/element', './status-filter/element', '../pages/welcome/welcome-card']);
}
});

define('services/cache',['require','exports','module'],function (require, exports, module) {'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = exports.Cache = function () {
  function Cache() {
    _classCallCheck(this, Cache);
  }

  Cache.prototype.farFuture = function farFuture() {
    return dateAdd(new Date(), 'year', 1);
  };

  Cache.prototype.fromNow = function fromNow() {
    var hours = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
    var minutes = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var seconds = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    return dateAdd(dateAdd(dateAdd(new Date(), 'hour', hours), 'minute', minutes), 'second', seconds);
  };

  Cache.prototype.getItem = function getItem(key) {
    var content = null;

    try {
      var stored = localStorage.getItem(key);
      if (stored) {
        stored = JSON.parse(stored);
        if (stored.expires - Date.now() > 0) {
          content = stored.content;
        }
      }
    } finally {
      return content;
    }
  };

  Cache.prototype.setItem = function setItem(key, content, expires) {
    try {
      var toStore = {
        content: content,
        expires: (expires || this.fromNow(1)).getTime()
      };

      localStorage.setItem(key, JSON.stringify(toStore));
    } finally {
      return content;
    }
  };

  return Cache;
}();

function dateAdd(date, interval, units) {
  var ret = new Date(date);

  switch (interval.toLowerCase()) {
    case 'year':
      ret.setFullYear(ret.getFullYear() + units);break;
    case 'quarter':
      ret.setMonth(ret.getMonth() + 3 * units);break;
    case 'month':
      ret.setMonth(ret.getMonth() + units);break;
    case 'week':
      ret.setDate(ret.getDate() + 7 * units);break;
    case 'day':
      ret.setDate(ret.getDate() + units);break;
    case 'hour':
      ret.setTime(ret.getTime() + units * 3600000);break;
    case 'minute':
      ret.setTime(ret.getTime() + units * 60000);break;
    case 'second':
      ret.setTime(ret.getTime() + units * 1000);break;
    default:
      ret = undefined;break;
  }
  return ret;
}
});

define('services/cookie',['require','exports','module'],function (require, exports, module) {"use strict";

exports.__esModule = true;
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.checkCookie = checkCookie;
exports.removeCookie = removeCookie;
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(name) {
    return !!getCookie(name);
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("token", user, 365);
        }
    }
}

function removeCookie(name) {
    setCookie(name, '');
}
});

define('services/project',['require','exports','module','aurelia-binding','sockets','server'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Point = exports.Field = exports.Project = undefined;

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _desc2, _value2, _class3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _desc3, _value3, _class5, _descriptor8, _descriptor9;

var _aureliaBinding = require('aurelia-binding');

var _sockets = require('sockets');

var _sockets2 = _interopRequireDefault(_sockets);

var _server = require('server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function onEventQueue(callback) {
  var id = setTimeout(function () {
    clearTimeout(id);
    callback();
  }, 0);
}

var Project = (_class = function () {
  function Project() {
    _classCallCheck(this, Project);

    _initDefineProp(this, 'title', _descriptor, this);

    _initDefineProp(this, 'overview', _descriptor2, this);

    _initDefineProp(this, 'teaser', _descriptor3, this);
  }

  Project.prototype.setModel = function setModel(model) {
    var _this = this;

    this.model = null;
    this.fields = [];
    this.title = model.title;
    this.teaser = model.teaser;
    this.overview = model.overview;

    this.model = model;
    this.fields = model.points.map(function (f) {
      return new Field(f, _this);
    });
  };

  Project.prototype.update = function update() {
    _sockets2.default.publish('project-profile:update', this.model);
  };

  Project.prototype.addField = function addField() {
    var _this2 = this;

    var url = '/api/project_profiles/' + this.model._id + '/point';
    var data = { title: 'New Field', content: '', points: [] };
    return _server2.default.put(url, data).then(function (response) {
      var model = response.content;
      var field = new Field(model, _this2);
      _this2._isNewField = true;
      _this2.model.points.push(model);
      _this2.fields.push(field);
    });
  };

  Project.prototype.removeField = function removeField(field) {
    var _this3 = this;

    var url = '/api/project_profiles/' + this.model._id + '/point/' + field.model._id;

    var index = this.fields.indexOf(field);
    if (~index) {
      this.fields.splice(index, 1);

      index = this.model.points.indexOf(field.model);

      if (~index) {
        this.model.points.splice(index, 1);
      }

      return _server2.default.delete(url).then(function (response) {
        _this3.model.archivedPoints.push(response.content);
        _this3.update();
      });
    }
  };

  Project.prototype.titleChanged = function titleChanged(value) {
    if (this.model) {
      this.model.title = value;
      this.update();
    }
  };

  Project.prototype.teaserChanged = function teaserChanged(value) {
    if (this.model) {
      this.model.teaser = value;
      this.update();
    }
  };

  Project.prototype.overviewChanged = function overviewChanged(value) {
    if (this.model) {
      this.model.overview = value;
      this.update();
    }
  };

  return Project;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'title', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'overview', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'teaser', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
})), _class);
var Field = (_class3 = function () {
  function Field(model, project) {
    var _this4 = this;

    _classCallCheck(this, Field);

    _initDefineProp(this, 'title', _descriptor4, this);

    _initDefineProp(this, 'summary', _descriptor5, this);

    _initDefineProp(this, 'summaryRef', _descriptor6, this);

    _initDefineProp(this, 'titleRef', _descriptor7, this);

    this.hasSummary = !!model.content;
    this.summary = model.content;
    this.title = model.title;
    this.project = project;
    this.model = model;

    this.points = model.points.map(function (p) {
      return new Point(p, _this4, project);
    });
  }

  Field.prototype.addSummary = function addSummary() {
    var _this5 = this;

    this.summary = '';
    this.hasSummary = true;
    onEventQueue(function () {
      if (_this5.summaryRef) {
        _this5.summaryRef.focus();
      }
    });
  };

  Field.prototype.removePoint = function removePoint(point, model) {
    var index = this.points.indexOf(point);
    if (~index) {
      this.points.splice(index, 1);
    }

    index = this.model.points.indexOf(model);

    if (~index) {
      this.model.points.splice(index, 1);
    }

    this.project.update();
  };

  Field.prototype.addPoint = function addPoint() {
    var model = { text: '' };
    var point = new Point(model, this, this.project);

    this._isNewPoint = true;
    this.points.push(point);
    this.model.points.push(model);
    this.project.update();
  };

  Field.prototype.summaryRefChanged = function summaryRefChanged(node) {
    var _this6 = this;

    if (node) {
      node.onblur = function () {
        if (!_this6.summary) {
          _this6.hasSummary = false;
        }
      };
    }
  };

  Field.prototype.titleRefChanged = function titleRefChanged(node) {
    var _this7 = this;

    if (node) {
      onEventQueue(function () {
        if (_this7.project._isNewField) {
          _this7.project._isNewField = false;
          node.focus();
        }
      });
    }
  };

  Field.prototype.titleChanged = function titleChanged(value) {
    if (this.model) {
      this.model.title = value;
      this.project.update();
    }
  };

  Field.prototype.summaryChanged = function summaryChanged(value) {
    if (this.model) {
      this.model.content = value;
      this.project.update();
    }
  };

  return Field;
}(), (_descriptor4 = _applyDecoratedDescriptor(_class3.prototype, 'title', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class3.prototype, 'summary', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class3.prototype, 'summaryRef', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class3.prototype, 'titleRef', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
})), _class3);
var Point = (_class5 = function () {
  function Point(model, field, project) {
    _classCallCheck(this, Point);

    _initDefineProp(this, 'text', _descriptor8, this);

    _initDefineProp(this, 'nodeRef', _descriptor9, this);

    this.text = model.text;
    this.model = model;
    this.field = field;
    this.project = project;
  }

  Point.prototype.textChanged = function textChanged(value) {
    if (this.model) {
      this.model.text = value;
      this.project.update();
    }
  };

  Point.prototype.nodeRefChanged = function nodeRefChanged(node) {
    var _this8 = this;

    if (node) {
      node.onblur = function () {
        if (!_this8.text) {
          _this8.field.removePoint(_this8, _this8.model);
        }
      };
      onEventQueue(function () {
        if (_this8.field._isNewPoint) {
          _this8.field._isNewPoint = false;
          node.focus();
        }
      });
    }
  };

  return Point;
}(), (_descriptor8 = _applyDecoratedDescriptor(_class5.prototype, 'text', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, 'nodeRef', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class5);
exports.Project = Project;
exports.Field = Field;
exports.Point = Point;
});

define('services/roles',['require','exports','module'],function (require, exports, module) {'use strict';

exports.__esModule = true;
var roles = exports.roles = [{
  title: 'Dreamer',
  name: 'dreamer',
  image: 'resources/images/dreamer.png',
  background: 'resources/images/bg-dreamer.jpg',
  text: 'Are you an idea maker, looking for a team to help jump start your project?'
}, {
  title: 'Mentor',
  name: 'mentor',
  image: 'resources/images/mentor.png',
  background: 'resources/images/bg-mentor.jpg',
  text: 'Are you an experienced leader who can give direction to a creative team?'
}, {
  title: 'Investor',
  name: 'investor',
  image: 'resources/images/investor.png',
  background: 'resources/images/bg-investor.jpg',
  text: 'Are you a venture capitalist or hobby investor looking to fund the next great idea?'
}, {
  title: 'Service Provider',
  name: 'service-provider',
  image: 'resources/images/developer.png',
  background: 'resources/images/bg-developer.jpg',
  text: 'Are you looking to help create the next big idea or add value to a project with your specialized skills?'
}];
});

define('services/room',['require','exports','module','server'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Room = undefined;

var _server = require('server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Room = function () {
  function Room(model) {
    _classCallCheck(this, Room);

    this.creator = null;
    this.messages = [];
    this.users = [];

    this.model = model;
    this.creator = model.creator;
    this.messages = model.messages;
    this.users = model.users;
  }

  Room.prototype.populate = function populate() {
    var _this = this;

    return _server2.default.get('/api/rooms/' + this.model._id).then(function (response) {
      var model = response.content;
      _this.creator = model.creator;
      _this.messages = model.messages;
      _this.users = model.users;
    });
  };

  Room.prototype.save = function save() {
    return _server2.default.put('/api/rooms/' + this.model._id, this.model);
  };

  Room.prototype.postMessage = function postMessage() {
    var data = {
      content: this.newMessage,
      received: false,
      user: this.user.model._id
    };

    this.messages.push(data);
    this.newMessage = '';
    this.save();
  };

  return Room;
}();

exports.Room = Room;
});

define('services/user',['require','exports','module','aurelia-dependency-injection','aurelia-binding','app-state','core/channel','core/actions','./room','server','sockets'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.User = undefined;

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaBinding = require('aurelia-binding');

var _appState = require('app-state');

var _appState2 = _interopRequireDefault(_appState);

var _channel = require('core/channel');

var _channel2 = _interopRequireDefault(_channel);

var _actions = require('core/actions');

var _room = require('./room');

var _server = require('server');

var _server2 = _interopRequireDefault(_server);

var _sockets = require('sockets');

var _sockets2 = _interopRequireDefault(_sockets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var User = exports.User = (_class = function () {
  function User() {
    _classCallCheck(this, User);

    _initDefineProp(this, 'firstName', _descriptor, this);

    _initDefineProp(this, 'lastName', _descriptor2, this);

    _initDefineProp(this, 'middle', _descriptor3, this);

    _initDefineProp(this, 'prefix', _descriptor4, this);

    _initDefineProp(this, 'suffix', _descriptor5, this);

    _initDefineProp(this, 'bio', _descriptor6, this);

    _initDefineProp(this, 'email', _descriptor7, this);

    this.rooms = [];
  }

  User.authorize = function authorize(model) {
    User.instance.authorize(model);
    console.log('User logged in', User.instance);
    _sockets2.default.connect();
    _channel2.default.publish(new _actions.UserLoggedIn(User.instance));
    return User.instance;
  };

  User.unauthorize = function unauthorize() {
    if (User.instance) {
      User.instance.unauthorize();
      _channel2.default.publish(new _actions.UserLoggedOut(User.instance));
      console.log('User logged out', User.instance);
    }
    return User.instance;
  };

  User.prototype.authorize = function authorize(model) {
    this.model = null;
    this.profile = model.user_profile;
    this.firstName = this.profile.first_name;
    this.lastName = this.profile.last_name;
    this.prefix = this.profile.prefix;
    this.suffix = this.profile.suffix;
    this.middle = this.profile.middle_initial;
    this.bio = this.profile.bio;
    this.role = model.role;
    this.email = model.email;
    this.projects = model.projects || [];
    this.model = model;
    this.mapRooms(model.rooms);
    this.mapProjects();
  };

  User.prototype.unauthorize = function unauthorize() {
    this.model = null;
    this.firstName = null;
    this.lastName = null;
    this.prefix = null;
    this.suffix = null;
    this.middle = null;
    this.bioName = null;
    this.profile = null;
    this.email = null;
    this.rooms = [];
  };

  User.prototype._mapProject = function _mapProject(project) {
    var _this = this;

    this.projects[project._id] = project;
    project.isPrivate = true;

    project.select = function () {
      _this.projects.selectedProject = project;
    };

    Object.defineProperty(project, 'isSelected', {
      get: function get() {
        return _this.projects.selectedProject === project;
      }
    });
    var index = this.projects.indexOf(project);
    if (index === -1) {
      this.projects.push(project);
    }
  };

  User.prototype._mapRoom = function _mapRoom(room) {
    room = new _room.Room(room);
    room.user = this;
    this.rooms.push(room);
    this.rooms[room.model._id] = room;
    return room;
  };

  User.prototype.mapRooms = function mapRooms(rooms) {
    var _this2 = this;

    rooms.forEach(function (r) {
      return _this2._mapRoom(r);
    });
  };

  User.prototype.mapProjects = function mapProjects() {
    var _this3 = this;

    this.projects.forEach(function (project) {
      _this3._mapProject(project);
    });
  };

  User.prototype.propertyChanged = function propertyChanged(key, value) {
    console.log(key, value);
  };

  User.prototype.firstNameChanged = function firstNameChanged(value) {
    if (this.model) {
      this.isDirty = true;
      this.model.user_profile.first_name = value;
      this.updateSockets();
    }
  };

  User.prototype.lastNameChanged = function lastNameChanged(value) {
    if (this.model) {
      this.isDirty = true;
      this.model.user_profile.last_name = value;
      this.updateSockets();
    }
  };

  User.prototype.prefixChanged = function prefixChanged(value) {
    if (this.model) {
      this.isDirty = true;
      this.model.user_profile.prefix = value;
      this.updateSockets();
    }
  };

  User.prototype.suffixChanged = function suffixChanged(value) {
    if (this.model) {
      this.isDirty = true;
      this.model.user_profile.suffix = value;
      this.updateSockets();
    }
  };

  User.prototype.middleChanged = function middleChanged(value) {
    if (this.model) {
      this.isDirty = true;
      this.model.user_profile.middle_initial = value;
      this.updateSockets();
    }
  };

  User.prototype.emailNameChanged = function emailNameChanged(value) {
    if (this.model) {
      this.isDirty = true;
      this.model.email = value;
      this.updateSockets();
    }
  };

  User.prototype.bioNameChanged = function bioNameChanged(value) {
    if (this.model) {
      this.isDirty = true;
      this.model.bio = value;
      this.updateSockets();
    }
  };

  User.prototype.createProject = function createProject(project) {
    var _this4 = this;

    project.user = this.model._id;
    project.user_id = this.model.id;

    if (!project.title) {
      return Promise.reject('Title required');
    }

    return _server2.default.post('/api/project_profiles', project).then(function (resp) {
      _this4._mapProject(resp.content);
    });
  };

  User.prototype.createRoom = function createRoom() {
    var _this5 = this;

    return _server2.default.post('/api/rooms', { user: this.model }).then(function (room) {
      _this5.model.rooms.push(room);
      return _this5._mapRoom(room);
    });
  };

  User.prototype.updateSockets = function updateSockets() {
    _sockets2.default.publish('user:update', this.model);
  };

  User.prototype.save = function save() {
    this.isDirty = false;
  };

  return User;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'firstName', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'lastName', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'middle', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'prefix', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'suffix', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'bio', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'email', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
})), _class);


User.instance = new User();
_aureliaDependencyInjection.Container.instance.registerInstance(User, User.instance);
});

define('services/util',['require','exports','module'],function (require, exports, module) {'use strict';

exports.__esModule = true;
var Util = {
  normalize: function normalize(url, join) {
    if (url.charAt(0) === '/') url = url.substr(1);
    if (join.charAt(0) === '/') join = join.substr(1);
    if (url.charAt(url.length - 1) !== '/') url += '/';
    return url + join;
  },
  safeCb: function safeCb(cb) {
    return Function.isFunction(cb) ? cb : Function.noop;
  },
  urlParse: function urlParse(url) {
    var a = document.createElement('a');
    a.href = url;

    if (a.host === '') {
      a.href = a.href;
    }

    return a;
  },
  isSameOrigin: function isSameOrigin(url, origins) {
    url = Util.urlParse(url);
    origins = origins && [].concat(origins) || [];
    origins = origins.map(Util.urlParse);
    origins.push(window.location);
    origins = origins.filter(function (o) {
      var hostnameCheck = url.hostname === o.hostname;
      var protocolCheck = url.protocol === o.protocol;

      var portCheck = url.port === o.port || o.port === '' && (url.port === '80' || url.port === '443');
      return hostnameCheck && protocolCheck && portCheck;
    });
    return origins.length >= 1;
  }
};

exports.default = Util;
});

define('pages/auth/login',['require','exports','module','aurelia-dependency-injection','server/auth','aurelia-router'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Login = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _auth = require('server/auth');

var _aureliaRouter = require('aurelia-router');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Login = exports.Login = (_dec = (0, _aureliaDependencyInjection.inject)(_auth.Authentication, _aureliaRouter.Router), _dec(_class = function () {
  function Login(auth, router) {
    _classCallCheck(this, Login);

    this.auth = _auth.Authentication;
    this.user = {};

    this.authService = auth;
    this.router = router;
  }

  Login.prototype.activate = function activate() {
    document.documentElement.classList.add('hide-ui');
  };

  Login.prototype.deactivate = function deactivate() {
    document.documentElement.classList.remove('hide-ui');
  };

  Login.prototype.submit = function submit() {
    var _this = this;

    this.authService.login(this.user).then(function (user) {
      console.log(user);
      _this.router.navigate('#/portal');
    });
  };

  return Login;
}()) || _class);
});

define('pages/auth/logout',['require','exports','module','aurelia-dependency-injection','aurelia-router','aurelia-cookie','app-state'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Logout = undefined;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaRouter = require('aurelia-router');

var _aureliaCookie = require('aurelia-cookie');

var _appState = require('app-state');

var _appState2 = _interopRequireDefault(_appState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logout = exports.Logout = function () {
  function Logout() {
    _classCallCheck(this, Logout);
  }

  Logout.prototype.canActivate = function canActivate() {
    _appState2.default.authorized = null;
    _aureliaCookie.Cookie.delete('token');
    return new _aureliaRouter.Redirect('#/login');
  };

  return Logout;
}();
});

define('pages/auth/signup',['require','exports','module','aurelia-dependency-injection','server/auth','aurelia-router','services/roles'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Signup = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _auth = require('server/auth');

var _aureliaRouter = require('aurelia-router');

var _roles = require('services/roles');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultUser = {
  email: '',
  role: '',
  roles: [],
  firstName: '',
  lastName: '',
  password: '',
  confirm: ''
};

var Signup = exports.Signup = (_dec = (0, _aureliaDependencyInjection.inject)(_auth.Authentication, _aureliaRouter.Router), _dec(_class = function () {
  function Signup(authentication, router) {
    _classCallCheck(this, Signup);

    this.displayRoleSelection = true;
    this.roles = _roles.roles;
    this.user = {};

    this.authentication = authentication;
    this.router = router;
    this.user = Object.assign({}, defaultUser);
  }

  Signup.prototype.activate = function activate() {
    document.documentElement.classList.add('hide-ui');
  };

  Signup.prototype.deactivate = function deactivate() {
    document.documentElement.classList.remove('hide-ui');
  };

  Signup.prototype.submit = function submit() {
    var _this = this;

    this.passwordError = this.user.confirm !== this.user.password;

    if (this.passwordError) {
      console.log('passwords do not match', this.user);
      return this.passwordError = true;
    }

    if (!this.user.email) {
      console.log('email required');
      return this.emailError = true;
    }

    return this.authentication.signup(this.user).then(function () {
      _this.router.navigate('#/portal');
    });
  };

  Signup.prototype.submitRole = function submitRole() {
    if (this.user.role) {
      this.displayRoleSelection = false;
    }
  };

  return Signup;
}()) || _class);
});

define('pages/inbox/index',['require','exports','module','aurelia-dependency-injection','services/user','server','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Inbox = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _user = require('services/user');

var _server = require('server');

var _server2 = _interopRequireDefault(_server);

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Inbox = (_dec = (0, _aureliaDependencyInjection.inject)(_user.User), _dec(_class = function () {
  function Inbox(user) {
    var _this = this;

    _classCallCheck(this, Inbox);

    this.searchValue = '';
    this.activeRoom = null;
    this.editMode = false;

    this.user = user;

    this.user.rooms.forEach(function (room) {
      room.populate();
    });

    _appPortal2.default.navAction = {
      title: 'Compose',
      method: function method() {
        _this.user.createRoom().then(function (room) {
          _this.activeRoom = room;
        });
      }
    };
  }

  Inbox.prototype.activate = function activate() {
    var _this2 = this;

    _server2.default.get('/api/users').then(function (responce) {
      _this2.users = responce.content;
    });
  };

  Inbox.prototype.selectRoom = function selectRoom(room) {
    this.activeRoom = room;
  };

  Inbox.prototype.toggleEditMode = function toggleEditMode() {
    this.editMode = !this.editMode;
  };

  return Inbox;
}()) || _class);
exports.Inbox = Inbox;
});

define('pages/inbox/socket',['require','exports','module','aurelia-binding','aurelia-dependency-injection','services/user','sockets','server'],function (require, exports, module) {'use strict';

var _dec, _class, _desc, _value, _class2, _descriptor;

var _aureliaBinding = require('aurelia-binding');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _user = require('services/user');

var _sockets = require('sockets');

var _sockets2 = _interopRequireDefault(_sockets);

var _server = require('server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var InboxSockets = (_dec = (0, _aureliaDependencyInjection.inject)(_user.User), _dec(_class = (_class2 = function () {
  function InboxSockets(user) {
    _classCallCheck(this, InboxSockets);

    _initDefineProp(this, 'room', _descriptor, this);

    this.publish = _sockets2.default.publish.bind(_sockets2.default);
    this.subscribe = _sockets2.default.subscribe.bind(_sockets2.default);
    this.user = user;
    this.rooms = this.user.rooms;
    this.mapRooms();
  }

  InboxSockets.prototype._mapRoom = function _mapRoom(room) {
    var _this = this;

    this.rooms[room.recipient] = room;

    room.select = function () {
      _this.room = room;
    };
  };

  InboxSockets.prototype.mapRooms = function mapRooms() {
    var _this2 = this;

    this.rooms.forEach(function (r) {
      return _this2._mapRoom(r);
    });
  };

  InboxSockets.prototype.createRoom = function createRoom(email) {
    var data = {
      user: this.user.model,
      recipient: email
    };

    return _server2.default.post('/api/rooms', data).then(function (response) {});
  };

  InboxSockets.prototype.publishMessage = function publishMessage() {};

  return InboxSockets;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'room', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);
});

define('pages/project/create',['require','exports','module','aurelia-dependency-injection','aurelia-router','core/actions','core/channel'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.ProjectCreate = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaRouter = require('aurelia-router');

var _actions = require('core/actions');

var _channel = require('core/channel');

var _channel2 = _interopRequireDefault(_channel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectCreate = exports.ProjectCreate = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaRouter.Router), _dec(_class = function () {
  function ProjectCreate(router) {
    _classCallCheck(this, ProjectCreate);

    this.category = null;
    this.overview = null;
    this.teaser = null;

    this.router = router;
  }

  ProjectCreate.prototype.canActivate = function canActivate(params) {
    if (parseFloat(params.id) !== Auth.user.id) {
      return false;
    }
  };

  ProjectCreate.prototype.activate = function activate() {
    _channel2.default.push(new _actions.PortalState({
      title: 'New Project'
    }));
  };

  ProjectCreate.prototype.submit = function submit() {
    var category_id = this.category.id;
    var overview = this.overview;
    var teaser = this.teaser;
  };

  return ProjectCreate;
}()) || _class);
});

define('pages/project/index',['require','exports','module'],function (require, exports, module) {'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Projects = exports.Projects = function () {
  function Projects() {
    _classCallCheck(this, Projects);
  }

  Projects.prototype.configureRouter = function configureRouter(config, router) {
    config.map([{
      route: ['', 'list'],
      moduleId: './list',
      title: 'Projects',
      name: 'list',
      settings: {}
    }, {
      route: [':id', ':id/overview'],
      moduleId: './overview',
      title: 'Project Overview',
      name: 'overview',
      settings: {}
    }, {
      route: ':id/update',
      moduleId: './update',
      title: 'Update Project',
      name: 'update',
      settings: {}
    }]);

    config.mapUnknownRoutes(function () {
      return 'views/404';
    });

    this.router = router;
  };

  return Projects;
}();
});

define('pages/project/list',['require','exports','module','aurelia-dependency-injection'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.ProjectList = undefined;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectList = exports.ProjectList = function () {
  function ProjectList() {
    _classCallCheck(this, ProjectList);

    this.projects = [];
  }

  ProjectList.prototype.canActivate = function canActivate(params, config) {
    if (config.name === 'projects') {}
  };

  ProjectList.prototype.setStatus = function setStatus(event, project) {
    var value = event.target.value;
  };

  return ProjectList;
}();
});

define('pages/project/overview',['require','exports','module','core/actions','core/channel'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.ProjectOverview = undefined;

var _actions = require('core/actions');

var _channel = require('core/channel');

var _channel2 = _interopRequireDefault(_channel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectOverview = exports.ProjectOverview = function () {
  function ProjectOverview() {
    _classCallCheck(this, ProjectOverview);

    this.project = null;
  }

  ProjectOverview.prototype.activate = function activate(params) {
    _channel2.default.push(new _actions.PortalState({
      title: 'New Project'
    }));
  };

  return ProjectOverview;
}();
});

define('pages/project/update',['require','exports','module','core/actions','core/channel'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.ProjectUpdate = undefined;

var _actions = require('core/actions');

var _channel = require('core/channel');

var _channel2 = _interopRequireDefault(_channel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectUpdate = exports.ProjectUpdate = function () {
  function ProjectUpdate() {
    _classCallCheck(this, ProjectUpdate);

    this.project = null;
  }

  ProjectUpdate.prototype.activate = function activate(params) {
    _channel2.default.push(new _actions.PortalState({
      title: 'Update Project'
    }));
  };

  return ProjectUpdate;
}();
});

define('pages/search/results',['require','exports','module','aurelia-framework','aurelia-fetch-client'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.SearchResults = undefined;

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');

var _aureliaFetchClient = require('aurelia-fetch-client');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchResults = exports.SearchResults = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
  function SearchResults(http) {
    _classCallCheck(this, SearchResults);

    this.heading = 'Search Results';
    this.users = [];

    http.configure(function (config) {
      config.useStandardConfiguration().withBaseUrl('https://api.github.com/');
    });

    this.http = http;
  }

  SearchResults.prototype.activate = function activate() {

    $(document).ready(function () {
      $('ul.menu.search-tabs li a').bind('click', function (e) {
        var tab = $(e.toElement.parentElement);
        if (tab.hasClass('active')) {
          return;
        } else {
          toogleResults(tab);
        }
      });

      var toogleResults = function toogleResults(tab) {
        $('ul.menu.search-tabs li').removeClass('active');
        tab.addClass('active');

        $('.search-results').toggleClass('hidden');
      };
    });
  };

  return SearchResults;
}()) || _class);
});

define('pages/users/dreamer',['require','exports','module','aurelia-binding'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserPortal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _desc, _value, _class;

var _aureliaBinding = require('aurelia-binding');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var UserPortal = exports.UserPortal = (_dec = (0, _aureliaBinding.computedFrom)('_title'), (_class = function () {
  function UserPortal() {
    _classCallCheck(this, UserPortal);

    this.router = null;
    this._title = 'Portal';
  }

  UserPortal.prototype.configureRouter = function configureRouter(config, router) {
    config.title = 'User Portal';
    config.map([{
      route: [''],
      moduleId: './dreamer/home',
      title: 'Portal',
      name: 'portal',
      settings: {}
    }, buildRoute('profile', {
      nav: true,
      icon: 'account_circle'
    }), buildRoute('inbox', {
      moduleId: 'pages/inbox/index',
      nav: true,
      icon: 'sms'
    }), buildRoute('projects', {
      moduleId: './project/list',
      nav: true,
      icon: 'apps'
    }), buildRoute('groups', {
      moduleId: './dreamer/groups',
      nav: true,
      icon: 'group'
    }), buildRoute('reviews', {
      moduleId: './dreamer/reviews',
      nav: true,
      icon: 'rate_review'
    }), buildRoute('project-create', {
      moduleId: './project/create',
      route: 'projects/create',
      title: 'New Project'
    }), buildRoute('project-overview', {
      moduleId: './project/overview',
      route: 'project/overview',
      title: 'Project Overview',
      project: true,
      icon: 'folder'
    }), buildRoute('project-profile', {
      moduleId: './project/profile',
      route: 'project/profile',
      title: 'Project Profile',
      project: true,
      icon: 'folder_special'
    }), buildRoute('project-members', {
      moduleId: './project/members',
      route: 'project/members',
      title: 'Project Members',
      project: true,
      icon: 'group'
    }), buildRoute('project-update', {
      moduleId: './project/update',
      route: 'project/update/:id',
      title: 'Update Project',
      project: true
    })]);

    config.mapUnknownRoutes(function () {
      return 'views/404';
    });

    console.log(this);

    this.router = router;
  };

  UserPortal.prototype.bind = function bind() {
    this.router.projectNavigation = this.router.routes.filter(function (route) {
      return route.project;
    }).map(function (route) {
      route.navModel.href = '#/dreamer/' + route.route;
      return route.navModel;
    });
  };

  _createClass(UserPortal, [{
    key: 'title',
    get: function get() {
      return this.router && this.router.currentInstruction ? this.router.currentInstruction.config.title : this._title;
    }
  }]);

  return UserPortal;
}(), (_applyDecoratedDescriptor(_class.prototype, 'title', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'title'), _class.prototype)), _class));


function buildRoute(name, options) {
  var route = name;
  var title = _.capitalize(name);
  var nav = false;
  var auth = false;
  var settings = {};
  var moduleId = './dreamer/' + name;
  var config = { route: route, name: name, title: title, nav: nav, auth: auth, settings: settings, moduleId: moduleId };
  return Object.assign(config, options);
}
});

define('pages/users/investor',['require','exports','module','aurelia-binding','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserPortal = undefined;

var _aureliaBinding = require('aurelia-binding');

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserPortal = exports.UserPortal = function () {
  function UserPortal() {
    _classCallCheck(this, UserPortal);

    this.router = null;
  }

  UserPortal.prototype.configureRouter = function configureRouter(config, router) {
    config.title = 'User Portal';
    config.map([{
      route: [''],
      moduleId: './investor/home',
      title: 'Portal',
      name: 'portal',
      settings: {}
    }, buildRoute('profile', {
      nav: true,
      icon: 'account_circle'
    }), buildRoute('inbox', {
      moduleId: './inbox/index',
      nav: true,
      icon: 'sms'
    }), buildRoute('project-search', {
      moduleId: './investor/project/search',
      nav: false
    }), buildRoute('projects', {
      moduleId: './project/list',
      nav: true,
      icon: 'apps'
    }), buildRoute('groups', {
      moduleId: './investor/groups',
      nav: true,
      icon: 'group'
    }), buildRoute('reviews', {
      moduleId: './investor/reviews',
      nav: true,
      icon: 'rate_review'
    }), buildRoute('project-create', {
      moduleId: './project/create',
      route: 'projects/create',
      title: 'New Project'
    }), buildRoute('project-overview', {
      moduleId: './project/overview',
      route: 'project/overview',
      title: 'Project Overview',
      project: true,
      icon: 'folder'
    }), buildRoute('project-profile', {
      moduleId: './investor/project/profile',
      route: 'projects/:projectId',
      title: 'Project Profile',
      project: true,
      icon: 'folder_special'
    }), buildRoute('project-members', {
      moduleId: './project/members',
      route: 'project/members',
      title: 'Project Members',
      project: true,
      icon: 'group'
    }), buildRoute('project-update', {
      moduleId: './project/update',
      route: 'project/update/:id',
      title: 'Update Project',
      project: true
    })]);

    config.mapUnknownRoutes(function () {
      return 'views/404';
    });

    console.log(this);

    this.router = router;
  };

  UserPortal.prototype.activate = function activate() {
    var _this = this;

    _appPortal2.default.navAction = {
      title: 'Search',
      method: function method() {
        return _this.router.navigate('#/investor/project-search');
      }
    };
  };

  UserPortal.prototype.bind = function bind() {
    this.router.projectNavigation = this.router.routes.filter(function (route) {
      return route.project;
    }).map(function (route) {
      route.navModel.href = '#/investor/' + route.route;
      return route.navModel;
    });
  };

  return UserPortal;
}();

function buildRoute(name, options) {
  var route = name;
  var title = _.capitalize(name);
  var nav = false;
  var auth = false;
  var settings = {};
  var moduleId = './investor/' + name;
  var config = { route: route, name: name, title: title, nav: nav, auth: auth, settings: settings, moduleId: moduleId };
  return Object.assign(config, options);
}
});

define('pages/users/portal',['require','exports','module','aurelia-dependency-injection','aurelia-router','aurelia-binding','services/user'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserPortal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaRouter = require('aurelia-router');

var _aureliaBinding = require('aurelia-binding');

var _user = require('services/user');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var UserPortal = exports.UserPortal = (_dec = (0, _aureliaDependencyInjection.inject)(_user.User), _dec2 = (0, _aureliaBinding.computedFrom)('_title'), _dec(_class = (_class2 = function () {
  function UserPortal(user) {
    _classCallCheck(this, UserPortal);

    this.router = null;
    this._title = 'Portal';

    this.user = user;
  }

  UserPortal.prototype.canActivate = function canActivate() {
    return new _aureliaRouter.Redirect('#/' + this.user.role);
  };

  UserPortal.prototype.configureRouter = function configureRouter(config, router) {
    config.title = 'User Portal';
    config.map([{
      route: [''],
      moduleId: './user/home',
      title: 'Portal',
      name: 'portal',
      settings: {}
    }, buildRoute('profile', {
      nav: true,
      icon: 'account_circle'
    }), buildRoute('projects', {
      moduleId: './project/list',
      nav: true,
      icon: 'apps'
    }), buildRoute('groups', {
      moduleId: './user/groups',
      nav: true,
      icon: 'group'
    }), buildRoute('reviews', {
      moduleId: './user/reviews',
      nav: true,
      icon: 'rate_review'
    }), buildRoute('project-create', {
      moduleId: './project/create',
      route: 'projects/create',
      title: 'New Project'
    }), buildRoute('project-overview', {
      moduleId: './project/overview',
      route: 'project/overview',
      title: 'Project Overview',
      project: true,
      icon: 'folder'
    }), buildRoute('project-profile', {
      moduleId: './project/profile',
      route: 'project/profile',
      title: 'Project Profile',
      project: true,
      icon: 'folder_special'
    }), buildRoute('project-members', {
      moduleId: './project/members',
      route: 'project/members',
      title: 'Project Members',
      project: true,
      icon: 'group'
    }), buildRoute('project-update', {
      moduleId: './project/update',
      route: 'project/update/:id',
      title: 'Update Project',
      project: true
    })]);

    config.mapUnknownRoutes(function () {
      return 'views/404';
    });

    console.log(this);

    this.router = router;
  };

  UserPortal.prototype.bind = function bind() {
    this.router.projectNavigation = this.router.routes.filter(function (route) {
      return route.project;
    }).map(function (route) {
      route.navModel.href = '#/portal/' + route.route;
      return route.navModel;
    });
  };

  _createClass(UserPortal, [{
    key: 'title',
    get: function get() {
      return this.router && this.router.currentInstruction ? this.router.currentInstruction.config.title : this._title;
    }
  }]);

  return UserPortal;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'title', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'title'), _class2.prototype)), _class2)) || _class);


function buildRoute(name, options) {
  var route = name;
  var title = _.capitalize(name);
  var nav = false;
  var auth = false;
  var settings = {};
  var moduleId = './user/' + name;
  var config = { route: route, name: name, title: title, nav: nav, auth: auth, settings: settings, moduleId: moduleId };
  return Object.assign(config, options);
}
});

define('pages/show-down/index',['require','exports','module','aurelia-framework','server/project'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.ShowDown = undefined;

var _aureliaFramework = require('aurelia-framework');

var _project = require('server/project');

var _project2 = _interopRequireDefault(_project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShowDown = exports.ShowDown = function () {
  function ShowDown() {
    _classCallCheck(this, ShowDown);

    this.accepted = [];
    this.denied = [];
  }

  ShowDown.prototype.activate = function activate() {
    var _this = this;

    _project2.default.all().then(function (prs) {
      _this.projects = prs;
    });
  };

  ShowDown.prototype.acceptedProject = function acceptedProject(project) {
    var index = this.projects.indexOf(project);
    if (~index) {
      this.projects.splice(index, 1);
    }
    this.accepted.push(project);
  };

  ShowDown.prototype.deniedProject = function deniedProject(project) {
    var index = this.projects.indexOf(project);
    if (~index) {
      this.projects.splice(index, 1);
    }
    this.denied.push(project);
  };

  return ShowDown;
}();
});

define('pages/welcome/_card-index',['require','exports','module'],function (require, exports, module) {'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cards = [{
  title: 'dreamer',
  image: 'resources/images/dreamer.png',
  background: 'resources/images/bg-dreamer.jpg',
  text: 'Are you an idea maker, looking for a team to help jump start your project?'
}, {
  title: 'mentor',
  image: 'resources/images/mentor.png',
  background: 'resources/images/bg-mentor.jpg',
  text: 'Are you an experienced leader who can give direction to a creative team?'
}, {
  title: 'investor',
  image: 'resources/images/investor.png',
  background: 'resources/images/bg-investor.jpg',
  text: 'Are you a venture capitalist or hobby investor looking to fund the next great idea?'
}, {
  title: 'service provider',
  image: 'resources/images/developer.png',
  background: 'resources/images/bg-developer.jpg',
  text: 'Are you looking to help create the next big idea or add value to a project with your specialized skills?'
}];

var Welcome = exports.Welcome = function Welcome() {
  _classCallCheck(this, Welcome);

  this.topcards = cards.slice(0, 2);
  this.bottomcards = cards.slice(2);
  this.cards = cards;
};

var UpperValueConverter = exports.UpperValueConverter = function () {
  function UpperValueConverter() {
    _classCallCheck(this, UpperValueConverter);
  }

  UpperValueConverter.prototype.toView = function toView(value) {
    return value && value.toUpperCase();
  };

  return UpperValueConverter;
}();
});

define('pages/welcome/index',['require','exports','module'],function (require, exports, module) {'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cards = [{
  title: 'dreamer',
  image: 'resources/images/dreamer.png',
  background: 'resources/images/bg-dreamer.jpg',
  text: 'Are you an idea maker, looking for a team to help jump start your project?'
}, {
  title: 'mentor',
  image: 'resources/images/mentor.png',
  background: 'resources/images/bg-mentor.jpg',
  text: 'Are you an experienced leader who can give direction to a creative team?'
}, {
  title: 'investor',
  image: 'resources/images/investor.png',
  background: 'resources/images/bg-investor.jpg',
  text: 'Are you a venture capitalist or hobby investor looking to fund the next great idea?'
}, {
  title: 'service provider',
  image: 'resources/images/developer.png',
  background: 'resources/images/bg-developer.jpg',
  text: 'Are you looking to help create the next big idea or add value to a project with your specialized skills?'
}];

var Welcome = exports.Welcome = function Welcome() {
  _classCallCheck(this, Welcome);

  this.topcards = cards.slice(0, 2);
  this.bottomcards = cards.slice(2);
  this.cards = cards;
};

var UpperValueConverter = exports.UpperValueConverter = function () {
  function UpperValueConverter() {
    _classCallCheck(this, UpperValueConverter);
  }

  UpperValueConverter.prototype.toView = function toView(value) {
    return value && value.toUpperCase();
  };

  return UpperValueConverter;
}();
});

define('pages/welcome/welcome-card',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.WelcomeCard = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var WelcomeCard = exports.WelcomeCard = (_dec = (0, _aureliaTemplating.customElement)('welcome-card'), _dec2 = (0, _aureliaDependencyInjection.inject)(Element, _aureliaTemplating.ElementEvents), _dec(_class = _dec2(_class = (_class2 = function () {
  function WelcomeCard(element, events) {
    _classCallCheck(this, WelcomeCard);

    _initDefineProp(this, 'picture', _descriptor, this);

    _initDefineProp(this, 'background', _descriptor2, this);

    this.isScaled = false;

    this._element = element;
    this._events = events;
  }

  WelcomeCard.prototype.bind = function bind(context) {
    this.context = context.card;
  };

  WelcomeCard.prototype.attached = function attached() {
    var _this = this;

    this._content = this._element.querySelector('card-content');

    this._events.subscribe('mouseenter', function (event) {
      if (event.target === _this._element) {
        _this.scaleUp();
      }
    });

    this._events.subscribe('mouseleave', function (event) {
      if (event.target === _this._element) {
        _this.scaleDown();
      }
    });

    this._events.publish('attach-directive-card');
  };

  WelcomeCard.prototype.detach = function detach() {
    this._events.publish('detach-directive-card');
  };

  WelcomeCard.prototype.scaleUp = function scaleUp() {
    if (!this.isScaled) {
      this.isScaled = true;
    }
  };

  WelcomeCard.prototype.scaleDown = function scaleDown() {
    if (this.isScaled) {
      this.isScaled = false;
    }
  };

  return WelcomeCard;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'picture', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'background', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class) || _class);


directiveCards();
function directiveCards() {

  var attached = new Map();
  var winHeight = window.screen.availHeight;
  var winWidth = window.screen.availWidth;
  var currentCard = void 0;

  var getRotation = function getRotation(pos, mid, max) {
    return (mid - pos) / mid * max;
  };

  var mousemove = function mousemove(event) {

    if (!currentCard) {
      return;
    }

    var clientWidth = currentCard.clientWidth;
    var clientHeight = currentCard.clientHeight;
    var size = clientWidth;

    if (clientHeight > clientWidth) {
      size = clientHeight;
    }

    if (!currentCard.currentOffset) {
      currentCard.currentOffset = currentCard.getOffset();
    }

    if (winHeight !== window.screen.availHeight || winWidth !== window.screen.availWidth) {
      currentCard.currentOffset = currentCard.getOffset();
    }

    var o = currentCard.currentOffset;

    var x = (event.offsetX || event.layerX) - clientWidth / 2;
    var y = (event.offsetY || event.layerY) - clientHeight / 2;

    var xpos = event.pageX - o.left;
    var ypos = event.pageY - o.top;

    var centerX = clientWidth / 2;
    var centerY = clientHeight / 2;
    var theta = Math.atan2(x, y);
    var angle = theta * 180 / Math.PI - 90;
    if (angle < 0) {
      angle = angle + 360;
    }
    var gradientX = xpos / (centerX * 2) * 100;
    var gradientY = ypos / (centerY * 2) * 100;
    var gradient = 2 * (Math.max(centerX * 2, centerY * 2) * 2);
    var maxRotation = 12;
    var maxTranslate = 5;

    var radialX = getRotation(xpos, centerX, maxRotation);
    var radialY = getRotation(ypos, centerY, maxRotation);
    var tranX = getRotation(xpos, centerX, maxTranslate);
    var tranY = getRotation(ypos, centerY, maxTranslate);

    var translateX = -1 * tranX;
    var translateY = -1 * tranY;
    var rotateX = -1 * radialY;
    var rotateY = radialX;
    var transform = 'translate3d(' + translateX + '%, ' + translateY + '%, 0) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    var radialGradient = 'radial-gradient(' + gradient + 'px at ' + gradientX + '% ' + gradientY + '%, rgba(255,255,255, .25), transparent)';
    var shadowX = -0.5 * getRotation(xpos, centerX, 12);
    var shadowY = 24 + -0.5 * getRotation(ypos, centerY, 12);
    var spread = 24;
    var shadowColor = 'rgba(0, 0, 0, .33)';
    var shadow = shadowX + 'px ' + shadowY + 'px ' + spread + 'px -10px ' + shadowColor + ', 0 12px 20px -6px rgba(0,0,0,0.3)';

    requestAnimationFrame(function () {
      if (currentCard) {
        currentCard.shineNode.css('background', radialGradient);
        currentCard.css('transform', transform);
        currentCard.bgNode.css('boxShadow', shadow);
      }
    });
  };

  var attachCard = function attachCard(e) {
    var node = e.target;
    node.contentNode = node.querySelector('card-content');
    node.shineNode = node.querySelector('.shine');
    node.bgNode = node.querySelector('card-background');
    attached.set(node, node);

    node.events.subscribe('mouseenter', function () {
      if (e.target !== node) return;
      currentCard = node;
    });

    node.events.subscribe('mouseleave', function (e) {
      if (e.target !== node) return;
      if (currentCard === node) {
        currentCard = null;
      }
      node.css({
        transitionDuration: '0.2s',
        transform: ''
      });
      node.shineNode.css({
        background: ''
      });
      node.bgNode.css({
        boxShadow: ''
      });
    });
  };

  var detachCard = function detachCard(e) {
    if (attached.has(e.target)) {
      e.target.events.disposeAll();
      attached.delete(e.target);
    }
  };

  document.events.subscribe('attach-directive-card', attachCard, true);
  document.events.subscribe('detach-directive-card', detachCard, true);
  document.events.subscribe('mousemove', mousemove, true);
}

function init3dcard(element, events) {

  var content = element.querySelector('card-content');
  var shine = element.querySelector('.shine');
  var layers = Array.from(element.querySelectorAll('div[class*="layer-"]'));

  content.css('-webkit-transform-style', 'preserve-3d');
  content.css('transform-style', 'preserve-3d');

  var contentWidth = void 0;
  var contentHeight = void 0;
  var contentScale = void 0;

  var setDefaultStyle = [];
  var setCardStyle = function setCardStyle() {
    contentWidth = content.clientWidth;
    contentHeight = content.clientHeight;
    contentScale = contentWidth / 700;
    content.css('transform', 'translate3d(0,0,0) matrix3d(1,0,0.00,0.00,0.00,1,0.00,0,0,0,1,0,0,0,0,1) scale(' + contentScale + ')');
  };

  setCardStyle();

  events.subscribe('mousemove', function (e) {

    var height = content.clientHeight;

    var w = document.body.clientWidth;
    var h = document.body.clientHeight;
    var offsetX = 0.5 - e.pageX / w;
    var offsetY = 0.5 - e.pageY / h;
    var dy = e.pageY - h / 2;
    var dx = e.pageX - w / 2;

    console.log({ dy: dy, dx: dx });

    var theta = Math.atan2(dy, dx);
    var angle = theta * 180 / Math.PI - 90;
    var offsetPoster = 5;
    var transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + -offsetY * offsetPoster + 'deg) rotateY(' + offsetX * (offsetPoster * 2) + 'deg)';
    if (angle < 0) {
      angle = angle + 360;
    }

    shine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + e.pageY / h + ') 0%,rgba(255,255,255,0) 80%)');

    content.css('transform', transformPoster);

    layers.forEach(function (layer) {
      var offsetLayer = layer.dataset.offset || 0;
      var transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';
      layer.css('transform', transformLayer);
    });
  });
}
});

define('server/models/project',['require','exports','module'],function (require, exports, module) {"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Project = exports.Project = function Project(server, profile) {
  _classCallCheck(this, Project);
};
});

define('resources/app-bar/app-bar',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-event-aggregator','aurelia-pal','core/actions','app-state','core/channel'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.AppBar = undefined;

var _dec, _dec2, _dec3, _dec4, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _aureliaPal = require('aurelia-pal');

var _actions = require('core/actions');

var _appState = require('app-state');

var _appState2 = _interopRequireDefault(_appState);

var _channel = require('core/channel');

var _channel2 = _interopRequireDefault(_channel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppBar = exports.AppBar = (_dec = (0, _aureliaTemplating.customElement)('app-bar'), _dec2 = (0, _aureliaDependencyInjection.inject)(Element, _aureliaTemplating.ElementEvents), _dec3 = (0, _aureliaTemplating.bindable)({ name: 'router' }), _dec4 = (0, _aureliaTemplating.bindable)({ name: 'routerConfig' }), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function () {
  function AppBar(element, events) {
    var _this = this;

    _classCallCheck(this, AppBar);

    this.state = _appState2.default;

    this.element = element;
    this.events = events;
    element.__proto__.float = function (e) {
      return _this.float(e);
    };
  }

  AppBar.prototype.float = function float() {
    var value = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

    this.backdrop = this.backdrop = this.backdrop || this.element.querySelector('[name="backdrop"]');

    if (!this.backdrop) return;
    if (typeof value !== 'boolean') return;

    if (value !== this.isFloat) {
      this.isFloat = value;
      return this.backdrop.css({ opacity: value ? 1 : 0 });
    }
  };

  return AppBar;
}()) || _class) || _class) || _class) || _class);
});

define('resources/app-bar/user-profile',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserProfile = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var UserProfile = exports.UserProfile = (_dec = (0, _aureliaTemplating.customElement)('user-profile'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents), _dec(_class = _dec2(_class = (_class2 = function () {
  function UserProfile(element, events) {
    _classCallCheck(this, UserProfile);

    _initDefineProp(this, 'value', _descriptor, this);

    console.log({ auth: this.auth });
    this._element = element;
    this._events = events;
    this.$element = $(this._element);
  }

  UserProfile.prototype.attached = function attached() {
    this.dropdown = new Dropdown(this._element, {
      menu: true,
      handle: this._element.find('icon'),
      container: this._element.find('container')
    });
    this.dropdown.close();
    this.dropdown.bind();
  };

  UserProfile.prototype.detached = function detached() {
    this.dropdown.unbind();
  };

  return UserProfile;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class) || _class);
});

define('resources/app-footer/app-footer',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.AppFooter = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var AppFooter = exports.AppFooter = (_dec = (0, _aureliaTemplating.customElement)('app-footer'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents), _dec(_class = _dec2(_class = (_class2 = function () {
  function AppFooter(element, events) {
    _classCallCheck(this, AppFooter);

    _initDefineProp(this, 'value', _descriptor, this);

    this._element = element;
    this._events = events;
  }

  AppFooter.prototype.attached = function attached() {};

  return AppFooter;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class) || _class);
});

define('resources/article-list/article-list',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.AppFooter = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var AppFooter = exports.AppFooter = (_dec = (0, _aureliaTemplating.customElement)('article-list'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents), _dec(_class = _dec2(_class = (_class2 = function () {
  function AppFooter(element, events) {
    _classCallCheck(this, AppFooter);

    _initDefineProp(this, 'value', _descriptor, this);

    this._element = element;
    this._events = events;
  }

  AppFooter.prototype.attached = function attached() {};

  return AppFooter;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class) || _class);
});

define('resources/dialog/compiler',['require','exports','module','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.default = DialogCompiler;

var _aureliaPal = require('aurelia-pal');

function DialogCompiler(compiler, resources, element, instruction) {
  transformChildren(element, 'dialog');
  return true;
}

function transformChildren(parent, prefix, element) {
  var children = Array.from(parent.children);
  var child = void 0;
  var nodeName = void 0;
  var node = void 0;

  element = element || parent;

  while (child = children.shift()) {
    nodeName = child.localName;
    node = _aureliaPal.DOM.createElement(prefix + '-' + nodeName);
    element.classList.add('has-' + nodeName);
    parent.insertBefore(node, child);
    node.appendChild(child);
  }
}
});

define('resources/dialog/dialog-step',['require','exports','module','aurelia-dependency-injection','aurelia-templating','core/animate','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.DialogStep = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _animate = require('core/animate');

var _aureliaPal = require('aurelia-pal');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var DialogStep = exports.DialogStep = (_dec = (0, _aureliaTemplating.customElement)('dialog-step'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents), _dec(_class = _dec2(_class = (_class2 = function () {
  function DialogStep(element, events) {
    _classCallCheck(this, DialogStep);

    _initDefineProp(this, 'step', _descriptor, this);

    this._element = element;
    this._events = events;
  }

  DialogStep.prototype.attached = function attached() {
    this.parentNode = this._element.parentNode;
  };

  DialogStep.prototype.next = function next() {
    if (this.onNext) this.onNext();
  };

  DialogStep.prototype.back = function back() {
    if (this.onBack) this.onBack();
  };

  return DialogStep;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'step', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2)) || _class) || _class);
});

define('resources/dialog/dialog',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-event-aggregator','core/animate','aurelia-pal','./compiler'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Dialog = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _animate = require('core/animate');

var _aureliaPal = require('aurelia-pal');

var _compiler = require('./compiler');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var Dialog = exports.Dialog = (_dec = (0, _aureliaTemplating.customElement)('dialog'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents, _aureliaEventAggregator.EventAggregator), _dec(_class = _dec2(_class = (_class2 = function () {
  function Dialog(element, events, eventAggregator) {
    _classCallCheck(this, Dialog);

    _initDefineProp(this, 'value', _descriptor, this);

    _initDefineProp(this, 'steps', _descriptor2, this);

    _initDefineProp(this, 'currentStep', _descriptor3, this);

    this._element = element;
    this._events = events;
    this.eventAggregator = eventAggregator;
  }

  Dialog.prototype.bind = function bind() {
    this.slotNode = this._element.previousSibling;
    this.parentNode = this._element.parentNode;
  };

  Dialog.prototype.attached = function attached() {
    var _this = this;

    if (this.steps) {
      this.stepElements = Array.from(this._element.querySelectorAll('dialog-step'));
      this.stepElements.forEach(function (step, index) {

        step.au.controller.viewModel.onNext = function () {
          if (index !== _this.stepElements.length - 1) {
            _this.currentStep = index + 1;
          } else {
            _this._events.publish('complete');
          }
        };
        if (index) {
          step.au.controller.viewModel.onBack = function () {
            _this.currentStep = index - 1;
          };
        }
      });
    }
  };

  Dialog.prototype.getContainer = function getContainer() {
    this.container = document.querySelector('dialog-window');
    if (!this.container) {
      document.body.appendChild(this.container = document.createElement('dialog-window'));
    }
    return this.container;
  };

  Dialog.prototype.activateDialog = function activateDialog() {
    var _this2 = this;

    var frames = {
      from: { transform: (0, _animate.scale)(1.2), opacity: 0 },
      to: { transform: (0, _animate.scale)(1), opacity: 1 }
    };

    (0, _animate.animate)(document.querySelector('main'), {
      from: { filter: 'blur(0)' },
      to: { filter: 'blur(3px)' }
    });

    return new Promise(function (resolve) {
      _this2.currentResolve = function () {
        _this2.currentResolve = null;
        return resolve();
      };

      _this2.getContainer().appendChild(_this2._element);

      (0, _animate.animate)(_this2._element, frames, { duration: 200 }).then(function () {
        _this2.getContainer().style.pointerEvents = 'auto';

        _this2.getContainer().events.subscribeOnce('click', function (event) {
          if (!_this2._element.contains(event.target)) {
            _this2.deactivateDialog();
          }
        });
      });
    });
  };

  Dialog.prototype.deactivateDialog = function deactivateDialog() {
    var _this3 = this;

    var frames = {
      from: { transform: (0, _animate.scale)(1), opacity: 1 },
      to: { transform: (0, _animate.scale)(1.2), opacity: 0 }
    };
    (0, _animate.animate)(document.querySelector('main'), {
      from: { filter: 'blur(3px)' },
      to: { filter: 'blur(0)' }
    });

    return (0, _animate.animate)(this._element, frames, { duration: 200 }).then(function () {
      _this3.getContainer().style.pointerEvents = 'none';
      _this3.parentNode.insertBefore(_this3._element, _this3.slotNode);
      _this3.currentResolve && _this3.currentResolve();
    });
  };

  Dialog.prototype.currentStepChanged = function currentStepChanged(value, last) {
    console.log(value);
    var frames = void 0;
    var stepSize = this.stepElements.length;
    var offset = 100 / stepSize * (last || 0);
    var next = 100 / stepSize * (value || 0);

    frames = {
      from: { transform: (0, _animate.translate3d)(-1 * offset) },
      to: { transform: (0, _animate.translate3d)(-1 * next) }
    };

    (0, _animate.animate)(this._element.querySelector('dialog-container'), frames);
  };

  return Dialog;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'steps', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'currentStep', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2)) || _class) || _class);
});

define('resources/dialog/login-dialog',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal','server/auth','aurelia-event-aggregator'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.LoginDialog = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

var _auth = require('server/auth');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var LoginDialog = exports.LoginDialog = (_dec = (0, _aureliaTemplating.customElement)('login-dialog'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents, _auth.Authentication, _aureliaEventAggregator.EventAggregator), _dec(_class = _dec2(_class = (_class2 = function () {
  function LoginDialog(element, events, auth, eventAggregator) {
    _classCallCheck(this, LoginDialog);

    _initDefineProp(this, 'value', _descriptor, this);

    this.newUser = {};

    this._element = element;
    this._events = events;
    this._auth = auth;
    this.eventAggregator = eventAggregator;
  }

  LoginDialog.prototype.attached = function attached() {
    var _this = this;

    this.subscription = this.eventAggregator.subscribe('show-login-dialog', function (payload) {
      _this.dialog.activateDialog().then(function () {
        payload.onComplete();
      });
    });

    this.subscription = this.eventAggregator.subscribe('show-signup-dialog', function (payload) {
      _this.isSignup = true;
      _this.dialog.activateDialog().then(function () {
        payload.onComplete();
      });
    });
  };

  LoginDialog.prototype.detached = function detached() {
    this.subscription.dispose();
  };

  LoginDialog.prototype.complete = function complete() {
    var _this2 = this;

    var body = {
      email: this.newUser.email,
      password: this.newUser.password
    };

    if (this.isSignup) {
      this.isSignup = false;
      return this._auth.create(body).then(function (res) {
        _this2.dialog.deactivateDialog();
      });
    }

    this._auth.login(body).then(function (res) {
      _this2.dialog.deactivateDialog();
    });
  };

  return LoginDialog;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class) || _class);
});

define('resources/auth-nav/element',['require','exports','module','aurelia-dependency-injection','aurelia-templating','resources/dropdown','aurelia-pal','services/user','core/channel'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.AuthNav = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _dropdown = require('resources/dropdown');

var _aureliaPal = require('aurelia-pal');

var _user = require('services/user');

var _channel = require('core/channel');

var _channel2 = _interopRequireDefault(_channel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var AuthNav = exports.AuthNav = (_dec = (0, _aureliaTemplating.customElement)('auth-nav'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents, _user.User), _dec(_class = _dec2(_class = (_class2 = function () {
  function AuthNav(element, events, user) {
    _classCallCheck(this, AuthNav);

    _initDefineProp(this, 'value', _descriptor, this);

    this.element = element;
    this.events = events;
    this.user = user;
  }

  AuthNav.prototype.attached = function attached() {
    this.dropdown = new _dropdown.Dropdown(this.element, {
      menu: true,
      handle: this.element.find('icon'),
      container: this.element.find('container')
    });
    this.dropdown.close();
    this.dropdown.bind();
  };

  AuthNav.prototype.detached = function detached() {
    this.dropdown.unbind();
  };

  return AuthNav;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class) || _class);
});

define('resources/elements/action',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Action = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var Action = exports.Action = (_dec = (0, _aureliaTemplating.customElement)('action'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents), _dec(_class = _dec2(_class = (_class2 = function () {
  function Action(element, events) {
    _classCallCheck(this, Action);

    _initDefineProp(this, 'icon', _descriptor, this);

    _initDefineProp(this, 'href', _descriptor2, this);

    this._element = element;
    this._events = events;
  }

  Action.prototype.attached = function attached() {};

  return Action;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'icon', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'href', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class) || _class);
});

define('resources/elements/fab',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Fab = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var Fab = exports.Fab = (_dec = (0, _aureliaTemplating.customElement)('fab'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents), _dec(_class = _dec2(_class = (_class2 = function () {
  function Fab(element, events) {
    _classCallCheck(this, Fab);

    _initDefineProp(this, 'value', _descriptor, this);

    this._element = element;
    this._events = events;
  }

  Fab.prototype.attached = function attached() {};

  return Fab;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class) || _class);
});

define('resources/elements/icon',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal','aurelia-loader','services/cache'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.IconElement = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

var _aureliaLoader = require('aurelia-loader');

var _cache = require('services/cache');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var default_paths = {
  'checkmark': 'checkmark.svg',
  'close': 'close.svg',
  'person': 'person.svg',
  'more': 'more-vert.svg',
  'more-vert': 'more-vert.svg',
  'add-box': 'add-box.svg',
  'fiber': 'fiber.svg'
};

var IconElement = exports.IconElement = (_dec = (0, _aureliaTemplating.customElement)('icon'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents, _aureliaLoader.Loader, _cache.Cache), _dec(_class = _dec2(_class = (_class2 = function () {
  function IconElement(element, events, loader, cache) {
    _classCallCheck(this, IconElement);

    _initDefineProp(this, 'type', _descriptor, this);

    _initDefineProp(this, 'md', _descriptor2, this);

    this._element = element;
    this._events = events;
    this._loader = loader;
    this._cache = cache;
  }

  IconElement.prototype._loadIcon = function _loadIcon(icon) {
    var _this = this;

    if (!icon) return Promise.resolve('');
    if (icon in default_paths) {
      icon = default_paths[icon];
    } else {
      icon = icon + '.svg';
    }
    var found = void 0;
    if (found = this._cache.getItem('icon.' + icon)) {
      return Promise.resolve(found);
    }

    return this._loader.loadText('resources/icons/' + icon).then(function (text) {
      _this._cache.setItem('icon.' + icon, text);
      return text;
    });
  };

  IconElement.prototype.mdChanged = function mdChanged(value) {
    if (value) {
      value = value.replace(/\s+|\-/, '_');
      this._element.innerHTML = '<i class="material-icons">' + value + '</i>';
      this.mdicon = this._element.querySelector('.material-icons');
    } else if (this.mdicon) {
      this._element.removeChild(this.mdicon);
      this.mdicon = null;
    }
  };

  IconElement.prototype.typeChanged = function typeChanged(value) {
    var _this2 = this;

    this._loadIcon(value).then(function (text) {
      _this2._element.innerHTML = text;
      _this2.svg = _this2._element.querySelector('svg');
    });
  };

  IconElement.prototype.attached = function attached() {
    this.md = this.md || this._element.getAttribute('md') || false;
    if (this.md) {
      this.mdChanged(this.md);
    }
  };

  return IconElement;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'type', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'md', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class) || _class);
});

define('resources/elements/label',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.Label = undefined;

var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function processLabel(compiler, resources, element, instruction) {

  var child = element.firstChild;
  var span = void 0;
  while (child) {
    var next = child.nextSibling;

    if (child.nodeType == 3 && child.textContent.trim()) {
      span = _aureliaPal.DOM.createElement('span');
      span.classList.add('text');
      element.insertBefore(span, child);
      span.appendChild(child);
    }

    child = next;
  }

  if (!!element.querySelector('switch')) {
    element.classList.add('has-switch');
  }

  return true;
}

var Label = exports.Label = (_dec = (0, _aureliaTemplating.customElement)('label'), _dec2 = (0, _aureliaTemplating.processContent)(processLabel), _dec3 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents, _aureliaDependencyInjection.Container), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
  function Label(element, events, container) {
    _classCallCheck(this, Label);

    _initDefineProp(this, 'value', _descriptor, this);

    _initDefineProp(this, 'resizable', _descriptor2, this);

    this._element = element;
    this._events = events;

    this.instruction = container.instruction.elementInstruction;
    this.hasInput = this.instruction.hasInput;
  }

  Label.prototype.attached = function attached() {
    var _this = this;

    this.control = this._element.querySelector('input, textarea');
    this.border = this._element.querySelector('label-border');

    if (this.control && this.control.nodeName === 'TEXTAREA') {
      this.handleResize();
    }

    this._events.subscribe('focus', function (event) {
      if (event.target === _this.control) {
        _this._element.classList.add('focus');
      }
    }, true);

    this._events.subscribe('blur', function (event) {
      if (event.target === _this.control) {
        _this._element.classList.remove('focus');
      }
    }, true);
  };

  Label.prototype.detached = function detached() {
    if (this.control) {
      this.control.events.disposeAll();
    }
  };

  Label.prototype.handleResize = function handleResize() {

    var control = this.control;
    var events = control.events;

    events.subscribe('change', resize, true);
    events.subscribe('cut', delayedResize, true);
    events.subscribe('paste', delayedResize, true);
    events.subscribe('drop', delayedResize, true);
    events.subscribe('keydown', delayedResize, true);

    function resize() {
      control.style.height = 'auto';
      control.style.height = control.scrollHeight + 'px';
    }

    function delayedResize() {
      var id = setTimeout(function () {
        clearTimeout(id);
        resize();
      }, 0);
    }
  };

  return Label;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'resizable', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
})), _class2)) || _class) || _class) || _class);
});

define('resources/elements/page-title',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.PageTitle = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageTitle = exports.PageTitle = (_dec = (0, _aureliaTemplating.customElement)('page-title'), _dec(_class = function PageTitle() {
  _classCallCheck(this, PageTitle);
}) || _class);
});

define('resources/page-view/page-view',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.PageView = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var PageView = exports.PageView = (_dec = (0, _aureliaTemplating.customElement)('page-view'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents), _dec(_class = _dec2(_class = (_class2 = function () {
  function PageView(element, events) {
    _classCallCheck(this, PageView);

    _initDefineProp(this, 'router', _descriptor, this);

    this._element = element;
    this._events = events;
  }

  PageView.prototype.attached = function attached() {};

  return PageView;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'router', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class) || _class);
});

define('resources/portal/aside',['require','exports','module','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.PortalAside = undefined;

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var collapseFrames = [{ flex: '0 0 200px' }, { flex: '0 0 80px' }];

var expandFrames = [{ flex: '0 0 80px' }, { flex: '0 0 200px' }];

var PortalAside = exports.PortalAside = function () {
  function PortalAside() {
    _classCallCheck(this, PortalAside);

    this.element = null;
  }

  PortalAside.prototype.expand = function expand() {
    _appPortal2.default.setConfig('asideExpanded', true);
    this.animate();
  };

  PortalAside.prototype.collapse = function collapse() {
    _appPortal2.default.setConfig('asideExpanded', false);
    this.animate();
  };

  PortalAside.prototype.toggleExpand = function toggleExpand() {
    _appPortal2.default.setConfig('asideExpanded', !_appPortal2.default.config.asideExpanded);
    this.animate();
  };

  PortalAside.prototype.animate = function animate() {
    var expanded = _appPortal2.default.config.asideExpanded;
    var frames = expanded ? collapseFrames : expandFrames;
    if (!this.element) return;

    this.element.classList[expanded ? 'add' : 'remove']('portal-expanded');
    this.element.animate(frames, {
      duration: 200,
      fill: 'forwards',
      easing: 'ease-out'
    });
  };

  return PortalAside;
}();
});

define('resources/portal/element',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal','core/channel','app-portal','server','./aside'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.AppPortal = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

var _channel = require('core/channel');

var _channel2 = _interopRequireDefault(_channel);

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

var _server = require('server');

var _server2 = _interopRequireDefault(_server);

var _aside = require('./aside');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

_appPortal2.default.aside = new _aside.PortalAside();

var AppPortal = exports.AppPortal = (_dec = (0, _aureliaTemplating.customElement)('app-portal'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents), _dec(_class = _dec2(_class = (_class2 = function () {
  function AppPortal(element, events) {
    _classCallCheck(this, AppPortal);

    _initDefineProp(this, 'router', _descriptor, this);

    _initDefineProp(this, 'routerConfig', _descriptor2, this);

    this.portal = _appPortal2.default;

    this.element = element;
    this.events = events;
  }

  AppPortal.prototype.bind = function bind() {
    var _this = this;

    _server2.default.get('/api/statuses').then(function (response) {
      _this.filterOptions = response.content;
      console.log(_this.filterOptions);
    });
  };

  AppPortal.prototype.routerConfigChanged = function routerConfigChanged(config) {
    this.headerNav = this.headerNav || this.element.querySelector('#header-nav');
    this.headerAnchor = this.headerNav.querySelector('a');
    var showBack = config.name !== 'portal';
    this.headerAnchor.classList[showBack ? 'add' : 'remove']('show-back-icon');
  };

  AppPortal.prototype.attached = function attached() {
    _channel2.default.publish('document-overflow', 'hidden');
  };

  AppPortal.prototype.detached = function detached() {
    _channel2.default.publish('document-overflow');
  };

  return AppPortal;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'router', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'routerConfig', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class) || _class);
});

define('resources/project-card/compiler',['require','exports','module','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.default = CardCompiler;

var _aureliaPal = require('aurelia-pal');

function CardCompiler(compiler, resources, element, instruction) {
  var sides = Array.from(element.querySelectorAll('card-front, card-back'));
  if (sides.length) {
    sides.forEach(function (s) {
      return transformChildren(s, 'card', element);
    });
  } else {
    transformChildren(element, 'card');
  }

  return true;
}

function transformChildren(parent, prefix, element) {
  var children = Array.from(parent.children);
  var child = void 0;
  var nodeName = void 0;
  var node = void 0;

  element = element || parent;

  while (child = children.shift()) {
    nodeName = child.localName;
    node = _aureliaPal.DOM.createElement(prefix + '-' + nodeName);
    element.classList.add('has-' + nodeName);
    parent.insertBefore(node, child);
    node.appendChild(child);
  }
}
});

define('resources/project-card/element',['require','exports','module','core/animate'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.default = undefined;

var _animate = require('core/animate');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var timingFunctionExpand = function timingFunctionExpand(t) {
  return --t * t * t * t * t + 1;
};

var timingFunctionCollapse = function timingFunctionCollapse(t) {
  if ((t *= 2) < 1) {
    return 0.5 * t * t * t * t * t;
  }

  return 0.5 * ((t -= 2) * t * t * t * t + 2);
};
var position_ = {
  FRONT: 'front',
  BACK: 'back'
};

var flipFrames_ = [{ transform: (0, _animate.rotateY)(180) }, { transform: (0, _animate.rotateY)(0) }];

var rotateLeftFrames_ = [{ transform: 'rotate(0deg) translate3d(0, 0, 0)' }, { transform: 'rotate(-35deg) translate3d(-200%, 0, 0)' }];

var rotateRightFrames_ = [{ transform: 'rotate(0deg) translate3d(0, 0, 0)' }, { transform: 'rotate(35deg) translate3d(200%, 0, 0)' }];

var rotateOptions_ = {
  duration: 200
};

var flipOptions_ = {
  fill: 'both',
  duration: 200,
  direction: 'alternate-reverse'
};

function calculateFromScreenBounds(n) {
  return 100 * n / window.screen.availWidth;
}

var Card = function () {
  function Card(element, events) {
    var _this = this;

    _classCallCheck(this, Card);

    this.position = position_.FRONT;
    this.animations = {};
    this.frames = {};
    this.backdrop = document.createElement('card-backdrop');

    this.element = element;
    this.events = events;

    this.frames.rotateRight = new _animate.Keyframe(element, rotateRightFrames_, rotateOptions_), this.frames.rotateLeft = new _animate.Keyframe(element, rotateLeftFrames_, rotateOptions_), this.frames.flip = new _animate.Keyframe(element, flipFrames_, flipOptions_), this.animations.rotateRight = new _animate.Animation(this.frames.rotateRight);
    this.animations.rotateLeft = new _animate.Animation(this.frames.rotateLeft);
    this.animations.flip = new _animate.Animation(this.frames.flip);

    window.anim = this.animation;

    events.subscribe('click', function (event) {
      if (_this.onclick) _this.onclick();
      if (event.target.classList.contains('card-rotate-left')) {
        event.preventDefault();
        return _this.rotateOutLeft();
      }
      if (event.target.classList.contains('card-rotate-right')) {
        event.preventDefault();
        return _this.rotateOutRight();
      }
      if (event.target.classList.contains('card-toggle-flip')) {
        event.preventDefault();
        return _this.flip();
      }
    }, true);
  }

  Card.prototype.flip = function flip() {
    var _this2 = this;

    if (this.isAnimating) return;

    if (this._isSmallScreenSize()) {
      this.isAnimating = true;
      this.animations.flip.onfinish = function () {
        return _this2.isAnimating = false;
      };
      return this.animations.flip.run();
    }

    return this.displayCard();
  };

  Card.prototype.rotateOutRight = function rotateOutRight() {
    var _this3 = this;

    if (this.isAnimating) return;
    this.isAnimating = true;
    this.animations.rotateRight.onfinish = function (event) {
      _this3.element.events.publish('card-rotate-right', event);
      _this3.isAnimating = false;
    };
    this.animations.rotateRight.play();
  };

  Card.prototype.rotateOutLeft = function rotateOutLeft() {
    var _this4 = this;

    if (this.isAnimating) return;
    this.isAnimating = true;
    this.animations.rotateLeft.onfinish = function (event) {
      _this4.isAnimating = false;
      _this4.element.events.publish('card-rotate-left', event);
    };
    this.animations.rotateLeft.play();
  };

  Card.prototype.displayCard = function displayCard() {
    var rect = this.element.getBoundingClientRect();
    var size = rect.height > rect.width ? rect.height : rect.width;
    var currentLeft = calculateFromScreenBounds(rect.left);

    this.element.appendChild(this.backdrop);
    this.element;
    this.backdrop.animate([{ transform: 'scale(3) ' }]);
  };

  Card.prototype._isSmallScreenSize = function _isSmallScreenSize() {
    return window.screen.availWidth < 768;
  };

  return Card;
}();

exports.default = Card;
});

define('resources/project-card/motion',['require','exports','module','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.default = CardMotion;

var _aureliaPal = require('aurelia-pal');

var className = {
  DRAGGING: 'dragging',
  TOUCH: 'touch'
};

var sideRotation = {
  FRONT: 0, BACK: -180
};

var rotateY = function rotateY(value) {
  return 'rotatey(' + value + 'deg)';
};

var transformX = function transformX(value) {
  return 'transform3d(' + value + 'px, 0, 0)';
};

function flipCard(element) {
  var nextSide = 'BACK';
  if (element.classList.contains('flipped-back')) {
    nextSide = 'FRONT';
    element.classList.remove('flipped-back');
  } else {
    element.classList.add('flipped-back');
  }

  var nextRotation = sideRotation[nextSide];
  return new Promise(function (resolve) {

    element.events.subscribeOnce('transitionend', function () {
      resolve();
    });

    Object.assign(element.style, {
      '-webkit-transition': 'all 0.5s ease 0s',
      'transition': 'all 0.5s ease 0s',
      'transform': rotateY(nextRotation)
    });
  });
}

function getPoint(event) {
  var point = {};
  if (event.targetTouches) {
    point.x = event.targetTouches[0].clientX;
    point.y = event.targetTouches[0].clientY;
  } else {
    point.x = event.clientX;
    point.y = event.clientY;
  }
  return point;
}

function makeVelocityCalculator(e_init, callback) {
  var point = getPoint(e_init);
  var x = point.x,
      y = point.y,
      t = Date.now();
  return function (e) {
    var next = getPoint(e);
    var new_x = next.x,
        new_y = next.y,
        new_t = Date.now();
    var x_dist = new_x - x,
        y_dist = new_y - y,
        interval = new_t - t;
    var velocity = Math.sqrt(x_dist * x_dist + y_dist * y_dist) / interval;
    callback(velocity);

    x = new_x;
    y = new_y;
    t = new_t;
  };
}

function CardMotion(viewModel) {
  var _this = this;

  var _events = viewModel._events;
  var _element = viewModel._element;

  Object.defineProperty(_element, 'cardMotion', {
    get: function get() {
      return _this;
    }
  });

  var touchMoveEvent = void 0;
  var mouseMoveEvent = void 0;
  var nextpoint = {};
  var nextX = {};
  var currentX = 0;
  var canceled = false;
  var moved = false;
  var initialPosition = {};
  var velocity = 0;
  var lastVelocity = 0;
  var currentSide = 'FRONT';
  var nextRotate = 0;
  var currentRotate = 0;
  var calculate = void 0;

  var onend = function onend(event) {
    event.preventDefault();
    if (!moved) {
      console.log(event);
      return flipCard(_element, currentSide).then(function () {
        currentSide = currentSide === 'FRONT' ? 'BACK' : 'FRONT';
      });
    }

    _element.currentAnim && _element.currentAnim.cancel();
    _element.currentAnim = null;

    moved = false;
    touchMoveEvent && touchMoveEvent.dispose();
    mouseMoveEvent && mouseMoveEvent.dispose();
    currentX = nextX;
    currentRotate = nextRotate;
    var test = currentX < 0 ? currentX * -1 : currentX;

    if (test > _element.clientWidth / 3 * 2) {
      currentX = currentX < 0 ? _element.clientWidth * -2 : _element.clientWidth * 2;
      currentRotate = currentX < 0 ? -45 : 45;
    } else {
      currentX = 0;
      currentRotate = 0;
    }

    window.requestAnimationFrame(function () {
      _element.style.transition = 'all 0.5s ease-out 0s';
      if (currentX !== 0) {
        _element.style.transition = 'all ' + velocity + 's linear 0s';
      }
      _element.events.subscribeOnce('transitionend', function () {
        _element.classList.remove('active');
        if (currentX !== 0) {
          viewModel.onswipeOut(currentX);
        }
      });
      _element.style.transform = 'translate3d(' + currentX + 'px, 0, 0) rotate(' + currentRotate + 'deg)';
      velocity = 0;
      lastVelocity = 0;
    });
  };

  var onmove = function onmove(event) {
    event.preventDefault();

    if (moved === false) {
      moved = true;
      _element.style.transition = 'initial';
      _element.classList.add('active');
      return initialPosition = getPoint(event);
    }

    nextpoint = getPoint(event);
    calculate(event);

    window.requestAnimationFrame(function () {
      _element.style.transition = 'initial';
      nextX = currentX - (initialPosition.x - nextpoint.x);
      var r = nextX / 45;

      nextRotate = nextX < 0 ? nextRotate - 1 : nextRotate + 1;
      _element.style.transform = 'translate3d(' + nextX + 'px, 0, 0) rotate(' + r + 'deg)';
    });
  };

  this.onTouchStart = function (e) {
    canceled = false;
    moved = false;

    e.preventDefault();

    calculate = makeVelocityCalculator(e, function (v) {
      velocity = lastVelocity || v;
      lastVelocity = v;
    });

    _aureliaPal.DOM.events.subscribeOnce('touchend', function (event) {
      onend(event);
    });

    _aureliaPal.DOM.events.subscribeOnce('mouseup', function (event) {
      onend(event);
    });

    _aureliaPal.DOM.events.subscribeOnce('touchcancel', function (event) {
      onend(event);
    });

    touchMoveEvent = _aureliaPal.DOM.events.subscribe('touchmove', function (event) {
      onmove(event);
    });

    mouseMoveEvent = _aureliaPal.DOM.events.subscribe('mousemove', function (event) {
      if (document.documentElement.classList.contains('platform-ios') || document.documentElement.classList.contains('platform-md')) {
        onmove(event);
      }
    });
  };

  this.dispose = function () {
    _element.events.disposeAll();
  };
}
});

define('resources/project-card/project-card-list',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.ProjectCardList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var ProjectCardList = exports.ProjectCardList = (_dec = (0, _aureliaTemplating.customElement)('project-card-list'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents), _dec(_class = _dec2(_class = (_class2 = function () {
  function ProjectCardList(element, events) {
    _classCallCheck(this, ProjectCardList);

    _initDefineProp(this, 'value', _descriptor, this);

    _initDefineProp(this, 'swipeLeft', _descriptor2, this);

    _initDefineProp(this, 'swipeRight', _descriptor3, this);

    this._element = element;
    this._events = events;
  }

  ProjectCardList.prototype.bind = function bind(context) {
    var _this = this;

    var ontouch = function ontouch(event) {
      if (event.target.nodeName === 'BUTTON') {
        return;
      };

      var target = event.target;
      while (target.nodeName !== 'PROJECT-CARD' && target.nodeName !== 'PROJECT-CARD-LIST') {
        target = target.parentNode;
      }

      if (target.nodeName === 'PROJECT-CARD' && 'cardMotion' in target) {
        target.cardMotion.onTouchStart(event);
      }
    };

    this._events.subscribe('swipe-left-end', function (event) {
      if (_this.swipeLeft) {
        _this.swipeLeft.call(context, event.detail.model);
      }
    });

    this._events.subscribe('swipe-right-end', function (event) {
      if (_this.swipeRight) {
        _this.swipeRight.call(context, event.detail.model);
      }
    });
  };

  _createClass(ProjectCardList, [{
    key: 'clientHeight',
    get: function get() {
      this._element.offsetParent && this._element.offsetParent.clientHeight - 200;
    }
  }]);

  return ProjectCardList;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'swipeLeft', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'swipeRight', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class);
});

define('resources/project-card/project-card',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal','./compiler','./motion','./element','gsap'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.ProjectCard = undefined;

var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

var _compiler = require('./compiler');

var _compiler2 = _interopRequireDefault(_compiler);

var _motion = require('./motion');

var _motion2 = _interopRequireDefault(_motion);

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

require('gsap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var ProjectCard = exports.ProjectCard = (_dec = (0, _aureliaTemplating.customElement)('project-card'), _dec2 = (0, _aureliaTemplating.processContent)(_compiler2.default), _dec3 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
  function ProjectCard(element, events) {
    _classCallCheck(this, ProjectCard);

    _initDefineProp(this, 'model', _descriptor, this);

    _initDefineProp(this, 'flip', _descriptor2, this);

    this._element = element;
    this._events = events;
  }

  ProjectCard.prototype.onswipeOut = function onswipeOut(position) {
    position = position > 0 ? 'right' : 'left';
    this._element.events.publish('swipe-' + position + '-end', this);
  };

  ProjectCard.prototype.attached = function attached() {
    this._events.subscribe('click', function () {});

    this._events.subscribe('mouseover', function () {});
  };

  ProjectCard.prototype.detached = function detached() {
    if (this.cardMotion) {}
  };

  ProjectCard.prototype.flipChanged = function flipChanged(value) {
    if (value && !this.cardMotion) {}
  };

  ProjectCard.prototype.collapse = function collapse() {
    if (!this.isExpanded) {
      return this.expand();
    }

    this.isExpanded = false;

    var backdrop = this.backdrop;
    var node = this._element;
    var parent = node.parentNode;

    TweenMax.to(parent, 0.4, {
      maxHeight: parent.minHeight + 'px',
      ease: Expo.easeOut
    });

    TweenMax.to(node, 0.3, {
      flexBasis: '50%',
      alignSelf: 'flex-start',
      ease: Expo.easeOut
    });

    TweenMax.to(backdrop, 0.4, {
      transform: 'scale(0)',
      ease: Expo.easeOut
    });
  };

  ProjectCard.prototype.expand = function expand() {
    if (this.isExpanded) {
      return this.collapse();
    }

    this.isExpanded = true;

    var node = this._element;
    var parent = node.parentNode;
    var base = parent.parentNode;
    var scrollLeft = parent.scrollLeft;
    var maxRight = scrollLeft + base.clientWidth;

    parent.minHeight = parent.clientHeight;

    TweenMax.to(parent, 0.3, {
      maxHeight: '100%',
      ease: Expo.easeOut,
      scrollLeft: node.offsetLeft - 30 + 'px'
    });

    TweenMax.to(node, 0.5, {
      flexBasis: '95%',
      alignSelf: 'center',
      ease: Expo.easeOut
    });

    TweenMax.to(this.backdrop, 1, {
      transform: 'scale(7)',
      ease: Expo.easeOut
    });
  };

  return ProjectCard;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'model', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'flip', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
})), _class2)) || _class) || _class) || _class);
});

"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Worker = function () {
  function Worker() {
    _classCallCheck(this, Worker);
  }

  Worker.prototype.onfetch = function onfetch(event) {
    caches.match(request).then(function (response) {
      if (response) return response;
    });
  };

  return Worker;
}();
define("resources/project-card/worker", [],function(){});

define('resources/select/element',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UISelect = undefined;

var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var twoWay = { defaultBindingMode: 2 };

var UISelect = exports.UISelect = (_dec = (0, _aureliaTemplating.customElement)('ui-select'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents), _dec3 = (0, _aureliaTemplating.bindable)(twoWay), _dec(_class = _dec2(_class = (_class2 = function () {
  function UISelect(element, events) {
    _classCallCheck(this, UISelect);

    _initDefineProp(this, 'value', _descriptor, this);

    _initDefineProp(this, 'multiple', _descriptor2, this);

    _initDefineProp(this, 'options', _descriptor3, this);

    _initDefineProp(this, 'placeholder', _descriptor4, this);

    this._element = element;
    this._events = events;
  }

  UISelect.prototype.bind = function bind() {
    console.log(this);
  };

  UISelect.prototype.attached = function attached() {
    this.select2 = $(this._element.querySelector('select')).select2({
      placeholder: this.placeholder,
      allowClear: true,
      tags: true
    });
  };

  return UISelect;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'multiple', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'options', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class) || _class);
});

define('resources/status-filter/element',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.StatusFilter = undefined;

var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var twoWay = { defaultBindingMode: 2 };

var StatusFilter = exports.StatusFilter = (_dec = (0, _aureliaTemplating.customElement)('status-filter'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents), _dec3 = (0, _aureliaTemplating.bindable)(twoWay), _dec(_class = _dec2(_class = (_class2 = function () {
  function StatusFilter(element, events) {
    _classCallCheck(this, StatusFilter);

    _initDefineProp(this, 'value', _descriptor, this);

    _initDefineProp(this, 'options', _descriptor2, this);

    this.open = false;

    this.element = element;
    this.events = events;
  }

  StatusFilter.prototype.attached = function attached() {};

  return StatusFilter;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'options', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class) || _class);
});

define('resources/switch/compile',['require','exports','module'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.compileSwitch = compileSwitch;
function compileSwitch(compiler, resources, element, instruction) {
  var attr = void 0;
  var i = 0;

  element.switch = document.createElement('INPUT');
  element.switch.type = 'checkbox';

  while (attr = element.attributes.item(i++)) {
    element.switch.setAttribute(attr.nodeName, attr.nodeValue);
    element.removeAttribute(attr.nodeName);
  }

  element.appendChild(element.switch);
  return true;
}
});

define('resources/switch/element',['require','exports','module','aurelia-dependency-injection','aurelia-templating','./compile'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.SwitchElement = undefined;

var _dec, _dec2, _dec3, _dec4, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _compile = require('./compile');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SwitchElement = exports.SwitchElement = (_dec = (0, _aureliaTemplating.customElement)('switch'), _dec2 = (0, _aureliaTemplating.noView)(), _dec3 = (0, _aureliaTemplating.processContent)(_compile.compileSwitch), _dec4 = (0, _aureliaDependencyInjection.inject)(Element, _aureliaTemplating.ElementEvents), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function () {
  function SwitchElement(element, events) {
    _classCallCheck(this, SwitchElement);

    this.element = element;
    this.events = events;
  }

  SwitchElement.prototype.attached = function attached() {};

  return SwitchElement;
}()) || _class) || _class) || _class) || _class);
});

define('resources/tab-bar/element',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-pal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.TabBar = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPal = require('aurelia-pal');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var TabBar = exports.TabBar = (_dec = (0, _aureliaTemplating.customElement)('tab-bar'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents), _dec(_class = _dec2(_class = (_class2 = function () {
  function TabBar(element, events) {
    _classCallCheck(this, TabBar);

    _initDefineProp(this, 'router', _descriptor, this);

    this._element = element;
    this._events = events;
  }

  TabBar.prototype.attached = function attached() {};

  return TabBar;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'router', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class) || _class);
});

define('resources/tag-input/element',['require','exports','module','aurelia-dependency-injection','aurelia-templating','aurelia-binding','aurelia-pal','core/es'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.SearchNavigation = exports.TagInput = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _desc, _value, _class, _descriptor, _dec2, _dec3, _dec4, _class3, _desc2, _value2, _class4, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaBinding = require('aurelia-binding');

var _aureliaPal = require('aurelia-pal');

var _es = require('core/es');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var twoWay = { defaultBindingMode: 2 };
var keyCodes = {};
keyCodes.DOWN = 40;
keyCodes.UP = 38;
keyCodes.RIGHT = 39;
keyCodes.LEFT = 37;
keyCodes.DELETE = 8;
keyCodes.TAB = 9;

var Option = (_dec = (0, _aureliaBinding.computedFrom)('_keyProperty'), (_class = function () {
  function Option(model, list, viewModel) {
    _classCallCheck(this, Option);

    _initDefineProp(this, 'element', _descriptor, this);

    this._keyProperty = '';

    this.list = list;
    this.model = model;
    this.viewModel = viewModel;
  }

  Option.prototype.remove = function remove() {
    var index = this.list.indexOf(this.model);
    if (~index) {
      this.list.splice(index, 1);
    }
  };

  Option.prototype.focus = function focus() {
    this.element.focus();
  };

  Option.prototype.elementChanged = function elementChanged(node) {
    if (!node) return;
    node.tabIndex = 0;
    node.style.pointerEvents = 'auto';
    node.tagOption = this;
  };

  _createClass(Option, [{
    key: 'display',
    get: function get() {
      return this.viewModel.display ? this.model[this.viewModel.display] : this.model.value;
    }
  }]);

  return Option;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'element', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class.prototype, 'display', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'display'), _class.prototype)), _class));
var TagInput = exports.TagInput = (_dec2 = (0, _aureliaTemplating.customElement)('tag-input'), _dec3 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.ElementEvents), _dec4 = (0, _aureliaTemplating.bindable)(twoWay), _dec2(_class3 = _dec3(_class3 = (_class4 = function () {
  function TagInput(element, events) {
    _classCallCheck(this, TagInput);

    _initDefineProp(this, 'selected', _descriptor2, this);

    _initDefineProp(this, 'options', _descriptor3, this);

    _initDefineProp(this, 'display', _descriptor4, this);

    _initDefineProp(this, 'label', _descriptor5, this);

    this.searchValue = '';

    this._element = element;
    this._events = events;
    this.searchNavigation = new SearchNavigation(this);
  }

  TagInput.prototype._mapOptions = function _mapOptions(options) {
    var _this = this;

    options.forEach(function (o) {
      o.tagOption = new Option(o, options, _this);
    });
  };

  TagInput.prototype.attached = function attached() {
    this.searchNavigation.bind(this.control, this.list);
  };

  TagInput.prototype.selectedChanged = function selectedChanged(value) {
    if (!value) {
      this.selected = [];
    }
  };

  TagInput.prototype.selectOption = function selectOption() {
    var _this2 = this;

    var option = this.options.find(function (o) {
      return o[_this2.display] === _this2.searchValue;
    });
    if (option) {
      option.tagOption = option.tagOption || new Option(option, this.selected, this);
      option.tagOption.list = this.selected;
      this.selected.push(option);
      this.searchValue = '';
      this.control.focus();
    }
  };

  TagInput.prototype.optionsChanged = function optionsChanged() {
    if (this.options) {
      this._mapOptions(this.options);
    }
  };

  return TagInput;
}(), (_descriptor2 = _applyDecoratedDescriptor(_class4.prototype, 'selected', [_dec4], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class4.prototype, 'options', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class4.prototype, 'display', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class4.prototype, 'label', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class4)) || _class3) || _class3);

var SearchNavigation = exports.SearchNavigation = function () {
  function SearchNavigation(viewModel) {
    _classCallCheck(this, SearchNavigation);

    this.viewModel = viewModel;
  }

  SearchNavigation.prototype.bind = function bind(control, list) {
    var _this3 = this;

    this.list = list;
    this.control = control;
    var events = this.viewModel._events;

    var viewModel = this.viewModel;
    events.subscribe('blur', function (event) {
      if (event.target === control) {
        event.preventDefault();
        viewModel.selectOption();
      }
    }, true);

    events.subscribe('keydown', function (event) {
      var code = event.keyCode;
      var keyCodeProps = {
        top: code === keyCodes.TOP,
        left: code === keyCodes.LEFT,
        right: code === keyCodes.RIGHT,
        bottom: code === keyCodes.BOTTOM,
        delete: code === keyCodes.DELETE,
        tab: code === keyCodes.TAB
      };
      if (document.activeElement === control) {
        controlListener.call(_this3, event, event.target, keyCodeProps);
      } else if (list.contains(event.target)) {
        listListener.call(_this3, event, event.target, keyCodeProps);
      }
    }, true);

    function listListener() {
      var event = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var node = arguments[1];
      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var isItem = event.target.nodeName === 'LI';
      var isForm = event.target.nextElementSibling && event.target.nextElementSibling.nodeName === 'FORM';
      console.log(event);
      if (isItem && options.left) {
        var previousSibling = event.target.previousElementSibling || control;
        event.preventDefault();
        if (previousSibling) {
          previousSibling.focus();
        }
      } else if ((isItem || isForm) && options.right) {
        var nextSibling = isForm ? control : event.target.nextElementSibling ? event.target.nextElementSibling : control;
        event.preventDefault();
        if (nextSibling) {
          nextSibling.focus();
        }
      } else if (isItem && options.delete) {
        event.preventDefault();
        var _previousSibling = event.target.previousElementSibling;
        var tagOption = event.target.tagOption;

        tagOption.remove();

        if (_previousSibling) {
          _previousSibling.focus();
        } else {
          control.focus();
        }
      }
    }

    function controlListener() {
      var event = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var node = arguments[1];
      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      if (options.delete && !viewModel.searchValue) {
        event.preventDefault();
        var model = viewModel.selected[viewModel.selected.length - 1];
        if (model) {
          var previousSibling = model.tagOption.element.previousElementSibling;
          model.tagOption.remove();
          viewModel.searchValue = model.tagOption.display;
          control.focus();
        }
      } else if (options.left) {
        event.preventDefault();
        var cursorPosition = _aureliaPal.DOM.getCaretPosition(control);

        if (cursorPosition === 0) {
          var _model = viewModel.selected[viewModel.selected.length - 1];
          if (_model) {
            _model.tagOption.focus();
          }
        }
      }
    }
  };

  return SearchNavigation;
}();
});

define('pages/users/dreamer/groups',['require','exports','module','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserGroups = undefined;

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserGroups = exports.UserGroups = function () {
  function UserGroups() {
    _classCallCheck(this, UserGroups);
  }

  UserGroups.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  return UserGroups;
}();
});

define('pages/users/dreamer/home',['require','exports','module','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.PortalHome = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PortalHome = exports.PortalHome = function () {
  function PortalHome() {
    _classCallCheck(this, PortalHome);
  }

  PortalHome.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  PortalHome.prototype.startAnimations = function startAnimations(header) {
    if (!header) return;
  };

  _createClass(PortalHome, [{
    key: 'header',
    set: function set(value) {
      this._header = value;
      this.startAnimations(value);
    }
  }]);

  return PortalHome;
}();
});

define('pages/users/dreamer/index',['require','exports','module','server/users','aurelia-dependency-injection','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserPage = undefined;

var _dec, _class;

var _users = require('server/users');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserPage = exports.UserPage = (_dec = (0, _aureliaDependencyInjection.inject)(_users.Users), _dec(_class = function () {
  function UserPage(users) {
    _classCallCheck(this, UserPage);

    this.context = {};

    this.users = users;
  }

  UserPage.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  UserPage.prototype.configureRouter = function configureRouter(config, router) {
    var context = this.context;
    var scope = {
      projects: function projects(_projects) {
        return _projects.filter(function (p) {
          return p.user_id === Auth.user.id;
        });
      }
    };

    config.mapRoute({
      route: ['', 'profile'],
      moduleId: './profile',
      name: 'profile',
      title: 'Profile',
      nav: true,
      settings: { scope: scope, context: context }
    });
    config.mapRoute({
      route: 'projects',
      moduleId: 'pages/project/list',
      name: 'projects',
      title: 'Projects',
      nav: true,
      settings: { scope: scope, context: context }
    });
    config.mapRoute({
      route: ['settings'],
      moduleId: './settings',
      name: 'settings',
      title: 'Settings',
      nav: true,
      settings: { scope: scope, context: context }
    });
    config.mapRoute({
      route: 'projects/create',
      moduleId: 'pages/project/create',
      name: 'project-create',
      title: 'Create Projects',
      nav: false,
      settings: { scope: scope, context: context }
    });
    config.mapRoute({
      route: 'projects/:id',
      moduleId: 'pages/project/overview',
      name: 'project',
      title: 'Project',
      nav: false,
      settings: { scope: scope, context: context }
    });

    this.router = router;
  };

  UserPage.prototype.activate = function activate(params) {
    if (this.users.current) {
      this.context.user = this.users.current;
    }
  };

  return UserPage;
}()) || _class);
});

define('pages/users/dreamer/profile',['require','exports','module','aurelia-framework','app-state','aurelia-binding','services/user','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserProfile = undefined;

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');

var _appState = require('app-state');

var _appState2 = _interopRequireDefault(_appState);

var _aureliaBinding = require('aurelia-binding');

var _user = require('services/user');

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserProfile = exports.UserProfile = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function () {
  function UserProfile(user) {
    _classCallCheck(this, UserProfile);

    this.heading = 'User Profile';

    this.user = user;
  }

  UserProfile.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  UserProfile.prototype.activate = function activate() {
    console.log(this.user);
  };

  return UserProfile;
}()) || _class);
});

define('pages/users/dreamer/reviews',['require','exports','module','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserReviews = undefined;

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserReviews = exports.UserReviews = function () {
  function UserReviews() {
    _classCallCheck(this, UserReviews);
  }

  UserReviews.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  return UserReviews;
}();
});

define('pages/users/dreamer/settings',['require','exports','module','app-state','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UpdateUser = undefined;

var _appState = require('app-state');

var _appState2 = _interopRequireDefault(_appState);

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UpdateUser = exports.UpdateUser = function () {
  function UpdateUser() {
    _classCallCheck(this, UpdateUser);

    this.state = _appState2.default;
  }

  UpdateUser.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  UpdateUser.prototype.activate = function activate(params, config) {
    var _this = this;

    _appState2.default.authorize(function (authorized) {
      _this.authorized = _appState2.default.authorized;
    });
  };

  UpdateUser.prototype.deactivate = function deactivate() {};

  UpdateUser.prototype.enablePersonalTitle = function enablePersonalTitle(config) {};

  return UpdateUser;
}();
});

define('pages/users/investor/groups',['require','exports','module','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserGroups = undefined;

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserGroups = exports.UserGroups = function () {
  function UserGroups() {
    _classCallCheck(this, UserGroups);
  }

  UserGroups.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  return UserGroups;
}();
});

define('pages/users/investor/home',['require','exports','module','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.PortalHome = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PortalHome = exports.PortalHome = function () {
  function PortalHome() {
    _classCallCheck(this, PortalHome);
  }

  PortalHome.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  PortalHome.prototype.startAnimations = function startAnimations(header) {
    if (!header) return;
  };

  _createClass(PortalHome, [{
    key: 'header',
    set: function set(value) {
      this._header = value;
      this.startAnimations(value);
    }
  }]);

  return PortalHome;
}();
});

define('pages/users/investor/index',['require','exports','module','server/users','aurelia-dependency-injection','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserPage = undefined;

var _dec, _class;

var _users = require('server/users');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserPage = exports.UserPage = (_dec = (0, _aureliaDependencyInjection.inject)(_users.Users), _dec(_class = function () {
  function UserPage(users) {
    _classCallCheck(this, UserPage);

    this.context = {};

    this.users = users;
  }

  UserPage.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  UserPage.prototype.configureRouter = function configureRouter(config, router) {
    var context = this.context;
    var scope = {
      projects: function projects(_projects) {
        return _projects.filter(function (p) {
          return p.user_id === Auth.user.id;
        });
      }
    };

    config.mapRoute({
      route: ['', 'profile'],
      moduleId: './profile',
      name: 'profile',
      title: 'Profile',
      nav: true,
      settings: { scope: scope, context: context }
    });
    config.mapRoute({
      route: 'projects',
      moduleId: 'pages/project/list',
      name: 'projects',
      title: 'Projects',
      nav: true,
      settings: { scope: scope, context: context }
    });
    config.mapRoute({
      route: ['settings'],
      moduleId: './settings',
      name: 'settings',
      title: 'Settings',
      nav: true,
      settings: { scope: scope, context: context }
    });
    config.mapRoute({
      route: 'projects/create',
      moduleId: 'pages/project/create',
      name: 'project-create',
      title: 'Create Projects',
      nav: false,
      settings: { scope: scope, context: context }
    });
    config.mapRoute({
      route: 'projects/:id',
      moduleId: 'pages/project/overview',
      name: 'project',
      title: 'Project',
      nav: false,
      settings: { scope: scope, context: context }
    });

    this.router = router;
  };

  UserPage.prototype.activate = function activate(params) {
    if (this.users.current) {
      this.context.user = this.users.current;
    }
  };

  return UserPage;
}()) || _class);
});

define('pages/users/investor/profile',['require','exports','module','aurelia-framework','app-state','aurelia-binding','services/user','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserProfile = undefined;

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');

var _appState = require('app-state');

var _appState2 = _interopRequireDefault(_appState);

var _aureliaBinding = require('aurelia-binding');

var _user = require('services/user');

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserProfile = exports.UserProfile = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function () {
  function UserProfile(user) {
    _classCallCheck(this, UserProfile);

    this.heading = 'User Profile';

    this.user = user;
  }

  UserProfile.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  UserProfile.prototype.activate = function activate() {
    console.log(this.user);
  };

  return UserProfile;
}()) || _class);
});

define('pages/users/investor/project-search',['require','exports','module','server'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.SearchFilterValueConverter = exports.ProjectSearch = undefined;

var _server = require('server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectSearch = exports.ProjectSearch = function () {
  function ProjectSearch() {
    _classCallCheck(this, ProjectSearch);

    this.searchValue = '';
  }

  ProjectSearch.prototype.activate = function activate() {
    var _this = this;

    return _server2.default.get('/api/projects').then(function (response) {
      _this.projects = response.content.map(function (model) {
        var href = '#/investor/projects/' + model._id;
        return { href: href, model: model };
      });
    });
  };

  return ProjectSearch;
}();

var RegExpCache = {};

var SearchFilterValueConverter = exports.SearchFilterValueConverter = function () {
  function SearchFilterValueConverter() {
    _classCallCheck(this, SearchFilterValueConverter);
  }

  SearchFilterValueConverter.prototype.toView = function toView(list, value) {
    var regexp = RegExpCache[value] = RegExpCache[value] || new RegExp(value, 'g');
    return list.filter(function (project) {
      var pass = false;
      pass = regexp.test(project.model.title);
      return pass;
    });
  };

  return SearchFilterValueConverter;
}();
});

define('pages/users/investor/reviews',['require','exports','module','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserReviews = undefined;

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserReviews = exports.UserReviews = function () {
  function UserReviews() {
    _classCallCheck(this, UserReviews);
  }

  UserReviews.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  return UserReviews;
}();
});

define('pages/users/investor/settings',['require','exports','module','app-state','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UpdateUser = undefined;

var _appState = require('app-state');

var _appState2 = _interopRequireDefault(_appState);

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UpdateUser = exports.UpdateUser = function () {
  function UpdateUser() {
    _classCallCheck(this, UpdateUser);

    this.state = _appState2.default;
  }

  UpdateUser.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  UpdateUser.prototype.activate = function activate(params, config) {
    var _this = this;

    _appState2.default.authorize(function (authorized) {
      _this.authorized = _appState2.default.authorized;
    });
  };

  UpdateUser.prototype.deactivate = function deactivate() {};

  UpdateUser.prototype.enablePersonalTitle = function enablePersonalTitle(config) {};

  return UpdateUser;
}();
});

define('pages/users/project/create',['require','exports','module','aurelia-dependency-injection','server/project','app-portal','services/user'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.ProjectCreate = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _project = require('server/project');

var _project2 = _interopRequireDefault(_project);

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

var _user = require('services/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectCreate = exports.ProjectCreate = (_dec = (0, _aureliaDependencyInjection.inject)(_user.User), _dec(_class = function () {
  function ProjectCreate(user) {
    _classCallCheck(this, ProjectCreate);

    this.project = {};

    this.user = user;
  }

  ProjectCreate.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  ProjectCreate.prototype.submit = function submit() {
    var title = this.project.title;
    this.user.createProject(this.project);
  };

  ProjectCreate.prototype.setStatus = function setStatus(event, project) {
    var value = event.target.value;
  };

  return ProjectCreate;
}()) || _class);
});

define('pages/users/project/list',['require','exports','module','aurelia-dependency-injection','app-state','services/user','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.ProjectList = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _appState = require('app-state');

var _appState2 = _interopRequireDefault(_appState);

var _user = require('services/user');

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectList = exports.ProjectList = (_dec = (0, _aureliaDependencyInjection.inject)(_user.User), _dec(_class = function () {
  function ProjectList(user) {
    _classCallCheck(this, ProjectList);

    this.projects = [];
    this.portal = _appPortal2.default;
    this.state = _appState2.default;

    this.user = user;
  }

  ProjectList.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  ProjectList.prototype.activate = function activate(params, config, navModel) {
    var _this = this;

    this.router = navModel.router;
    _appPortal2.default.navAction = {
      title: 'Add',
      method: function method() {
        return _this.createProject();
      }
    };
  };

  ProjectList.prototype.selectProject = function selectProject(project) {
    project.select();
    this.router.navigate('#/dreamer/project/overview');
  };

  ProjectList.prototype.setStatus = function setStatus(event, project) {
    var value = event.target.value;
  };

  ProjectList.prototype.createProject = function createProject() {
    this.router.navigate('#/dreamer/projects/create');
  };

  ProjectList.prototype.deactivate = function deactivate() {
    _appPortal2.default.navAction = null;
  };

  return ProjectList;
}()) || _class);
});

define('pages/users/project/members',['require','exports','module','aurelia-dependency-injection','aurelia-router','services/user','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.ProjectMembers = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaRouter = require('aurelia-router');

var _user = require('services/user');

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectMembers = exports.ProjectMembers = (_dec = (0, _aureliaDependencyInjection.inject)(_user.User), _dec(_class = function () {
  function ProjectMembers(user) {
    _classCallCheck(this, ProjectMembers);

    this.user = user;
  }

  ProjectMembers.prototype.canActivate = function canActivate(params, config) {
    var _this = this;

    if (!this.user.projects.selectedProject) {
      return new _aureliaRouter.Redirect('#/portal/projects');
    }

    this.project = this.user.projects.selectedProject;
    this.projectMembers = this.project.members || [];
    _appPortal2.default.setConfig('portalContext', 'project');

    _appPortal2.default.navAction = {
      title: 'Invite',
      method: function method() {
        return _this.inviteMember();
      }
    };
  };

  ProjectMembers.prototype.canDeactivate = function canDeactivate() {
    _appPortal2.default.navAction = null;
  };

  ProjectMembers.prototype.inviteMember = function inviteMember() {};

  ProjectMembers.prototype.setStatus = function setStatus(event, project) {
    var value = event.target.value;
  };

  return ProjectMembers;
}()) || _class);
});

define('pages/users/project/overview',['require','exports','module','app-portal','aurelia-dependency-injection','aurelia-router','services/user'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.ProjectOverView = undefined;

var _dec, _class;

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaRouter = require('aurelia-router');

var _user = require('services/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectOverView = exports.ProjectOverView = (_dec = (0, _aureliaDependencyInjection.inject)(_user.User), _dec(_class = function () {
  function ProjectOverView(user) {
    _classCallCheck(this, ProjectOverView);

    this.user = user;
  }

  ProjectOverView.prototype.canActivate = function canActivate(params, config, navModel) {
    this.router = navModel.router;

    if (!this.user.projects.selectedProject) {
      return new _aureliaRouter.Redirect('#/portal/projects');
    }

    this.project = this.user.projects.selectedProject;

    _appPortal2.default.setConfig('portalContext', 'project');
  };

  ProjectOverView.prototype.canDeactivate = function canDeactivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  ProjectOverView.prototype.setStatus = function setStatus(event, project) {
    var value = event.target.value;
  };

  return ProjectOverView;
}()) || _class);
});

define('pages/users/project/profile',['require','exports','module','aurelia-dependency-injection','aurelia-router','services/user','app-portal','services/project'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.ProjectProfile = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaRouter = require('aurelia-router');

var _user = require('services/user');

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

var _project = require('services/project');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectProfile = exports.ProjectProfile = (_dec = (0, _aureliaDependencyInjection.inject)(_user.User, _project.Project), _dec(_class = function () {
  function ProjectProfile(user, project) {
    _classCallCheck(this, ProjectProfile);

    this.user = user;
    this.project = project;
  }

  ProjectProfile.prototype.canActivate = function canActivate(params, config) {
    var _this = this;

    if (!this.user.projects.selectedProject) {
      return new _aureliaRouter.Redirect('#/portal/projects');
    }

    this.projectModel = this.user.projects.selectedProject;

    this.project.setModel(this.projectModel);

    _appPortal2.default.setConfig('portalContext', 'project');

    _appPortal2.default.navAction = {
      title: 'Add Field',
      method: function method() {
        return _this.project.addField();
      }
    };
  };

  ProjectProfile.prototype.canDeactivate = function canDeactivate() {
    _appPortal2.default.navAction = null;
  };

  ProjectProfile.prototype.setStatus = function setStatus(event, project) {
    var value = event.target.value;
  };

  ProjectProfile.prototype.handleField = function handleField(field) {
    var project = this.project;
    var contentRef = {};

    field.hasContent = 'content' in field;

    Object.defineProperty(field, 'contentRef', {
      get: function get() {
        return contentRef;
      },
      set: function set(node) {
        contentRef = node;

        node.onchange = function () {
          project.update();
        };

        node.onblur = function () {
          if (!node.value) {
            field.hasContent = false;
          }
        };
      }
    });

    field.addContent = function () {
      field.hasContent = true;
      field.content = '';
      var id = setTimeout(function () {
        clearTimeout(id);
        field.contentRef.focus();
      }, 0);
    };

    field.removePoint = function (point) {
      var index = field.points.indexOf(point);
      if (~index) {
        field.points.splice(index, 1);
      }
      project.update();
    };

    field.addPoint = function () {
      field.points.push(createPoint());
      project.update();
    };

    function createPoint() {
      var point = { text: '' };
      var node = void 0;
      Object.defineProperty(point, 'nodeRef', {
        set: function set(nodeRef) {
          node = nodeRef;
          node.onchange = function () {
            project.update();
          };
          node.onblur = function () {
            if (!node.value) {
              field.removePoint(point);
            }
          };
          var id = setTimeout(function () {
            clearTimeout(id);
            node.focus();
          }, 0);
        },
        get: function get() {
          return node;
        }
      });
      return point;
    }
  };

  return ProjectProfile;
}()) || _class);
});

define('pages/users/user/groups',['require','exports','module','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserGroups = undefined;

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserGroups = exports.UserGroups = function () {
  function UserGroups() {
    _classCallCheck(this, UserGroups);
  }

  UserGroups.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  return UserGroups;
}();
});

define('pages/users/user/home',['require','exports','module','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.PortalHome = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PortalHome = exports.PortalHome = function () {
  function PortalHome() {
    _classCallCheck(this, PortalHome);
  }

  PortalHome.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  PortalHome.prototype.startAnimations = function startAnimations(header) {
    if (!header) return;
  };

  _createClass(PortalHome, [{
    key: 'header',
    set: function set(value) {
      this._header = value;
      this.startAnimations(value);
    }
  }]);

  return PortalHome;
}();
});

define('pages/users/user/index',['require','exports','module','server/users','aurelia-dependency-injection','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserPage = undefined;

var _dec, _class;

var _users = require('server/users');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserPage = exports.UserPage = (_dec = (0, _aureliaDependencyInjection.inject)(_users.Users), _dec(_class = function () {
  function UserPage(users) {
    _classCallCheck(this, UserPage);

    this.context = {};

    this.users = users;
  }

  UserPage.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  UserPage.prototype.configureRouter = function configureRouter(config, router) {
    var context = this.context;
    var scope = {
      projects: function projects(_projects) {
        return _projects.filter(function (p) {
          return p.user_id === Auth.user.id;
        });
      }
    };

    config.mapRoute({
      route: ['', 'profile'],
      moduleId: './profile',
      name: 'profile',
      title: 'Profile',
      nav: true,
      settings: { scope: scope, context: context }
    });
    config.mapRoute({
      route: 'projects',
      moduleId: 'pages/project/list',
      name: 'projects',
      title: 'Projects',
      nav: true,
      settings: { scope: scope, context: context }
    });
    config.mapRoute({
      route: ['settings'],
      moduleId: './settings',
      name: 'settings',
      title: 'Settings',
      nav: true,
      settings: { scope: scope, context: context }
    });
    config.mapRoute({
      route: 'projects/create',
      moduleId: 'pages/project/create',
      name: 'project-create',
      title: 'Create Projects',
      nav: false,
      settings: { scope: scope, context: context }
    });
    config.mapRoute({
      route: 'projects/:id',
      moduleId: 'pages/project/overview',
      name: 'project',
      title: 'Project',
      nav: false,
      settings: { scope: scope, context: context }
    });

    this.router = router;
  };

  UserPage.prototype.activate = function activate(params) {
    if (this.users.current) {
      this.context.user = this.users.current;
    }
  };

  return UserPage;
}()) || _class);
});

define('pages/users/user/profile',['require','exports','module','aurelia-framework','app-state','aurelia-binding','services/user','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserProfile = undefined;

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');

var _appState = require('app-state');

var _appState2 = _interopRequireDefault(_appState);

var _aureliaBinding = require('aurelia-binding');

var _user = require('services/user');

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserProfile = exports.UserProfile = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function () {
  function UserProfile(user) {
    _classCallCheck(this, UserProfile);

    this.heading = 'User Profile';

    this.user = user;
  }

  UserProfile.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  UserProfile.prototype.activate = function activate() {
    console.log(this.user);
  };

  return UserProfile;
}()) || _class);
});

define('pages/users/user/reviews',['require','exports','module','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UserReviews = undefined;

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserReviews = exports.UserReviews = function () {
  function UserReviews() {
    _classCallCheck(this, UserReviews);
  }

  UserReviews.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  return UserReviews;
}();
});

define('pages/users/user/settings',['require','exports','module','app-state','app-portal'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.UpdateUser = undefined;

var _appState = require('app-state');

var _appState2 = _interopRequireDefault(_appState);

var _appPortal = require('app-portal');

var _appPortal2 = _interopRequireDefault(_appPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UpdateUser = exports.UpdateUser = function () {
  function UpdateUser() {
    _classCallCheck(this, UpdateUser);

    this.state = _appState2.default;
  }

  UpdateUser.prototype.canActivate = function canActivate() {
    _appPortal2.default.setConfig('portalContext', 'default');
  };

  UpdateUser.prototype.activate = function activate(params, config) {
    var _this = this;

    _appState2.default.authorize(function (authorized) {
      _this.authorized = _appState2.default.authorized;
    });
  };

  UpdateUser.prototype.deactivate = function deactivate() {};

  UpdateUser.prototype.enablePersonalTitle = function enablePersonalTitle(config) {};

  return UpdateUser;
}();
});

define('pages/users/investor/project/profile',['require','exports','module','server'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.ProjectProfile = undefined;

var _server = require('server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectProfile = exports.ProjectProfile = function () {
  function ProjectProfile() {
    _classCallCheck(this, ProjectProfile);
  }

  ProjectProfile.prototype.activate = function activate(params) {
    var _this = this;

    if (params.projectId) {
      return _server2.default.get('/api/project_profiles/' + params.projectId).then(function (response) {
        _this.profile = response.content;
      });
    }
  };

  return ProjectProfile;
}();
});

define('pages/users/investor/project/search',['require','exports','module','server'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.SearchFilterValueConverter = exports.ProjectSearch = undefined;

var _server = require('server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectSearch = exports.ProjectSearch = function () {
  function ProjectSearch() {
    _classCallCheck(this, ProjectSearch);

    this.searchValue = '';
  }

  ProjectSearch.prototype.activate = function activate() {
    var _this = this;

    return _server2.default.get('/api/project_profiles').then(function (response) {
      _this.projects = response.content.map(function (model) {
        var href = '#/investor/projects/' + model._id;
        return { href: href, model: model };
      });
    });
  };

  return ProjectSearch;
}();

var RegExpCache = {};

var SearchFilterValueConverter = exports.SearchFilterValueConverter = function () {
  function SearchFilterValueConverter() {
    _classCallCheck(this, SearchFilterValueConverter);
  }

  SearchFilterValueConverter.prototype.toView = function toView(list, value) {
    var regexp = RegExpCache[value] = RegExpCache[value] || new RegExp(value, 'g');
    return list.filter(function (project) {
      var pass = false;
      pass = regexp.test(project.model.title);
      return pass;
    });
  };

  return SearchFilterValueConverter;
}();
});

define('aurelia-cookie/cookie',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    

    var Cookie = exports.Cookie = function () {
        function Cookie() {
            
        }

        Cookie.get = function get(name) {
            var cookies = this.all();

            if (cookies && cookies[name]) {
                return cookies[name];
            }

            return null;
        };

        Cookie.set = function set(name, value) {
            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            var str = this.encode(name) + '=' + this.encode(value);

            if (value === null) {
                options.expiry = -1;
            }

            if (options.expiry >= 0 && !options.expires) {
                var expires = new Date();

                expires.setHours(expires.getHours() + options.expiry);
                options.expires = expires;
            }

            if (options.path) {
                str += '; path=' + options.path;
            }

            if (options.domain) {
                str += '; domain=' + options.domain;
            }

            if (options.expires) {
                str += '; expires=' + options.expires.toUTCString();
            }

            if (options.secure) {
                str += '; secure';
            }

            document.cookie = str;
        };

        Cookie.delete = function _delete(name) {
            var domain = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            var cookieString = name + ' =;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            if (domain) {
                cookieString += '; domain=' + domain;
            }

            document.cookie = cookieString;
        };

        Cookie.all = function all() {
            return this.parse(document.cookie);
        };

        Cookie.parse = function parse(str) {
            var obj = {};
            var pairs = str.split(/ *; */);
            var pair = void 0;

            if (pairs[0] === '') {
                return obj;
            }

            for (var i = 0; i < pairs.length; ++i) {
                pair = pairs[i].split('=');
                obj[this.decode(pair[0])] = this.decode(pair[1]);
            }

            return obj;
        };

        Cookie.encode = function encode(value) {
            try {
                return encodeURIComponent(value);
            } catch (e) {
                return null;
            }
        };

        Cookie.decode = function decode(value) {
            try {
                return decodeURIComponent(value);
            } catch (e) {
                return null;
            }
        };

        return Cookie;
    }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"styles/base.css\"></require>\n  <require from=\"styles/app.css\"></require>\n  <app-background></app-background>\n  <container>\n    <aside></aside>\n    <main>\n      <header>\n        <app-bar id=\"appBar\" router.bind=\"router\" route-config.bind=\"router.currentInstruction.config\"></app-bar>\n      </header>\n      <section></section>\n    </main>\n  </container>\n  <host>\n    <aside></aside>\n    <main>\n      <header></header>\n      <router-view></router-view>\n    </main>\n  </host>\n</template>\n\n<!-- <footer>\n  <app-footer router.bind=\"router\"></app-footer>\n</footer> -->\n"; });
define('text!pages/auth/login.html', ['module'], function(module) { module.exports = "<template>\n  <page-view id=\"login-page\">\n    <header>\n      <h1>Sign in</h1>\n    </header>\n    <form submit.trigger=\"submit()\">\n      <label>\n        <input type=\"email\" value.bind=\"user.email\" autofocus=\"true\" placeholder=\"Email\">\n      </label>\n      <divider></divider>\n      <label>\n        <input type=\"password\" value.bind=\"user.password\" placeholder=\"Password\">\n        <button type=\"submit\"><icon md=arrow_forward></icon></button>\n      </label>\n    </form>\n\n    <footer>\n      <span class=\"footer-text\">\n        <input type=\"checkbox\" name=\"remember_me\" checked.bind=\"user.remember\">\n        Keep me signed in\n      </span>\n\n      <divider></divider>\n\n      <span class=\"footer-text\" href=\"#/\">\n        Forgot email or password?\n      </span>\n\n      <span class=\"footer-text\">\n        Don't have an account? <a href=\"#/signup\">Create one now.</a>\n      </span>\n\n    </footer>\n  </page-view>\n</template>\n"; });
define('text!pages/auth/logout.html', ['module'], function(module) { module.exports = "<template></template>\n"; });
define('text!pages/auth/signup.html', ['module'], function(module) { module.exports = "<template>\n  <page-view id=\"login-page\">\n    <header>\n      <h1>Sign up</h1>\n    </header>\n\n    <form submit.trigger=\"submit()\" hide.bind=\"displayRoleSelection\">\n      <label>\n        <input type=\"email\" value.bind=\"user.email\" autofocus=\"true\" placeholder=\"Email\">\n      </label>\n      <divider></divider>\n      <label>\n        <input type=\"password\" value.bind=\"user.password\" placeholder=\"Password\">\n      </label>\n      <divider></divider>\n      <label>\n        <input type=\"password\" value.bind=\"user.confirm\" placeholder=\"Confirm Password\">\n        <button type=\"submit\"><icon md=arrow_forward></icon></button>\n      </label>\n    </form>\n    <form show.bind=\"displayRoleSelection\">\n      <label class=\"select-label\" repeat.for=\"role of roles\">\n        ${role.title}\n        <input type=\"radio\" id=\"user_role\" name=\"user_role\" value.bind=\"role.name\" checked.bind=\"user.role\">\n      </label>\n    </form>\n    <footer>\n      <span class=\"footer-text\" hide.bind=\"displayRoleSelection\">\n        <input type=\"checkbox\" name=\"remember_me\" checked.bind=\"user.remember\">\n        Keep me signed in\n      </span>\n\n      <button class=\"submit-button\" click.trigger=\"submitRole()\" show.bind=\"displayRoleSelection\">Sign up<icon md=arrow_forward></icon></button>\n\n      <divider></divider>\n\n      <span class=\"footer-text\">\n        Already have an account? <a href=\"#/login\">Sign in now.</a>\n      </span>\n\n    </footer>\n  </page-view>\n</template>\n"; });
define('text!pages/inbox/index.html', ['module'], function(module) { module.exports = "<template>\n  <section id=\"inbox-page\">\n    <aside id=\"aside-room-list\">\n      <header class=\"messages-header\">\n        <label>\n          <input type=\"text\" value.bind=\"searchValue\" list=\"userList\">\n          <datalist id=\"userList\">\n            <option repeat.for=\"user of users\" value.bind=\"user.email\">\n          </datalist>\n        </label>\n        <action click.trigger=\"toggleEditMode()\">Edit</action>\n      </header>\n\n      <section>\n        <ul id=\"room-list\" class=\"room-list ${editMode ? 'edit-mode' : '' }\">\n          <li repeat.for=\"room of user.rooms\" click.trigger=\"selectRoom(room)\" class=\"${activeRoom === room ? 'active' : ''}\">\n            <span class=\"remove-icon\" click.trigger=\"destroyRoom(room)\">\n              <icon md=\"remove_circle\"></icon>\n            </span>\n            <span class=\"item__content\">\n              <h4>${room.creator.email}</h4>\n              <a>${room.creator.email}</a>\n              <icon class=\"caret\" md=chevron_right></icon>\n            </span>\n          </li>\n        </ul>\n      </section>\n\n    </aside>\n\n    <aside class=\"message-chat\">\n      <header>\n        <tag-input display=email label=To options.bind=\"users\" selected.two-way=\"activeRoom.users\"></tag-input>\n      </header>\n      <ul>\n        <li repeat.for=\"message of activeRoom.messages\">\n          ${message.content}\n        </li>\n      </ul>\n      <footer>\n        <form id=\"message-form\" submit.tigger=\"activeRoom.postMessage()\">\n          <label>\n            <textarea name=\"message\" value.bind=\"activeRoom.newMessage\" placeholder=\"Message\"></textarea>\n          </label>\n          <action click.trigger=\"activeRoom.postMessage()\" icon=\"send\"></action>\n        </form>\n      </footer>\n    </aside>\n  </section>\n</template>\n"; });
define('text!pages/project/create.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"columns small-12 medium-8 medium-offset-2\">\n    <card>\n      <form submit.trigger=\"submit()\">\n        <label>\n          <blockquote>\n            <h5>Overview</h5>\n          </blockquote>\n          <textarea value.two-way=\"overview\" placeholder=\"Overview\" name=\"overview\" id=\"project-overview\"></textarea>\n        </label>\n\n        <label>\n          <blockquote>\n            <h5>Teaser</h5>\n          </blockquote>\n          <textarea value.two-way=\"teaser\" placeholder=\"Overview\" name=\"teaser\" id=\"project-teaser\"></textarea>\n        </label>\n\n        <label>\n          <blockquote>\n            <h5>Category</h5>\n            <small>${selectedCategory.description}</small>\n          </blockquote>\n          <select value.two-way=\"category\">\n            <option repeat.for=\"category of categories\" model.bind=\"category\">${category.name}</option>\n          </select>\n        </label>\n\n        <label class=\"button-group\">\n          <button class=\"button-small success\" type=\"submit\">Submit</button>\n          <button class=\"button-small alert\" click.trigger=\"router.navigateBack()\">Cancel</button>\n        </label>\n      </form>\n    </card>\n  </div>\n</template>\n"; });
define('text!pages/project/index.html', ['module'], function(module) { module.exports = "<template>\n  <router-view></router-view>\n</template>\n"; });
define('text!pages/project/list.html', ['module'], function(module) { module.exports = "<template>\n  <page-title>Projects</page-title>\n  <div class=\"row\">\n    <div class=\"small-12 columns\">\n      <div class=\"row\">\n        <div class=\"columns\">\n          <action tint=\"primary\" show.bind=\"context.user\" href=\"#/users/${context.user.id}/projects/create\" icon=\"add-box\" class=\"align-right\"></action>\n        </div>\n      </div>\n    </div>\n    <project-card-table class=\"columns\">\n      <project-card repeat.for=\"project of projects\">\n        <aside>\n          <icon type=\"fiber\"></icon>\n        </aside>\n        <header>\n          <h2>${project.overview}</h2>\n          <summary> ${project.teaser}; </summary>\n          <label>\n              <ui-select show.bind=\"context.user\"\n                         options.bind=\"statusTypes\"\n                         value.bind=\"project.statuses\"\n                         multiple=\"multiple\"\n                         placeholder=\"Status\">\n              </ui-select>\n          </label>\n        </header>\n      </project-card>\n    </project-card-table>\n  </div>\n</template>\n"; });
define('text!pages/project/overview.html', ['module'], function(module) { module.exports = "<template>\n <blockquote>\n    <h2>Overview</h2>\n    <small>${project.overview}</small>\n  </blockquote>\n  <blockquote>\n    <h4>Teaser</h4>\n    <small>${project.teaser}</small>\n  </blockquote>\n</template>\n"; });
define('text!pages/project/update.html', ['module'], function(module) { module.exports = "<template>\n <blockquote>\n    <h2>Overview</h2>\n    <small>${project.overview}</small>\n  </blockquote>\n  <blockquote>\n    <h4>Teaser</h4>\n    <small>${project.teaser}</small>\n  </blockquote>\n</template>\n"; });
define('text!pages/search/results.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"row column\">\n    <h3>Search Results</h3>\n    <div class=\"row\">\n      <div class=\"small-6 columns\">\n        <input type=\"text\" name=\"search-terms\" placeholder=\"search for projects or profiles\"/>\n      </div>\n    </div>\n    <div class=\"row\">\n      <ul class=\"menu search-tabs\">\n        <li class=\"active\"><a>Projects</a></li>\n        <li><a>User Profiles</a></li>\n      </ul>\n    </div>\n    <div class=\"row search-results\" id=\"project-results\">\n      <!-- result -->\n      <div class=\"row result\">\n        <div class=\"small-12 columns\"><h4>Project Title</h4></div>\n        <div class=\"small-2 columns\">\n          <img class=\"thumbnail\" src=\"http://placehold.it/150x150\">\n        </div>\n        <div class=\"small-8 columns\">\n          <div class=\"row result-summary\">\n            Asymmetrical leggings chartreuse helvetica, put a bird on it dreamcatcher freegan ugh paleo migas swag disrupt. Before they sold out pabst tacos biodiesel authentic ugh kale chips. Meggings messenger bag synth, put a bird on it knausgaard keffiyeh franzen kale chips raw denim plaid fixie.\n          </div>\n          <div class=\"row milestones\">\n            <img src=\"images/achievement-b.png\" alt=\"\">\n            <img src=\"images/achievement-k.png\" alt=\"\">\n            <img src=\"images/achievement-d.png\" alt=\"\">\n          </div>\n        </div>\n        <hr>\n      </div>\n      <!-- result end -->\n      <!-- result -->\n      <div class=\"row result\">\n        <div class=\"small-12 columns\"><h4>Project Title</h4></div>\n        <div class=\"small-2 columns\">\n          <img class=\"thumbnail\" src=\"http://placehold.it/150x150\">\n        </div>\n        <div class=\"small-8 columns\">\n          <div class=\"row result-summary\">\n            Asymmetrical leggings chartreuse helvetica, put a bird on it dreamcatcher freegan ugh paleo migas swag disrupt. Before they sold out pabst tacos biodiesel authentic ugh kale chips. Meggings messenger bag synth, put a bird on it knausgaard keffiyeh franzen kale chips raw denim plaid fixie.\n          </div>\n          <div class=\"row milestones\">\n            <img src=\"images/achievement-c.png\" alt=\"\">\n            <img src=\"images/achievement-l.png\" alt=\"\">\n            <img src=\"images/achievement-d.png\" alt=\"\">\n          </div>\n        </div>\n        <hr>\n      </div>\n      <!-- result end -->\n      <!-- result -->\n      <div class=\"row result\">\n        <div class=\"small-12 columns\"><h4>Project Title</h4></div>\n        <div class=\"small-2 columns\">\n          <img class=\"thumbnail\" src=\"http://placehold.it/150x150\">\n        </div>\n        <div class=\"small-8 columns\">\n          <div class=\"row result-summary\">\n            Asymmetrical leggings chartreuse helvetica, put a bird on it dreamcatcher freegan ugh paleo migas swag disrupt. Before they sold out pabst tacos biodiesel authentic ugh kale chips. Meggings messenger bag synth, put a bird on it knausgaard keffiyeh franzen kale chips raw denim plaid fixie.\n          </div>\n          <div class=\"row milestones\">\n            <img src=\"images/achievement-j.png\" alt=\"\">\n            <img src=\"images/achievement-h.png\" alt=\"\">\n            <img src=\"images/achievement-a.png\" alt=\"\">\n          </div>\n        </div>\n        <hr>\n      </div>\n      <!-- result end -->\n    </div>\n    <div class=\"row search-results hidden\" id=\"user-results\">\n      <!-- result -->\n      <div class=\"row result\">\n        <div class=\"small-12 columns\"><h4>Nicola Telsa</h4></div>\n        <div class=\"small-2 columns\">\n          <img class=\"thumbnail\" src=\"images/Nikola-Tesla-200x200.png\" height=\"150\" width=\"150\">\n        </div>\n        <div class=\"small-8 columns\">\n          <div class=\"row result-summary\">\n            Nikola Tesla is a Serbian American inventor, electrical engineer, mechanical engineer, physicist, and futurist best known for his contributions to the design of the modern alternating current electricity supply system.\n          </div>\n          <div class=\"row user-projects\">\n            <strong>Nicola's Projects</strong>\n            <ul class=\"project-list\">\n              <li>Project 1</li>\n              <li>Project 2</li>\n              <li>Project 3</li>\n            </ul>\n          </div>\n          <div class=\"row user-info\">\n            <div class=\"small-3 columns user-achievements\">\n              <img src=\"images/achievement-b.png\" alt=\"\">\n              <img src=\"images/achievement-k.png\" alt=\"\">\n              <img src=\"images/achievement-d.png\" alt=\"\">\n            </div>\n            <div class=\"small-3 columns reviews\">\n              <i><a href=\"/#user-profiles/1\">36 User Reviews</a></i>\n            </div>\n            <div class=\"small-6 columns reviews\"></div>\n          </div>\n        </div>\n        <hr>\n      </div>\n      <!-- result end -->\n      <!-- result -->\n      <div class=\"row result\">\n        <div class=\"small-12 columns\"><h4>Nicola Telsa</h4></div>\n        <div class=\"small-2 columns\">\n          <img class=\"thumbnail\" src=\"images/Nikola-Tesla-200x200.png\" height=\"150\" width=\"150\">\n        </div>\n        <div class=\"small-8 columns\">\n          <div class=\"row result-summary\">\n            Nikola Tesla is a Serbian American inventor, electrical engineer, mechanical engineer, physicist, and futurist best known for his contributions to the design of the modern alternating current electricity supply system.\n          </div>\n          <div class=\"row user-projects\">\n            <strong>Nicola's Projects</strong>\n            <ul class=\"project-list\">\n              <li>Project 1</li>\n              <li>Project 2</li>\n              <li>Project 3</li>\n            </ul>\n          </div>\n          <div class=\"row user-info\">\n            <div class=\"small-3 columns user-achievements\">\n              <img src=\"images/achievement-b.png\" alt=\"\">\n              <img src=\"images/achievement-k.png\" alt=\"\">\n              <img src=\"images/achievement-d.png\" alt=\"\">\n            </div>\n            <div class=\"small-3 columns reviews\">\n              <i><a href=\"/#user-profiles/1\">36 User Reviews</a></i>\n            </div>\n            <div class=\"small-6 columns reviews\"></div>\n          </div>\n        </div>\n        <hr>\n      </div>\n      <!-- result end -->\n      <!-- result -->\n      <div class=\"row result\">\n        <div class=\"small-12 columns\"><h4>Nicola Telsa</h4></div>\n        <div class=\"small-2 columns\">\n          <img class=\"thumbnail\" src=\"images/Nikola-Tesla-200x200.png\" height=\"150\" width=\"150\">\n        </div>\n        <div class=\"small-8 columns\">\n          <div class=\"row result-summary\">\n            Nikola Tesla is a Serbian American inventor, electrical engineer, mechanical engineer, physicist, and futurist best known for his contributions to the design of the modern alternating current electricity supply system.\n          </div>\n          <div class=\"row user-projects\">\n            <strong>Nicola's Projects</strong>\n            <ul class=\"project-list\">\n              <li>Project 1</li>\n              <li>Project 2</li>\n              <li>Project 3</li>\n            </ul>\n          </div>\n          <div class=\"row user-info\">\n            <div class=\"small-3 columns user-achievements\">\n              <img src=\"images/achievement-b.png\" alt=\"\">\n              <img src=\"images/achievement-k.png\" alt=\"\">\n              <img src=\"images/achievement-d.png\" alt=\"\">\n            </div>\n            <div class=\"small-3 columns reviews\">\n              <i><a href=\"/#user-profiles/1\">36 User Reviews</a></i>\n            </div>\n            <div class=\"small-6 columns reviews\"></div>\n          </div>\n        </div>\n        <hr>\n      </div>\n      <!-- result end -->\n    </div>\n</template>\n"; });
define('text!pages/show-down/index.html', ['module'], function(module) { module.exports = "<template>\n  <page-view id=\"show-down\">\n    <project-card-list class=\"float\" swipe-left.bind=\"deniedProject\" swipe-right.bind=\"acceptedProject\">\n\n      <project-card repeat.for=\"project of projects\" model.bind=\"project\" flip=true\n                    card-rotate-right.trigger=\"acceptedProject(project)\"\n                    card-rotate-left.trigger=\"deniedProject(project)\">\n        <card-front>\n          <icon class=\"card__backdrop\" type=\"chevron-right\"></icon>\n          <header>\n            <h3>${project.model.overview}</h3>\n          </header>\n          <article>\n            <p>${project.model.teaser}</p>\n          </article>\n          <section>\n            <fab class=\"card-toggle-flip\"> Preview </fab>\n          </section>\n          <footer class=\"expanded button-group small\">\n            <button light tint=\"alert\" class=\"card-rotate-left\">\n              <icon type=\"close\"></icon>\n            </button>\n            <button light tint=\"success\"  class=\"card-rotate-right\">\n              <icon type=\"checkmark\"></icon>\n            </button>\n          </footer>\n        </card-front>\n        <card-back>\n          <icon class=\"card__backdrop\" type=\"chevron-left\"></icon>\n          <header>\n            <icon class=\"card-toggle-flip\" type=\"close\"></icon>\n          </header>\n        </card-back>\n      </project-card>\n    </project-card-list>\n  </page-view>\n</template>\n"; });
define('text!pages/users/dreamer.html', ['module'], function(module) { module.exports = "<template>\n  <app-portal router.bind=\"router\" router-config.bind=\"router.currentInstruction.config\">\n\n    <a slot=defaultNav\n       repeat.for=\"nav of router.navigation\"\n       href.bind=\"nav.href\"\n       title.bind=\"nav.title\"\n       class=\"${nav.isActive ? 'is-selected' : ''}\">\n      <icon md.bind=\"nav.config.icon\"></icon>\n    </a>\n\n    <a slot=projectNav\n       repeat.for=\"nav of router.projectNavigation\"\n       href.bind=\"nav.href\"\n       title.bind=\"nav.title\"\n       class=\"${nav.isActive ? 'is-selected' : ''}\">\n      <icon md.bind=\"nav.config.icon\"></icon>\n    </a>\n\n    <router-view></router-view>\n  </app-portal>\n</template>\n"; });
define('text!pages/users/investor.html', ['module'], function(module) { module.exports = "<template>\n  <app-portal router.bind=\"router\" router-config.bind=\"router.currentInstruction.config\" id=\"investor-portal\">\n\n    <a slot=defaultNav\n       repeat.for=\"nav of router.navigation\"\n       href.bind=\"nav.href\"\n       title.bind=\"nav.title\"\n       class=\"${nav.isActive ? 'is-selected' : ''}\">\n      <icon md.bind=\"nav.config.icon\"></icon>\n    </a>\n\n    <a slot=projectNav\n       repeat.for=\"nav of router.projectNavigation\"\n       href.bind=\"nav.href\"\n       title.bind=\"nav.title\"\n       class=\"${nav.isActive ? 'is-selected' : ''}\">\n      <icon md.bind=\"nav.config.icon\"></icon>\n    </a>\n\n    <router-view></router-view>\n  </app-portal>\n</template>\n"; });
define('text!pages/users/portal.html', ['module'], function(module) { module.exports = "<template>\n  <app-portal router.bind=\"router\" router-config.bind=\"router.currentInstruction.config\">\n\n    <a slot=defaultNav\n       repeat.for=\"nav of router.navigation\"\n       href.bind=\"nav.href\"\n       title.bind=\"nav.title\"\n       class=\"${nav.isActive ? 'is-selected' : ''}\">\n      <icon md.bind=\"nav.config.icon\"></icon>\n    </a>\n\n    <a slot=projectNav\n       repeat.for=\"nav of router.projectNavigation\"\n       href.bind=\"nav.href\"\n       title.bind=\"nav.title\"\n       class=\"${nav.isActive ? 'is-selected' : ''}\">\n      <icon md.bind=\"nav.config.icon\"></icon>\n    </a>\n\n    <router-view></router-view>\n  </app-portal>\n</template>\n"; });
define('text!pages/welcome/_card-index.html', ['module'], function(module) { module.exports = "<template>\n  <!-- <require from=\"./welcome-card\"></require> -->\n  <page-view id=\"welcome\" flex-dir=\"row-wrap\">\n\n    <!-- <section class=\"card__row\">\n      <welcome-card repeat.for=\"card of topcards\">\n        <picture class=\"card__picture\">\n          <img src.bind=\"card.image\">\n        </picture>\n        <header>\n          <h2>${card.title}</h2>\n          <p>${card.text}</p>\n        </header>\n      </welcome-card>\n    </section>\n    <section class=\"card__row\">\n      <welcome-card repeat.for=\"card of bottomcards\">\n        <picture class=\"card__picture\">\n          <img src.bind=\"card.image\">\n        </picture>\n        <header>\n          <h2>${card.title}</h2>\n          <p>${card.text}</p>\n        </header>\n      </welcome-card>\n    </section> -->\n  </page-view>\n</template>\n"; });
define('text!pages/welcome/index.html', ['module'], function(module) { module.exports = "<template>\n  <!-- <require from=\"./welcome-card\"></require> -->\n  <page-view flex-dir=\"row-wrap\" class=\"show-backdrop\">\n    <h1>Welcome</h1>\n  </page-view>\n</template>\n"; });
define('text!styles/app.css', ['module'], function(module) { module.exports = "@charset \"UTF-8\";body,html{font-family:-apple-system-font,\"Helvetica Neue\",Helvetica,arial,sans-serif;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;-moz-font-feature-settings:'liga','kern'}body,card-back,card-front{-webkit-backface-visibility:hidden}.menu .inline-list,.name,app-footer{text-align:center}[fill=primary]{background-color:#03A9F4}[fill=primary]:focus [focus],[fill=primary]:hover [focus]{background-color:#0398dc}[tint=primary],[tint=primary]:focus,[tint=primary]:hover{color:#03A9F4;fill:#03A9F4}[tint=primary]:focus[light],[tint=primary]:hover[light]{background-color:rgba(3,169,244,.1)!important}[tint=primary]:active[light]{background-color:rgba(3,169,244,.2)!important}[fill=secondary]{background-color:#777}[fill=secondary]:focus [focus],[fill=secondary]:hover [focus]{background-color:#6b6b6b}[tint=secondary],[tint=secondary]:focus,[tint=secondary]:hover{color:#777;fill:#777}[tint=secondary]:focus[light],[tint=secondary]:hover[light]{background-color:rgba(119,119,119,.1)!important}[tint=secondary]:active[light]{background-color:rgba(119,119,119,.2)!important}[fill=success]{background-color:#8BC34A}[fill=success]:focus [focus],[fill=success]:hover [focus]{background-color:#7eb63c}[tint=success],[tint=success]:focus,[tint=success]:hover{color:#8BC34A;fill:#8BC34A}[tint=success]:focus[light],[tint=success]:hover[light]{background-color:rgba(139,195,74,.1)!important}[tint=success]:active[light]{background-color:rgba(139,195,74,.2)!important}[fill=warning]{background-color:#FFC107}[fill=warning]:focus [focus],[fill=warning]:hover [focus]{background-color:#ecb100}[tint=warning],[tint=warning]:focus,[tint=warning]:hover{color:#FFC107;fill:#FFC107}[tint=warning]:focus[light],[tint=warning]:hover[light]{background-color:rgba(255,193,7,.1)!important}[tint=warning]:active[light]{background-color:rgba(255,193,7,.2)!important}[fill=alert]{background-color:#F44336}[fill=alert]:focus [focus],[fill=alert]:hover [focus]{background-color:#f2291a}[tint=alert],[tint=alert]:focus,[tint=alert]:hover{color:#F44336;fill:#F44336}[tint=alert]:focus[light],[tint=alert]:hover[light]{background-color:rgba(244,67,54,.1)!important}[tint=alert]:active[light]{background-color:rgba(244,67,54,.2)!important}body>header{background-color:#292c2f}label.control{position:relative;font-size:18px;margin-bottom:1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}label.control:first-child{margin-top:1rem}label.control span.text{padding-left:8px;font-size:14px;color:rgba(0,0,0,.54)}label.control label-border{display:block;position:absolute;left:0;right:0;bottom:0;height:2px;-webkit-transition:-webkit-transform .2s cubic-bezier(.25,.8,.25,1) 0s;transition:-webkit-transform .2s cubic-bezier(.25,.8,.25,1) 0s;transition:transform .2s cubic-bezier(.25,.8,.25,1) 0s;transition:transform .2s cubic-bezier(.25,.8,.25,1) 0s,-webkit-transform .2s cubic-bezier(.25,.8,.25,1) 0s;-webkit-transform:scaleX(0);transform:scaleX(0);background-color:#81D4FA;margin-left:8px}label.control.has-switch{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;min-height:48px}label.control.has-switch switch{margin:0 1rem}label.control.focus:not(.has-switch) label-border{-webkit-transform:scaleX(1);transform:scaleX(1)}label.control input[type=url],label.control input[type=password],label.control input[type=text],label.control input[type=search],label.control input[type=email],label.control input[type=tel],label.control textarea{border:none;background-color:transparent;position:relative;display:block;box-shadow:none;padding:0 .5rem .5rem;height:auto}label.control input[type=url]:focus,label.control input[type=password]:focus,label.control input[type=text]:focus,label.control input[type=search]:focus,label.control input[type=email]:focus,label.control input[type=tel]:focus,label.control textarea:focus{border:none;background-color:none;box-shadow:none}a.button,button{text-decoration:none;background-color:transparent;color:#777;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;min-height:36px;min-width:72px;line-height:36px;font-size:18px;text-transform:uppercase;padding:0 1rem;border-radius:4px}#portal-home>section>ul>li>a:hover,page-view#login-page footer .footer-text a:hover{text-decoration:underline}a.button:hover,button:hover{background-color:#F5F5F5}a.button:active,button:active{background-color:#EEE}a.button.fill.alert,a.button.fill.success,button.fill.alert,button.fill.success{background-color:#8BC34A;color:#fefefe}a.button.success:not(.fill):hover,button.success:not(.fill):hover{background-color:rgba(139,195,74,.1)}a.button.success:not(.fill):active,button.success:not(.fill):active{background-color:rgba(139,195,74,.2)}a.button.alert:not(.fill):hover,button.alert:not(.fill):hover{background-color:rgba(244,67,54,.1)}a.button.alert:not(.fill):active,button.alert:not(.fill):active{background-color:rgba(244,67,54,.2)}button.iconic{background-color:#9bae5a;border:1px solid #fff;border-radius:40px;box-shadow:0 0 0 1px rgba(10,10,10,.2);width:2rem;height:2rem}.menu,body{height:auto}button.iconic i{color:#fefefe;font-size:1.5rem}[flex-dir=column-wrap],[flex-dir=column],[flex-dir=row-wrap],[flex-dir=row]{display:-webkit-box;display:-ms-flexbox;display:flex}[flex-dir=column-wrap],[flex-dir=column]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}[flex-dir=row-wrap],[flex-dir=row]{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}[flex-dir=column-wrap],[flex-dir=row-wrap]{-ms-flex-wrap:wrap;flex-wrap:wrap}html{box-sizing:border-box;-webkit-font-smoothing:antialiased;font-smoothing:antialiased;overflow-x:hidden;max-width:100vw}*,::after,::before{box-sizing:inherit}body{-webkit-font-smoothing:antialiased;font-smoothing:antialiased;background:0 0;backface-visibility:hidden}body>app-background{display:block;min-height:100vh;min-width:100vw;position:fixed;top:0;left:0;right:0;bottom:0;overflow:hidden}body>app-background:after,body>app-background:before{content:\" \";display:block;min-width:inherit;min-height:inherit;position:fixed;-webkit-filter:blur(10px);filter:blur(10px)}body>container,body>host{display:-webkit-box;display:-ms-flexbox;-webkit-box-orient:horizontal;min-width:100vw;-webkit-box-direction:normal}body>app-background:before{background-repeat:no-repeat;background-size:cover;background-image:url(resources/Grid-Mac.png);background-position:center}body>app-background:after{z-index:1;background-color:rgba(255,255,255,.6)}body>container>aside>header,body>container>aside>section,body>container>main>header,body>container>main>section,body>host>main>router-view{background-color:rgba(225,225,235,0)}body>host{display:flex;-ms-flex-direction:row;flex-direction:row;position:relative;min-height:100vh;pointer-events:none}body>container,dialog-window{pointer-events:none;-ms-flex-direction:row}body>container{display:flex;flex-direction:row;min-height:0;max-height:0;max-width:100vw}action,app-bar,body>host>main>router-view>section,dialog-window dialog,router-view page-view{pointer-events:auto}body>container>aside,body>host>aside{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;position:relative;max-width:0;z-index:1}body>container>main,body>host>main{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}body>container>aside>header,body>container>main>header,body>host>main>header{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;max-height:12rem;min-height:12rem}body>container>main>header>app-bar{position:fixed;left:0;right:0;z-index:100}body>container>aside>section,body>container>main>section,body>host>main>router-view{-webkit-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}body>container>main>header>nav{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;margin-left:auto;margin-top:auto;list-style:none;max-height:48px}body>container>main>header>nav li{color:#fff;margin:0 1rem;line-height:48px}body>host>main>router-view{min-height:calc(100% - 12rem)}body>container>aside>section ul{list-style:none;margin:0;padding:0;position:relative}body>container>aside>section ul li{position:relative;line-height:44px;min-width:100%}body>container>aside>section ul li a{padding-left:1rem;display:block;position:relative;line-height:inherit;text-overflow:ellipsis;white-space:nowrap;max-width:100%;min-width:100%}body>container>aside>section ul li:hover{background-color:#F5F5F5}body>container>aside>section ul li.active{background-color:#EEE}body>container>main>header>button{display:none;margin:1rem;position:relative;width:48px;height:48px;padding:0;-webkit-appearance:none;border:none;outline:0;background-color:transparent}body>container>main>header>button>ai-icon.icon{margin:0;position:absolute;width:inherit;height:inherit;top:0;left:0;right:0;bottom:0;-webkit-transition:-webkit-transform .4s cubic-bezier(.25,.8,.25,1) 0s;transition:-webkit-transform .4s cubic-bezier(.25,.8,.25,1) 0s;transition:transform .4s cubic-bezier(.25,.8,.25,1) 0s;transition:transform .4s cubic-bezier(.25,.8,.25,1) 0s,-webkit-transform .4s cubic-bezier(.25,.8,.25,1) 0s;fill:#fff}body>container>main>header>button>ai-icon.icon.close{opacity:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}body>container>main>header>button>ai-icon.icon.menu{opacity:1;-webkit-transform:rotate(180deg);transform:rotate(180deg)}@media (max-width:768px){body>container>main{-webkit-animation-timing-function:cubic-bezier(.25,.8,.25,1);animation-timing-function:cubic-bezier(.25,.8,.25,1);-webkit-animation-duration:.2s;animation-duration:.2s;-webkit-animation-direction:alternate;animation-direction:alternate;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards;will-change:transform;-webkit-animation-name:close-aside;animation-name:close-aside;box-shadow:-10px 0 20px -2px rgba(0,0,0,.3)}body>container>main>header{box-shadow:inset 0 -1px 0 #5C6BC0}body>container>main>header>button{display:block}body>container>aside,body>host>aside{position:fixed;top:0;left:0;bottom:0;min-width:80vw;-webkit-backface-visibility:hidden;backface-visibility:hidden}body>container>aside:focus~main,body>host>aside:focus~main{-webkit-animation-name:open-aside;animation-name:open-aside}body>container>aside:focus~main>header>button ai-icon.icon,body>host>aside:focus~main>header>button ai-icon.icon{-webkit-transform:rotate(0);transform:rotate(0)}body>container>aside:focus~main>header>button ai-icon.icon.close,body>host>aside:focus~main>header>button ai-icon.icon.close{opacity:1}body>container>aside:focus~main>header>button ai-icon.icon.menu,body>host>aside:focus~main>header>button ai-icon.icon.menu{opacity:0}}.dropdown dropdown-container .dropdown-container,router-view page-view{display:-webkit-box;display:-ms-flexbox;-webkit-box-orient:vertical;-webkit-box-direction:normal}router-view page-view{display:flex;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;margin:0 auto;-webkit-transform:translateY(-100px);transform:translateY(-100px)}router-view page-view>section{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;padding:1rem}router-view page-view>section>article{margin-bottom:2rem}router-view page-view>section>article>h4{margin-bottom:1rem;color:#616161}router-view page-view>section.page__content{background:#fff;box-shadow:0 13px 20px -9px rgba(0,0,0,.3)}@-webkit-keyframes close-aside{from{-webkit-transform:translateX(79vw);transform:translateX(79vw)}to{-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes close-aside{from{-webkit-transform:translateX(79vw);transform:translateX(79vw)}to{-webkit-transform:translateX(0);transform:translateX(0)}}@-webkit-keyframes open-aside{from{-webkit-transform:translateX(0);transform:translateX(0)}to{-webkit-transform:translateX(79vw);transform:translateX(79vw)}}@keyframes open-aside{from{-webkit-transform:translateX(0);transform:translateX(0)}to{-webkit-transform:translateX(79vw);transform:translateX(79vw)}}.dropdown{position:relative}.dropdown dropdown-container{position:absolute;top:0;right:0;bottom:0;z-index:10;-webkit-transform:translateY(100%);transform:translateY(100%)}.dropdown dropdown-container .dropdown-container{display:flex;-ms-flex-direction:column;flex-direction:column;border-radius:0;font-size:1rem;padding:1rem;background-color:#fff;color:#8a8a8a;fill:#8a8a8a;box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);list-style:none}app-bar,app-bar user-profile{display:-webkit-box;display:-ms-flexbox}action,app-portal,auth-nav,dialog footer,dialog-window{-webkit-box-orient:horizontal}.dropdown dropdown-container .dropdown-container>ul{margin:0}.dropdown dropdown-container .dropdown-container.menu{padding:0}.dropdown dropdown-container .dropdown-container.menu a,.dropdown dropdown-container .dropdown-container.menu li{line-height:32px;max-height:32px;position:relative;min-width:100%;padding-left:1rem;padding-right:1rem;white-space:nowrap;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}action,app-bar user-profile h2{-webkit-user-select:none;-moz-user-select:none}.dropdown dropdown-container .dropdown-container.menu a:first-child,.dropdown dropdown-container .dropdown-container.menu li:first-child{margin-top:1rem}.dropdown dropdown-container .dropdown-container.menu a:last-child,.dropdown dropdown-container .dropdown-container.menu li:last-child{margin-bottom:1rem}.dropdown dropdown-container .dropdown-container.menu a:hover,.dropdown dropdown-container .dropdown-container.menu li:hover{background-color:rgba(0,0,0,.02)}.dropdown dropdown-container .dropdown-container.menu a:active,.dropdown dropdown-container .dropdown-container.menu li:active{background-color:rgba(0,0,0,.08)}.hide-ui app-bar{opacity:0!important}app-bar{display:flex;min-height:56px;max-height:56px;line-height:56px;padding:0 1rem;color:#777;fill:#777}app-bar particle{display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;max-height:inherit;min-height:inherit;background-color:rgba(255,255,255,.7);-webkit-transition:all .2s ease-in-out 0s;transition:all .2s ease-in-out 0s;box-shadow:0 3px 4px rgba(0,0,0,.2);z-index:0}app-bar>nav{z-index:1}app-bar user-profile{display:flex;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;margin:0 0 0 auto;padding:8px 0 8px 8px;color:inherit;fill:inherit}app-bar user-profile h2{font-size:1rem;color:inherit;fill:inherit;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;margin:auto 0;cursor:pointer;-ms-user-select:none;user-select:none}action,fab.float{-ms-user-select:none;cursor:pointer}app-bar user-profile icon{color:inherit;fill:inherit;margin-right:-12px;cursor:pointer}app-bar user-profile icon svg{fill:inherit}.menu .inline-list{margin-bottom:0}.menu .inline-list li{float:none;display:inline-block;margin-left:1rem}.menu .inline-list a{color:inherit;padding-bottom:.5rem}.menu .inline-list a:hover{color:#fefefe;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.menu .inline-list .active a{background-color:transparent;color:#0a0a0a;font-weight:700}.menu .account{position:absolute;top:3%;right:3%}.menu .account a,.menu .account i{color:#fff}.menu .account-action{float:right;margin:0}.menu .account-action li{margin-left:.2rem}.menu .account-action a{padding:.75rem 1rem}.menu .account-action a.signup{font-weight:700}.menu icon[align=right]{margin-left:auto}@media only screen and (min-width:40.063em){.menu .inline-list{float:left;margin:0 0 0 1.5rem}.name{float:left}}.name{font-size:1.5rem;line-height:1;margin:0 0 0 1rem;color:inherit}.name i{display:none;color:rgba(0,0,0,.12);margin-right:.5rem}app-footer{display:block;background-color:#292c2f;font-size:1.2rem;padding:1rem}app-footer .social a{display:inline-block;width:2rem;height:2rem;background-color:#33383b;border-radius:2px;font-size:1.5rem;color:#fff;text-align:center;line-height:2rem;margin:0 3px 0 0}login-dialog,ui-select>select{display:none}auth-nav,dialog-window,dialog-window dialog{display:-webkit-box;display:-ms-flexbox}app-footer .copyright{color:#8f9296;font-size:.875rem;margin:1rem 0}app-footer .footer-form input,app-footer .footer-form textarea{border-radius:3px;background-color:#1f2022;box-shadow:0 1px 0 0 rgba(255,255,255,.1);border:none;resize:none;font:inherit;font-size:.875rem;font-weight:400;color:#d1d2d2;padding:1.3rem}auth-nav picture.profile__picture img,card{box-shadow:0 1px 4px 0 rgba(0,0,0,.14),0 2px 1px -2px rgba(0,0,0,.2),0 0 3px 0 rgba(0,0,0,.12)}app-footer .footer-form label{color:#fff;font-size:1.2rem;margin:0 0 1rem;font-weight:700}app-footer .footer-form .submit{border-radius:3px;background-color:#33383b;color:#fff;border:0;padding:1rem 3.5rem;font-weight:700;float:right;margin:0 1rem 2rem 0}app-footer .footer-links a{list-style:none;font-weight:400;color:#fff;padding:3rem 0 2rem;margin:0;font-size:.875rem}app-footer .footer-links a::after{content:\"•\";padding:0 .2rem 0 .4rem}app-footer .footer-links a:last-child::after{content:\"\";padding:0 .4rem 0 .8rem}card,dialog article,dialog section{padding:1rem}@media only screen and (min-width:40.063em){app-footer{padding:4rem}app-footer p{text-align:left}app-footer .social{text-align:left;margin:0}app-footer .footer-form .contact{position:absolute;left:-45%;top:10%}}auth-nav{display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;height:inherit;line-height:inherit;margin-left:auto}auth-nav picture.profile__picture{height:48px;width:48px;margin:0 0 0 auto}auth-nav picture.profile__picture img{vertical-align:top;border-radius:50%}dialog-window{display:flex;-webkit-box-direction:normal;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;z-index:12;position:fixed;top:0;left:0;right:0;bottom:0}dialog-window dialog{display:flex;background-color:#fff;border-radius:4px;box-shadow:0 2px 4px rgba(0,0,0,.2);min-height:238px;min-width:400px;position:relative;-webkit-transform:scale(0);transform:scale(0);opacity:0;overflow:hidden}dialog-window dialog dialog-container,fab.float{position:absolute;display:-webkit-box;display:-ms-flexbox;bottom:0}dialog-window dialog dialog-container{display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:no-wrap;flex-wrap:no-wrap;top:0;left:0;min-width:200%}dialog-window dialog dialog-container dialog-step{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;max-width:400px;min-height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;pointer-events:auto;margin:0 8px}dialog header figure h1,dialog header figure h2,dialog header figure h3,dialog header figure h4,dialog header figure h5,dialog header figure h6,dialog header h1,dialog header h2,dialog header h3,dialog header h4,dialog header h5,dialog header h6{margin:0}dialog header figure h1,dialog header figure h2,dialog header figure h3,dialog header h1,dialog header h2,dialog header h3{font-weight:200}dialog header figure h1,dialog header h1{font-size:200%}dialog header figure h2,dialog header h2{font-size:160%}dialog header figure h3,dialog header h3{font-size:130%}dialog header figure h4,dialog header h4{font-size:120%}dialog header figure h5,dialog header h5{font-size:110%}dialog header figure h6,dialog header h6{font-size:90%}dialog header figure summary,dialog header summary{font-weight:500;font-size:80%;opacity:.7}dialog header{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin-right:auto;padding:1rem}dialog header icon{-webkit-box-ordinal-group:0;-ms-flex-order:-1;order:-1;margin-right:16px;margin-left:0}dialog footer{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;padding-top:6.5px;margin-bottom:12px}dialog footer.button-group{margin-bottom:6px;margin-left:6px;margin-right:6px}action{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;user-select:none;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;max-width:120px;min-width:48px}fab>*,icon>svg{pointer-events:none}action icon{padding:8px;width:auto;height:auto}action.align-right{margin-left:auto}card{background-color:#fff;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-transition:all .2s cubic-bezier(.25,.8,.25,1) 0s;transition:all .2s cubic-bezier(.25,.8,.25,1) 0s}card:hover{box-shadow:0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12),0 5px 5px -3px rgba(0,0,0,.2)}fab.float{display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;right:0;margin:2rem;-webkit-user-select:none;-moz-user-select:none;user-select:none;border-radius:100%;min-height:60px;min-width:60px;-webkit-transition:box-shadow .2s ease-out 0s;transition:box-shadow .2s ease-out 0s;box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2)}icon,page-view{display:-webkit-box;display:-ms-flexbox}fab.float:hover{box-shadow:0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12),0 5px 5px -3px rgba(0,0,0,.2)}fab.float:active{box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)}icon{display:flex;width:48px;height:48px;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;padding:12px}page-view{display:flex;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;position:relative;max-width:100%}page-view page-content.profile__page{display:block}page-view page-content.profile__page profile-banner{display:block;min-height:150px;min-width:100%;background-color:#03A9F4;position:relative}app-portal,page-view.show-backdrop{background-color:rgba(255,255,255,.7)}page-view page-content.profile__page profile-banner picture{position:absolute;left:0;top:0;width:100px;height:100px;border-radius:100%;overflow:hidden;-webkit-transform:translateY(50%);transform:translateY(50%);box-shadow:0 1px 4px 0 rgba(0,0,0,.14),0 2px 1px -2px rgba(0,0,0,.2),0 0 3px 0 rgba(0,0,0,.12)}page-view page-content.profile__page profile-banner profile-nav{display:block;position:absolute;bottom:0;left:0;right:0}app-portal,app-portal>section{display:-webkit-box;display:-ms-flexbox;-webkit-box-direction:normal}app-portal,app-portal aside header>nav,app-portal>section{position:relative}page-view.show-backdrop{width:95vw;max-height:85vh;text-align:center}app-portal{-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-direction:alternate;animation-direction:alternate;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards;-webkit-animation-name:fade-in;animation-name:fade-in;opacity:0;-webkit-transform:translateY(-130px);transform:translateY(-130px);display:flex;-ms-flex-direction:row;flex-direction:row;pointer-events:auto;max-width:95vw;min-width:95vw;max-height:88vh;min-height:88vh;border-radius:12px;box-shadow:0 10px 20px -5px rgba(0,0,0,.12),0 2px 30px rgba(0,0,0,.38);margin:0 auto;overflow:hidden}app-portal.portal-default>aside,app-portal>aside{background-color:rgba(255,255,255,.01)}app-portal>aside>header,app-portal>section>header{position:relative;min-width:100%;min-height:80px}app-portal>aside{-webkit-box-flex:0;-ms-flex:0 0 80px;flex:0 0 80px;min-height:100%}app-portal>section{display:flex;-ms-flex-preferred-size:auto;flex-basis:auto;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column}app-portal>section>router-view{background-color:rgba(255,255,255,.6)}app-portal>section>header{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;min-width:100%;padding-left:1rem;min-height:80px;line-height:80px}app-portal>section>header h1,app-portal>section>header h2,app-portal>section>header h3,app-portal>section>header h4,app-portal>section>header h5,app-portal>section>header h6{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;margin:0}app-portal>section>header h1 icon,app-portal>section>header h1 icon i.material-icons,app-portal>section>header h2 icon,app-portal>section>header h2 icon i.material-icons,app-portal>section>header h3 icon,app-portal>section>header h3 icon i.material-icons,app-portal>section>header h4 icon,app-portal>section>header h4 icon i.material-icons,app-portal>section>header h5 icon,app-portal>section>header h5 icon i.material-icons,app-portal>section>header h6 icon,app-portal>section>header h6 icon i.material-icons{height:inherit;line-height:inherit}app-portal>section>header h1 strong:not(.aurelia-hide)~span,app-portal>section>header h2 strong:not(.aurelia-hide)~span,app-portal>section>header h3 strong:not(.aurelia-hide)~span,app-portal>section>header h4 strong:not(.aurelia-hide)~span,app-portal>section>header h5 strong:not(.aurelia-hide)~span,app-portal>section>header h6 strong:not(.aurelia-hide)~span{font-size:1.5rem;font-weight:500;color:#03A9F4;margin:auto}app-portal>section>header>nav.right-nav{margin-left:auto;margin-right:.5rem}app-portal>section>header>nav.right-nav>button{color:#03A9F4}app-portal>section>header>nav.right-nav>button:hover{color:#4FC3F7;background-color:transparent}app-portal>section>header>nav.right-nav>button:active{color:#B3E5FC;background-color:transparent}app-portal>section fab{background-color:#E0F2F1;color:#424242}app-portal>section>router-view{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-preferred-size:auto;flex-basis:auto;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;min-width:100%}app-portal aside header,app-portal aside nav a{min-width:80px;min-height:80px;line-height:80px}app-portal aside header>nav>a,app-portal aside header>nav>a>icon,card-back,card-front{position:absolute;left:0;right:0;bottom:0;top:0}app-portal aside header>nav>a{display:block}app-portal aside header>nav>a:active,app-portal aside header>nav>a:focus,app-portal aside header>nav>a:hover,app-portal aside header>nav>a:visited{color:inherit}app-portal aside header>nav>a>icon{-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;-webkit-animation-duration:.2s;animation-duration:.2s;-webkit-animation-direction:alternate;animation-direction:alternate;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards;-webkit-transform:rotate(180deg);transform:rotate(180deg)}app-portal aside header>nav>a>icon.home{-webkit-animation-name:homeicon-back-to-home;animation-name:homeicon-back-to-home}app-portal aside header>nav>a>icon.back{-webkit-animation-name:backicon-back-to-home;animation-name:backicon-back-to-home}app-portal aside header>nav>a.show-back-icon>icon.back{-webkit-animation-name:backicon-home-to-back;animation-name:backicon-home-to-back}app-portal aside header>nav>a.show-back-icon>icon.home{-webkit-animation-name:homeicon-home-to-back;animation-name:homeicon-home-to-back}@-webkit-keyframes homeicon-back-to-home{from{opacity:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{opacity:1;-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes homeicon-back-to-home{from{opacity:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{opacity:1;-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes backicon-back-to-home{from{opacity:1;-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{opacity:0;-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes backicon-back-to-home{from{opacity:1;-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{opacity:0;-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes homeicon-home-to-back{from{opacity:1;-webkit-transform:rotate(0);transform:rotate(0)}to{opacity:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}}@keyframes homeicon-home-to-back{from{opacity:1;-webkit-transform:rotate(0);transform:rotate(0)}to{opacity:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}}@-webkit-keyframes backicon-home-to-back{from{opacity:0;-webkit-transform:rotate(0);transform:rotate(0)}to{opacity:1;-webkit-transform:rotate(180deg);transform:rotate(180deg)}}@keyframes backicon-home-to-back{from{opacity:0;-webkit-transform:rotate(0);transform:rotate(0)}to{opacity:1;-webkit-transform:rotate(180deg);transform:rotate(180deg)}}app-portal aside nav a{display:block;text-align:center;color:#424242}app-portal aside nav a icon{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;text-align:center;min-height:inherit;min-width:inherit}card-back,card-front,project-card{-ms-flex-direction:column;padding:0;display:-webkit-box;display:-ms-flexbox;-webkit-box-orient:vertical;-webkit-box-direction:normal}app-portal aside nav a:focus{background-color:transparent}app-portal aside nav a.is-selected,app-portal aside nav a:active,app-portal aside nav a:hover{color:#424242}app-portal aside nav a:hover{background-color:rgba(0,0,0,.01);color:#424242;fill:#424242}app-portal aside nav a:active{background-color:rgba(0,0,0,.05);color:#424242;fill:#424242}app-portal aside nav a.is-selected{background-color:rgba(255,255,255,.6)}card-back,card-front{background-color:inherit}app-portal aside.portal-expanded nav>a{max-height:48px;line-height:48px}@-webkit-keyframes fade-in{from{opacity:0}to{opacity:1}}@keyframes fade-in{from{opacity:0}to{opacity:1}}@media screen and (min-width:1024px){app-portal{max-width:95vw;min-width:95vw;max-height:88vh;min-height:88vh}}project-card{display:flex;flex-direction:column;margin:12px;max-width:calc(100% - 24px);-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;position:relative}card-back,card-front{display:flex;flex-direction:column;margin:0;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;z-index:2;backface-visibility:hidden}card-front{z-index:1}card-back{-webkit-transform:rotatey(-180deg)}card-back header figure h1,card-back header figure h2,card-back header figure h3,card-back header figure h4,card-back header figure h5,card-back header figure h6,card-back header h1,card-back header h2,card-back header h3,card-back header h4,card-back header h5,card-back header h6,card-front header figure h1,card-front header figure h2,card-front header figure h3,card-front header figure h4,card-front header figure h5,card-front header figure h6,card-front header h1,card-front header h2,card-front header h3,card-front header h4,card-front header h5,card-front header h6,project-card header figure h1,project-card header figure h2,project-card header figure h3,project-card header figure h4,project-card header figure h5,project-card header figure h6,project-card header h1,project-card header h2,project-card header h3,project-card header h4,project-card header h5,project-card header h6{margin:0}card-back header figure h1,card-back header figure h2,card-back header figure h3,card-back header h1,card-back header h2,card-back header h3,card-front header figure h1,card-front header figure h2,card-front header figure h3,card-front header h1,card-front header h2,card-front header h3,project-card header figure h1,project-card header figure h2,project-card header figure h3,project-card header h1,project-card header h2,project-card header h3{font-weight:200}card-back header figure h1,card-back header h1,card-front header figure h1,card-front header h1,project-card header figure h1,project-card header h1{font-size:200%}card-back header figure h2,card-back header h2,card-front header figure h2,card-front header h2,project-card header figure h2,project-card header h2{font-size:160%}card-back header figure h3,card-back header h3,card-front header figure h3,card-front header h3,project-card header figure h3,project-card header h3{font-size:130%}card-back header figure h4,card-back header h4,card-front header figure h4,card-front header h4,project-card header figure h4,project-card header h4{font-size:120%}card-back header figure h5,card-back header h5,card-front header figure h5,card-front header h5,project-card header figure h5,project-card header h5{font-size:110%}card-back header figure h6,card-back header h6,card-front header figure h6,card-front header h6,project-card header figure h6,project-card header h6{font-size:90%}card-back header figure summary,card-back header summary,card-front header figure summary,card-front header summary,project-card header figure summary,project-card header summary{font-weight:500;font-size:80%;opacity:.7}card-back>card-aside aside,card-front>card-aside aside,project-card>card-aside aside{position:relative;width:140px;height:140px}card-back>card-aside icon,card-front>card-aside icon,project-card>card-aside icon{position:absolute;top:0;left:0;bottom:0;width:100%;height:100%}card-back>card-aside icon svg,card-front>card-aside icon svg,project-card>card-aside icon svg{height:inherit;width:inherit}card-back>card-header,card-front>card-header,project-card>card-header{display:-webkit-box;display:-ms-flexbox;display:flex;padding:16px}card-back>card-header header,card-front>card-header header,project-card>card-header header{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin-right:auto}card-back>card-header header icon,card-front>card-header header icon,project-card>card-header header icon{-webkit-box-ordinal-group:0;-ms-flex-order:-1;order:-1;margin-right:16px;margin-left:0}card-back.has-aside,card-front.has-aside,project-card.has-aside{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}card-back.has-aside header,card-front.has-aside header,project-card.has-aside header{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}card-back.has-aside header h2,card-front.has-aside header h2,project-card.has-aside header h2{color:#000}card-back.has-aside header summary,card-front.has-aside header summary,project-card.has-aside header summary{color:#333;margin-bottom:1rem}card-back.has-aside header ui-select .select2 .select2-selection,card-front.has-aside header ui-select .select2 .select2-selection,project-card.has-aside header ui-select .select2 .select2-selection{border-bottom:none}card-back>card-article,card-back>card-section,card-front>card-article,card-front>card-section,project-card>card-article,project-card>card-section{margin-left:16px;margin-right:16px;margin-bottom:12px}card-back>card-footer,card-front>card-footer,project-card>card-footer{margin:auto 0 0}card-back>card-article,card-back>card-footer,card-back>card-row,card-back>card-section,card-front>card-article,card-front>card-footer,card-front>card-row,card-front>card-section,project-card>card-article,project-card>card-footer,project-card>card-row,project-card>card-section{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;line-height:1.4;color:inherit;fill:inherit}project-card-list,project-card-table{display:-webkit-box;display:-ms-flexbox;-webkit-box-direction:normal;max-width:100%;position:relative}card-back>card-article:first-child,card-back>card-footer:first-child,card-back>card-row:first-child,card-back>card-section:first-child,card-front>card-article:first-child,card-front>card-footer:first-child,card-front>card-row:first-child,card-front>card-section:first-child,project-card>card-article:first-child,project-card>card-footer:first-child,project-card>card-row:first-child,project-card>card-section:first-child{padding-top:13px}card-back>card-article>*,card-back>card-footer>*,card-back>card-row>*,card-back>card-section>*,card-front>card-article>*,card-front>card-footer>*,card-front>card-row>*,card-front>card-section>*,project-card>card-article>*,project-card>card-footer>*,project-card>card-row>*,project-card>card-section>*{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}card-back>card-article>footer,card-back>card-footer>footer,card-back>card-row>footer,card-back>card-section>footer,card-front>card-article>footer,card-front>card-footer>footer,card-front>card-row>footer,card-front>card-section>footer,project-card>card-article>footer,project-card>card-footer>footer,project-card>card-row>footer,project-card>card-section>footer{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;padding-top:6.5px;margin-bottom:12px}card-back>card-article>footer.button-group,card-back>card-footer>footer.button-group,card-back>card-row>footer.button-group,card-back>card-section>footer.button-group,card-front>card-article>footer.button-group,card-front>card-footer>footer.button-group,card-front>card-row>footer.button-group,card-front>card-section>footer.button-group,project-card>card-article>footer.button-group,project-card>card-footer>footer.button-group,project-card>card-row>footer.button-group,project-card>card-section>footer.button-group{margin-bottom:6px;margin-left:6px;margin-right:6px}card-back>card-article button *,card-back>card-footer button *,card-back>card-row button *,card-back>card-section button *,card-front>card-article button *,card-front>card-footer button *,card-front>card-row button *,card-front>card-section button *,project-card>card-article button *,project-card>card-footer button *,project-card>card-row button *,project-card>card-section button *{pointer-events:none!important}project-card{background-color:#fff;border-radius:12px;border:1px solid #E0E0E0;box-shadow:0 10px 20px -5px rgba(0,0,0,.2);-webkit-transform-style:preserve-3d;transform-style:preserve-3d}project-card backdrop{border-radius:inherit}project-card-list{-webkit-perspective:800;perspective:800;-webkit-perspective-origin:top;perspective-origin:top;-webkit-box-flex:1;-ms-flex:1;flex:1;display:flex;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-backface-visibility:hidden;backface-visibility:hidden}project-card-table{-webkit-perspective:800;perspective:800;-webkit-box-flex:1;-ms-flex:1;flex:1;display:flex;-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:nowrap;flex-wrap:nowrap}@media screen and (max-width:559px){project-card-list.float project-card:first-of-type,project-card-list.float>backdrop{box-shadow:0 4px 2px -2px rgba(0,0,0,.2),0 3px 2px rgba(0,0,0,.1)}project-card-list.float{-webkit-perspective:800;perspective:800;-webkit-perspective-origin:center;perspective-origin:center;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;position:absolute;top:0;left:0;right:0;bottom:4rem;margin:12px 12px 10%}project-card-list.float>backdrop{background-color:#fff;border-radius:2px;position:absolute;top:0;left:0;right:0;bottom:0}project-card-list.float>backdrop[z=\"1\"]{z-index:1;-webkit-transform:scale(.8) translateY(18%);transform:scale(.8) translateY(18%)}project-card-list.float>backdrop[z=\"2\"]{z-index:2;-webkit-transform:scale(.9) translateY(8%);transform:scale(.9) translateY(8%)}project-card-list.float>backdrop[z=\"3\"]{z-index:3}project-card-list.float project-card{z-index:10;margin:0;min-width:100%;position:absolute;top:0;left:0;right:0;bottom:0}project-card-list.float project-card:last-child{box-shadow:0 4px 20px -2px rgba(0,0,0,.2),0 3px 10px rgba(0,0,0,.1)}}@media screen and (min-width:560px){project-card{max-width:calc(50% - 24px);min-width:calc(50% - 24px);min-height:238px}}@media screen and (min-width:768px){.browser-firefox project-card-list.user-projects,.browser-ie project-card-list.user-projects,.platform-android project-card-list.user-projects,project-card-list.user-projects{overflow-x:hidden;overflow-y:scroll}project-card-list.user-projects{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:absolute;top:0;left:0;right:0;bottom:0}.platform-ios project-card-list.user-projects{overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch;-ms-overflow-style:none}project-card-list.user-projects::-webkit-scrollbar{display:none}project-card-list.user-projects project-card{pointer-events:auto;margin:1rem;max-width:unset;min-width:90%;-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:hidden}project-card-list.user-projects project-card section{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;max-width:100%}project-card-list.user-projects project-card section h5{font-size:12px;color:#757575;font-weight:500;text-transform:uppercase}project-card-list.user-projects project-card section p{text-overflow:ellipsis;max-height:50%;max-width:100%;white-space:nowrap;overflow:hidden}.browser-firefox project-card-list.portal-card-list,.browser-ie project-card-list.portal-card-list,.platform-android project-card-list.portal-card-list,project-card-list.portal-card-list{overflow-y:hidden;overflow-x:scroll}project-card-list.portal-card-list{-ms-flex-wrap:nowrap;flex-wrap:nowrap;position:absolute;top:0;left:0;bottom:0;min-height:340px;max-height:340px;-webkit-box-align:start;-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start}.platform-ios project-card-list.portal-card-list{overflow-y:hidden;overflow-x:scroll;-webkit-overflow-scrolling:touch;-ms-overflow-style:none}project-card-list.portal-card-list::-webkit-scrollbar{display:none}project-card-list.portal-card-list project-card{margin:36px;max-width:100%;min-width:auto;-ms-flex-preferred-size:50%;flex-basis:50%;-ms-flex-item-align:start;align-self:flex-start;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform-origin:center center;transform-origin:center center}project-card-list.project-card-list project-card backdrop,project-card-list.user-projects project-card backdrop{position:absolute;top:0;left:0;right:0;bottom:0;background-color:#fefefe;-webkit-transform-origin:center center;transform-origin:center center;box-shadow:0 10px 20px -5px rgba(0,0,0,.1)}project-card-list.project-card-list project-card backdrop-circle,project-card-list.user-projects project-card backdrop-circle{position:absolute;top:0;left:0;right:0;bottom:0;max-height:340px;max-width:340px;background-color:#4FC3F7;border-radius:100%;-webkit-transform-origin:center center;transform-origin:center center;-webkit-transform:scale(0);transform:scale(0)}}tab-bar,tab-content{-webkit-box-orient:horizontal;-webkit-box-direction:normal}.browser-firefox tag-input span.data-list,.browser-ie tag-input span.data-list,.platform-android tag-input span.data-list,tag-input span.data-list{overflow-x:hidden;overflow-y:scroll}ui-select,ui-select span{display:-webkit-box;display:-ms-flexbox}ui-select{display:flex;position:relative;width:100%;min-width:172px;max-height:48px;min-height:48px;line-height:48px}tab-content,ui-select span.select2-selection,ui-select span.selection{min-width:100%}ui-select span{line-height:inherit;max-height:inherit;position:relative;display:flex}ui-select>span.select2.select2-container{-webkit-box-align:center;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center}ui-select>span.select2.select2-container>span.selection{min-height:100%}ui-select>span.select2.select2-container>span.selection>span.select2-selection.select2-selection--multiple{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}ui-select>span.select2.select2-container>span.selection>span.select2-selection.select2-selection--multiple ul.select2-selection__rendered{padding-left:0;padding-right:0}ui-select>span.select2.select2-container>span.selection>span.select2-selection.select2-selection--multiple ul.select2-selection__rendered li.select2-selection__choice{margin-top:0;margin-right:.5rem;background-color:#eee;color:#03A9F4;border:none;min-height:26px;max-height:32px;line-height:32px;padding:0 1rem 0 .5rem}status-filter select,status-filter select option{color:inherit;text-align:center}ui-select>span.select2.select2-container>span.selection>span.select2-selection.select2-selection--multiple ul.select2-selection__rendered li.select2-selection__choice span.select2-selection__choice__remove{opacity:0}ui-select>span.select2.select2-container>span.selection>span.select2-selection.select2-selection--multiple ul.select2-selection__rendered li.select2-search.select2-search--inline input.select2-search__field{line-height:32px}ui-select>span.select2.select2-container.select2-container--focus>span.selection>span.select2-selection.select2-selection--multiple ul.select2-selection__rendered li.select2-selection__choice{background-color:#eee}ui-select>span.select2.select2-container.select2-container--focus>span.selection>span.select2-selection.select2-selection--multiple ul.select2-selection__rendered li.select2-selection__choice:hover span.select2-selection__choice__remove{opacity:1}ui-select .select2.select2-container{line-height:48px;max-height:inherit;min-height:inherit}ui-select .select2.select2-container input.select2-search__field{line-height:inherit;min-height:inherit;margin-top:0}ui-select .select2.select2-container span.select2-selection,ui-select .select2.select2-container span.selection{line-height:inherit;max-height:inherit;border-top-width:0;border-left-width:0;border-right-width:0;border-radius:0}ui-select>span{-webkit-box-flex:1;-ms-flex:1;flex:1}tab-bar,tab-content,tab-content router-view,tag-input ul.selected-list{display:-webkit-box;display:-ms-flexbox}ui-select input{height:auto!important;margin-bottom:0!important}status-filter{display:block;border-radius:6px;min-height:29px;max-height:29px;color:#03A9F4;font-size:15px;text-align:center;line-height:29px;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;max-width:200px}status-filter select{border-radius:inherit;border:1px solid #E0E0E0;display:block;-webkit-appearance:none;-moz-appearance:none;appearance:none;width:inherit;max-height:inherit;padding:0 0 0 20px;margin:0;outline:0;background-color:transparent}status-filter select:focus{outline:0}switch input[type=checkbox]{-webkit-appearance:none;-moz-appearance:none;-webkit-transition:.4s all;transition:.4s all;margin:0 auto 0 0;display:block;border-radius:50px;background:#fff;box-shadow:inset 0 0 0 2px rgba(0,0,0,.1);width:56px;height:36px;outline:0;cursor:pointer;position:relative;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;-webkit-animation:input 4s;animation:input 4s}switch input[type=checkbox].checked,switch input[type=checkbox]:checked{background:#53D669;box-shadow:inset 0 0 0 15px #53D669;-webkit-transition:250ms all;transition:250ms all}switch input[type=checkbox]::before{content:'';-webkit-transition:.3s all;transition:.3s all;position:absolute;left:2px;top:2px;bottom:2px;right:auto;-webkit-transform:translate(0,0);transform:translate(0,0);display:block;width:32px;height:32px;border-radius:40px;background:#FFF;box-shadow:0 0 12px 0 rgba(0,0,0,.06),0 0 0 0 rgba(0,0,0,.06),0 6px 10px 0 rgba(0,0,0,.15),0 0 2px 0 rgba(0,0,0,.07),0 4px 6px 0 rgba(0,0,0,.06),0 1px 1px 0 rgba(0,0,0,.11);-webkit-animation:button 3s ease-out;animation:button 3s ease-out}switch input[type=checkbox].checked::before,switch input[type=checkbox]:checked::before{-webkit-transform:translate(20px,0);transform:translate(20px,0)}switch input[type=checkbox].red:checked{background:#FF4F2F;box-shadow:inset 0 0 0 15px #FF4F2F}switch input[type=checkbox].orange:checked{background:#FFAC42;box-shadow:inset 0 0 0 15px #FFAC42}switch input[type=checkbox].yellow:checked{background:#FFE842;box-shadow:inset 0 0 0 15px #FFE842}switch input[type=checkbox].green:checked{background:#50DF3D;box-shadow:inset 0 0 0 15px #50DF3D}switch input[type=checkbox].blue:checked{background:#40A7ED;box-shadow:inset 0 0 0 15px #40A7ED}switch input[type=checkbox].purple:checked{background:#AF57EC;box-shadow:inset 0 0 0 15px #AF57EC}tab-bar,tab-bar a,tab-bar a:hover{background-color:#fefefe}tab-bar{display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end;position:absolute;top:0;left:0;right:0;min-height:48px;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)}tab-bar a{line-height:48px;font-size:.75rem;padding:0 1rem}tab-bar a:active{background-color:#e6e6e6}tab-bar a.active{color:#fff;fill:#fff;background-color:#8BC34A}tab-content{display:flex;-ms-flex-direction:row;flex-direction:row;-webkit-box-flex:1;-ms-flex:1;flex:1;min-height:100%;color:#03A9F4}tab-content.pads{padding:1rem}tab-content router-view{position:relative;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1}page-view#login-page footer>button,tag-input ul.selected-list{-ms-flex-direction:row;-webkit-box-direction:normal;-webkit-box-orient:horizontal}tag-input{display:block;position:absolute;top:0;left:0;right:0;min-height:inherit}tag-input ul.selected-list{min-height:inherit;margin:0;position:relative;z-index:2;display:flex;flex-direction:row;list-style:none;-ms-flex-wrap:wrap;flex-wrap:wrap;border-bottom:1px solid #EEE;-webkit-box-align:center;-ms-flex-align:center;align-items:center}tag-input ul.selected-list li.tag__label{margin-right:8px;margin-left:8px;color:#757575;padding:8px;font-size:21px}tag-input ul.selected-list li:not(.tag__label){position:relative;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;padding:0 8px;background-color:#F5F5F5;border-radius:6px;height:32px;line-height:32px;margin-top:4px;margin-right:8px;margin-bottom:4px}tag-input ul.selected-list .tag-input-form{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}tag-input ul.selected-list .tag-input-form>input{pointer-events:auto;margin:0}tag-input ul.selected-list .tag-input-form>input,tag-input ul.selected-list .tag-input-form>input:focus,tag-input ul.selected-list .tag-input-form>input:hover{border:none;outline:0;box-shadow:none}tag-input span.data-list{display:block;position:absolute;top:100%;left:0;right:0;bottom:0;height:auto}.platform-ios tag-input span.data-list{overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch;-ms-overflow-style:none}tag-input span.data-list label{position:relative}tag-input span.data-list span.text{z-index:1;position:relative}tag-input span.data-list label-border{top:0;height:100%;opacity:0;-webkit-transform:scaleX(1);transform:scaleX(1);z-index:0;margin-left:0}tag-input span.data-list input[type=checkbox]{position:absolute;display:block;top:0;left:0;right:0;bottom:0;opacity:0;z-index:2}tag-input span.data-list input[type=checkbox]:focus:not(:checked)~label-border{opacity:1;background-color:#F5F5F5}tag-input span.data-list input[type=checkbox]:checked~label-border{opacity:.8}tag-input span.data-list input[type=checkbox]:checked:focus~label-border{opacity:1}page-view#login-page{-webkit-transform:translateY(0);transform:translateY(0);pointer-events:auto}page-view#login-page header h1{font-size:56px;text-align:center;color:#616161}page-view#login-page footer .footer-text a,page-view#login-page footer .footer-text a:active,page-view#login-page footer .footer-text a:hover,page-view#login-page footer .footer-text a:target,page-view#login-page footer .footer-text a:visited{color:inherit}page-view#login-page footer{text-align:center}page-view#login-page footer .footer-text{display:block;margin:2rem 0}page-view#login-page footer .footer-text input{margin:0 .5rem 0 0}page-view#login-page footer divider{display:block;min-height:2px;max-height:2px;background:-webkit-linear-gradient(left,transparent,#9E9E9E,transparent);background:linear-gradient(90deg,transparent,#9E9E9E,transparent)}page-view#login-page footer>button{display:-webkit-box;display:-ms-flexbox;display:flex;flex-direction:row;max-height:48px;min-width:100%;max-width:100%;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin:1rem auto}page-view#login-page footer>button>icon{margin:0}page-view#login-page footer>button:active,page-view#login-page footer>button:hover{background-color:transparent}page-view#login-page footer>button:focus,page-view#login-page footer>button:hover{opacity:.8}page-view#login-page footer>button:active{opacity:.5}page-view#login-page form{min-width:400px;background-color:rgba(255,255,255,.8);border:1px solid #BDBDBD;border-radius:12px;overflow:hidden;height:auto}page-view#login-page form divider{display:block;min-width:100%;min-height:1px;max-height:1px;background-color:#BDBDBD}page-view#login-page form footer{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}page-view#login-page form label.control{margin:0;padding:0;background-color:transparent}page-view#login-page form label.control label-border{display:none}page-view#login-page form label.control input[type=email],page-view#login-page form label.control input[type=password]{padding:10px 12px;border-radius:6px;-webkit-font-smoothing:antialiased;border:0;font-size:17px;letter-spacing:-.0235em;background:0 0;margin:0}welcome-card,welcome-card card-background{background-size:cover;background-repeat:no-repeat}page-view#login-page form label.control input[type=email]{border-bottom-left-radius:0;border-bottom-right-radius:0;margin:0}page-view#login-page form label.control input[type=password]{border-top-left-radius:0;border-top-right-radius:0}page-view#login-page form label.control button{position:absolute;top:0;right:0;bottom:0;background-color:transparent;border:transparent;height:auto;width:auto;margin:0;padding:0}page-view#login-page form label.control button:active,page-view#login-page form label.control button:hover{background-color:transparent}page-view#login-page form label.control icon{position:absolute;top:0;right:0;bottom:0;height:auto;padding:10px 12px}page-view#login-page form label.control.select-label{height:56px;position:relative;cursor:pointer}page-view#login-page form label.control.select-label>span.text{z-index:1;line-height:56px;font-size:21px}page-view#login-page form label.control.select-label>label-border{display:block;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.38);-webkit-transform:scaleX(1);transform:scaleX(1);height:100%;margin:0;opacity:0}page-view#login-page form label.control.select-label>input{z-index:2;opacity:0;min-width:100%;display:block;position:absolute;top:0;left:0;right:0;bottom:0}section#inbox-page,section#inbox-page aside.message-chat{display:-webkit-box;display:-ms-flexbox;-webkit-box-direction:normal}page-view#login-page form label.control.select-label>input[type=checkbox]:checked~label-border,page-view#login-page form label.control.select-label>input[type=radio]:checked~label-border{opacity:.3}section#inbox-page{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:flex;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row}section#inbox-page aside{-webkit-box-flex:1;-ms-flex:1;flex:1}section#inbox-page aside#aside-room-list{max-width:300px;width:300px}section#inbox-page aside.message-chat{position:relative;background-color:#fff;display:flex;-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;min-height:100%;border-left:1px solid #D7D7D7}section#inbox-page aside.message-chat>header{position:absolute;top:0;left:0;right:0;max-height:100%;min-height:50px;line-height:50px}section#inbox-page aside.message-chat>footer{background-color:#F5F5F5}section#inbox-page aside.message-chat>footer form{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;position:relative}section#inbox-page aside.message-chat>footer action{position:absolute;right:0;top:0;z-index:2}section#inbox-page aside.message-chat>footer label{margin:8px 48px 8px 8px;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto}section#inbox-page aside.message-chat>footer label label-border{display:none}section#inbox-page aside.message-chat>footer textarea{resize:none;background-color:#EEE;padding-right:48px}section#inbox-page aside.message-chat>footer textarea,section#inbox-page aside.message-chat>footer textarea:focus{border:none;outline:0;box-shadow:none}section#inbox-page ul.room-list{list-style:none;margin:0;overflow:hidden}section#inbox-page ul.room-list li{display:-webkit-box;display:-ms-flexbox;display:flex;min-height:56px;line-height:24px;max-height:56px;position:relative;box-shadow:inset 0 1px 0 #FFF,inset 0 -1px #E7E7E7}section#inbox-page ul.room-list li>.remove-icon{position:absolute;top:0;left:0;bottom:0;opacity:0;z-index:1;color:#F44336}section#inbox-page ul.room-list li .item__content{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1;z-index:2}section#inbox-page ul.room-list li .item__content>h4{font-size:17px;margin:0;padding-left:1rem}section#inbox-page ul.room-list li .item__content>a{font-size:14px;padding-left:1rem}section#inbox-page ul.room-list li .item__content>icon.caret{position:absolute;top:0;right:0;bottom:0}section#inbox-page ul.room-list li.active{z-index:2;background-color:#D8EEFA;box-shadow:0 1px 0 #B6DEF5,0 -1px #B6DEF5}section#inbox-page ul.room-list.edit-mode li .item__content{-webkit-transform:translateX(48px);transform:translateX(48px)}section#inbox-page ul.room-list.edit-mode li .remove-icon{opacity:1}project-card card-footer{z-index:1}project-card card-icon{z-index:2}project-card card-article,project-card card-header,project-card card-section{z-index:3}project-card card-section{pointer-events:none;position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1}project-card fab.card-toggle-flip{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:absolute;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;right:0;-webkit-box-align:center;-ms-flex-align:center;align-items:center;min-height:80px;max-height:80px;min-width:80px;max-width:80px;margin-right:80px;pointer-events:auto}project-card fab.card-toggle-flip:after,project-card fab.card-toggle-flip:before,project-card icon.card__backdrop{display:block;position:absolute;right:0;bottom:0;top:0;left:0}project-card fab.card-toggle-flip>*{pointer-events:none}project-card fab.card-toggle-flip .fab__text{color:#03A9F4}project-card fab.card-toggle-flip:before{content:\" \";border:1px solid #03A9F4;border-radius:100%;min-height:inherit;max-height:inherit;min-width:inherit;max-width:inherit}project-card fab.card-toggle-flip:after{content:\" \";border:1px solid #03A9F4;border-radius:100%;min-height:200%;max-height:200%;min-width:200%;max-width:200%;opacity:.3;-webkit-transform:translate3d(-25%,-25%,0);transform:translate3d(-25%,-25%,0)}project-card fab.card-toggle-flip:active .fab__text{color:#8BC34A}project-card fab.card-toggle-flip:active:after,project-card fab.card-toggle-flip:active:before{border-color:#8BC34A}project-card icon.card__backdrop{pointer-events:none;z-index:0;padding:0;width:100%;height:100%;overflow:hidden}#user-profile,#user-reviews{-webkit-box-orient:vertical;padding:1rem;-webkit-box-direction:normal}#portal-home>section>p,#project-members>h5,#project-overview>h5,#project-profile>h5{padding-left:1rem}project-card icon.card__backdrop svg{height:200%;width:200%;fill:rgba(230,230,230,.7);-webkit-transform:translate3d(-45%,-22%,0);transform:translate3d(-45%,-22%,0)}project-card card-back icon.card__backdrop svg{-webkit-transform:translate3d(-6%,-22%,0);transform:translate3d(-6%,-22%,0)}project-card card-backdrop{display:none}@media (min-width:768px){project-card card-backdrop{display:block;position:absolute;left:0;right:0;background-color:#03A9F4;-webkit-transform:scale(0);transform:scale(0)}project-card fab.card-toggle-flip:after{display:none}}#user-profile{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}#user-profile>header{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:1rem}#user-profile>header>aside{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;height:100px;width:100px;min-height:100px;min-width:100px;max-height:100px;max-width:100px;margin:0 1rem 0 0}#user-profile>header>aside>picture{display:block;border-radius:100%;overflow:hidden;width:inherit;height:inherit;min-width:inherit;min-height:inherit;box-shadow:0 10px 20px -5px rgba(0,0,0,.2)}#project-members,#project-overview,#project-profile,.browser-firefox #project-members,.browser-firefox #project-overview,.browser-firefox #project-profile,.browser-ie #project-members,.browser-ie #project-overview,.browser-ie #project-profile,.platform-android #project-members,.platform-android #project-overview,.platform-android #project-profile{overflow-x:hidden;overflow-y:scroll}#user-profile>header>h3{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}#user-profile>header>h3 summary{margin:.2rem;font-size:16px;font-weight:500;color:#757575}#user-reviews{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}#user-reviews blockquote{color:#616161}#user-reviews blockquote h4{color:#424242}#user-reviews blockquote h4 summary{font-size:18px;font-weight:500;color:#616161}#user-reviews blockquote>rating{display:block;margin:0 0 .5rem;color:#FFC107}#user-reviews blockquote>rating>span.value{font-size:12px;color:#64B5F6}#portal-home>section{padding-top:1rem}#portal-home>section>ul{margin-left:2rem;list-style:none}#portal-home>section>ul>li>a{color:#4FC3F7;font-size:17px;line-height:32px}#project-members,#project-overview,#project-profile{position:absolute;top:0;left:0;right:0;bottom:0;padding-top:1rem}.platform-ios #project-members,.platform-ios #project-overview,.platform-ios #project-profile{overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch;-ms-overflow-style:none}#project-members>header,#project-overview>header,#project-profile>header{margin-bottom:1rem}#project-members>header>h3,#project-overview>header>h3,#project-profile>header>h3{padding-left:1rem;color:#03A9F4}#project-members>article,#project-overview>article,#project-profile>article{padding:0 1rem}#project-members>article textarea,#project-overview>article textarea,#project-profile>article textarea{height:auto;padding:2px auto;overflow:hidden;resize:none}.browser-firefox section#public-project-profile,.browser-ie section#public-project-profile,.platform-android section#public-project-profile,section#public-project-profile{overflow-x:hidden;overflow-y:scroll}#project-members fieldset>legend,#project-overview fieldset>legend,#project-profile fieldset>legend{min-width:100%;margin:1rem 0;font-weight:500;color:#03A9F4}#project-members fieldset>legend button.remove-field,#project-overview fieldset>legend button.remove-field,#project-profile fieldset>legend button.remove-field{float:right;font-size:14px;color:#9C27B0;opacity:0}#project-members fieldset:hover>legend>button.remove-field,#project-overview fieldset:hover>legend>button.remove-field,#project-profile fieldset:hover>legend>button.remove-field{opacity:1}#project-members fieldset>label,#project-overview fieldset>label,#project-profile fieldset>label{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}#project-members fieldset>label icon,#project-overview fieldset>label icon,#project-profile fieldset>label icon{color:inherit;cursor:pointer;-webkit-transform-origin:center center;transform-origin:center center;-webkit-transition:all .1s ease-out 0s;transition:all .1s ease-out 0s;will-change:transform,opacity;margin-right:72px}#project-members fieldset>label icon.remove,#project-overview fieldset>label icon.remove,#project-profile fieldset>label icon.remove{opacity:.3;-webkit-transform:scale(.7);transform:scale(.7)}#project-members fieldset>label icon.remove:hover,#project-overview fieldset>label icon.remove:hover,#project-profile fieldset>label icon.remove:hover{opacity:1;color:#F44336;-webkit-transform:scale(1);transform:scale(1)}#project-members fieldset>label>textarea,#project-overview fieldset>label>textarea,#project-profile fieldset>label>textarea{margin-bottom:0}#project-members fieldset>label.field-point>textarea,#project-overview fieldset>label.field-point>textarea,#project-profile fieldset>label.field-point>textarea{padding-top:8px}#project-members fieldset>label.field-summary>span.text,#project-overview fieldset>label.field-summary>span.text,#project-profile fieldset>label.field-summary>span.text{line-height:28.8px}#project-members fieldset>label>span.text,#project-overview fieldset>label>span.text,#project-profile fieldset>label>span.text{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;min-width:120px}#project-members fieldset>label>.new-point,#project-overview fieldset>label>.new-point,#project-profile fieldset>label>.new-point{font-size:14px;color:#03A9F4;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;display:-webkit-box;display:-ms-flexbox;display:flex;padding-left:8px;cursor:pointer}#project-members fieldset>label.add-point:hover,#project-members fieldset>label>.new-point:hover,#project-overview fieldset>label.add-point:hover,#project-overview fieldset>label>.new-point:hover,#project-profile fieldset>label.add-point:hover,#project-profile fieldset>label>.new-point:hover{color:#8BC34A}#project-members fieldset>label>.new-point>icon,#project-overview fieldset>label>.new-point>icon,#project-profile fieldset>label>.new-point>icon{-webkit-transform:translateY(-12px);transform:translateY(-12px)}#project-members fieldset>label.add-point,#project-overview fieldset>label.add-point,#project-profile fieldset>label.add-point{cursor:pointer}#project-members fieldset>label.add-point>span.text,#project-overview fieldset>label.add-point>span.text,#project-profile fieldset>label.add-point>span.text{opacity:0}form#project-form footer,form#user-settings footer{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}@media screen and (min-width:768px){form#project-form,form#user-settings{padding:0 2rem}}#investor-portal header.search-bar{position:absolute;top:0;left:0;right:0;z-index:12;min-height:2rem}#investor-portal header.search-bar+*{margin-top:2rem;padding-top:1rem}#investor-portal header.search-bar>input{border:none;padding-left:2rem;box-shadow:0 5px 5px -3px rgba(0,0,0,.2)}.platform-ios section#public-project-profile{overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch;-ms-overflow-style:none}section#public-project-profile>header{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin-bottom:1rem}section#public-project-profile>header h2{text-align:center;margin:2rem 0}section#public-project-profile>header>button-group{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;overflow:hidden;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;margin:0 auto}section#public-project-profile>header>button-group>button{border-radius:6px;min-width:160px;max-width:160px;min-height:29px;line-height:29px;font-size:14px;background-color:transparent;border:1px solid #03A9F4;color:#03A9F4}section#public-project-profile>header>button-group>button:focus{background-color:transparent}section#public-project-profile>header>button-group>button:hover{background-color:#E1F5FE}section#public-project-profile>header>button-group>button:active{background-color:#B3E5FC}section#public-project-profile>header>button-group>button:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0;border-right:none}section#public-project-profile>header>button-group>button:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}section#public-project-profile>article{padding:0 2rem}section#public-project-profile>article>blockquote{margin-left:-1rem;padding-left:1rem}page-view#welcome,section.card__row{-webkit-box-direction:normal;padding:0}section#public-project-profile>article>p{text-indent:20px}router-view{position:relative}page-view#welcome{margin-left:auto;margin-right:auto;position:absolute;top:0;left:0;right:0;bottom:0;-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;max-width:1200px}section.card__row,welcome-card{display:-webkit-box;display:-ms-flexbox;-webkit-box-flex:1;position:relative}section.card__row{-ms-flex:1 0 auto;flex:1 0 auto;display:flex;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row}welcome-card{display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:0;flex-shrink:0;-ms-flex-preferred-size:auto;flex-basis:auto;max-width:50%;max-height:50%;min-height:50%;min-width:50%;-webkit-transform-origin:center center;transform-origin:center center;-webkit-transition:-webkit-transform .2s cubic-bezier(.25,.8,.25,1) 0s;transition:-webkit-transform .2s cubic-bezier(.25,.8,.25,1) 0s;transition:transform .2s cubic-bezier(.25,.8,.25,1) 0s;transition:transform .2s cubic-bezier(.25,.8,.25,1) 0s,-webkit-transform .2s cubic-bezier(.25,.8,.25,1) 0s;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-backface-visibility:none;backface-visibility:none}welcome-card>card-content{display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;-webkit-transform-origin:center center;transform-origin:center center;will-change:transform;max-width:80%;margin:auto}welcome-card card-background{display:block;background-position:center center;position:relative;top:0;left:0;right:0;width:100%;-webkit-transition:box-shadow .2s ease-out 0s;transition:box-shadow .2s ease-out 0s;box-shadow:0 12px 12px -6px rgba(0,0,0,.2),0 12px 20px -6px rgba(0,0,0,.3);border-radius:12px;overflow:hidden}welcome-card card-background .blur-background,welcome-card card-background .content,welcome-card card-background .main-background,welcome-card card-background .shine{border-radius:inherit;overflow:hidden;display:block;background-size:cover;background-repeat:no-repeat;background-position:center center;position:absolute;top:0;left:0;right:0;width:100%;-webkit-backface-visibility:hidden;backface-visibility:hidden}welcome-card card-background .blur-background,welcome-card card-background .main-background{height:inherit;-webkit-transition:all .2s ease-out 0s;transition:all .2s ease-out 0s}welcome-card card-background .main-background{z-index:1;padding:inherit}welcome-card card-background .blur-background{z-index:2;padding:0;opacity:0;overflow:hidden!important;border-radius:inherit;-webkit-filter:blur(5px);filter:blur(5px)}welcome-card card-background .shine{-webkit-transition:background .2s ease-out 0s;transition:background .2s ease-out 0s;bottom:0;background:-webkit-radial-gradient(50% 50%,1000px,rgba(255,255,255,.25),transparent);background:radial-gradient(1000px at 50% 50%,rgba(255,255,255,.25),transparent);z-index:10}welcome-card card-background .content{bottom:0;z-index:6}welcome-card card-background div[class*=layer-]{position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;background-size:100% auto;background-repeat:no-repeat;background-position:0 0;border-radius:5px}welcome-card picture{display:block;height:auto;min-width:100%;text-align:center}welcome-card header{padding:1rem;text-align:center;color:#e6e6e6;-webkit-transition:opacity .2s cubic-bezier(.25,.8,.25,1) 0s;transition:opacity .2s cubic-bezier(.25,.8,.25,1) 0s}welcome-card header h2{margin:0;line-height:1}welcome-card header p{opacity:0;-webkit-transition:opacity .2s cubic-bezier(.25,.8,.25,1) 0s;transition:opacity .2s cubic-bezier(.25,.8,.25,1) 0s}welcome-card:hover card-background{box-shadow:0 24px 24px -10px rgba(0,0,0,.25),0 12px 20px -6px rgba(0,0,0,.3)}welcome-card:hover .blur-background,welcome-card:hover .content header p{opacity:1}welcome-card:active card-background{box-shadow:0 6px 6px -3px rgba(0,0,0,.19),0 12px 20px -6px rgba(0,0,0,.3)!important}welcome-card>card-content>card-background,welcome-card>card-content>card-background .blur-background,welcome-card>card-content>card-background .main-background{height:0;padding-bottom:56.25%}@media screen and (min-width:768px){welcome-card header h2{margin:0 0 1rem;line-height:1.4}welcome-card header p{font-size:18px}}@media screen and (min-width:480px) and (max-width:700px){welcome-card>card-content>card-background .blur-background,welcome-card>card-content>card-background .main-background{padding-bottom:75%}}.row{max-width:100%}"; });
define('text!styles/base.css', ['module'], function(module) { module.exports = "@charset \"UTF-8\";/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */button,img,legend{border:0}body,button,legend{padding:0}h1,h2,h3,h4,h5,h6,p{text-rendering:optimizeLegibility}.input-group,[type=file],select{width:100%}button,select{-moz-appearance:none;-webkit-appearance:none}img,select[multiple],textarea[rows]{height:auto}.slider,html.is-reveal-open,html.is-reveal-open body{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.breadcrumbs::after,.button-group::after,.off-canvas-wrapper-inner::after,.pagination::after,.tabs::after,hr{clear:both}html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,optgroup,strong{font-weight:700}dfn{font-style:italic}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}.orbit-caption,.sticky.is-anchored.is-at-bottom,.sticky.is-stuck.is-at-bottom{bottom:0}img{max-width:100%;-ms-interpolation-mode:bicubic;display:inline-block;vertical-align:middle}svg:not(:root){overflow:hidden}figure{margin:1em 40px}pre,textarea{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}a,b,em,i,small,strong{line-height:inherit}dl,ol,p,ul{line-height:1.6}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:not-allowed}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}.foundation-mq{font-family:\"small=0em&medium=40em&large=64em&xlarge=75em&xxlarge=90em\"}body,h1,h2,h3,h4,h5,h6{font-family:Ubuntu,sans-serif,Roboto,Arial;font-weight:400}html{font-size:100%;box-sizing:border-box}*,::after,::before{box-sizing:inherit}body{margin:0;line-height:1.5;color:#0a0a0a;background:#e6e6e6;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}#map_canvas embed,#map_canvas img,#map_canvas object,.map_canvas embed,.map_canvas img,.map_canvas object,.mqa-display embed,.mqa-display img,.mqa-display object{max-width:none!important}button{overflow:visible;background:0 0;border-radius:0;line-height:1}[data-whatinput=mouse] button{outline:0}.is-visible{display:block!important}.is-hidden{display:none!important}.input-group,.row{display:-webkit-box;display:-ms-flexbox}.row{max-width:75rem;margin-left:auto;margin-right:auto;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap}.row .row,.row.expanded{max-width:none}.row .row{margin-left:-.625rem;margin-right:-.625rem}.row.collapse>.column,.row.collapse>.columns{padding-left:0;padding-right:0}.column,.columns{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0px;padding-left:.625rem;padding-right:.625rem;min-width:initial}@media screen and (min-width:40em){.row .row{margin-left:-.9375rem;margin-right:-.9375rem}.column,.columns{padding-left:.9375rem;padding-right:.9375rem}}.column.row.row,.row.row.columns{float:none;display:block}.row .column.row.row,.row .row.row.columns{padding-left:0;padding-right:0;margin-left:0;margin-right:0}.small-1{-webkit-box-flex:0;-ms-flex:0 0 8.33333%;flex:0 0 8.33333%;max-width:8.33333%}.small-2,.small-3{-webkit-box-flex:0}.small-offset-0{margin-left:0}.small-2{-ms-flex:0 0 16.66667%;flex:0 0 16.66667%;max-width:16.66667%}.small-offset-1{margin-left:8.33333%}.small-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.small-4,.small-5{-webkit-box-flex:0}.small-offset-2{margin-left:16.66667%}.small-4{-ms-flex:0 0 33.33333%;flex:0 0 33.33333%;max-width:33.33333%}.small-offset-3{margin-left:25%}.small-5{-ms-flex:0 0 41.66667%;flex:0 0 41.66667%;max-width:41.66667%}.small-6,.small-7{-webkit-box-flex:0}.small-offset-4{margin-left:33.33333%}.small-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.small-offset-5{margin-left:41.66667%}.small-7{-ms-flex:0 0 58.33333%;flex:0 0 58.33333%;max-width:58.33333%}.small-8,.small-9{-webkit-box-flex:0}.small-offset-6{margin-left:50%}.small-8{-ms-flex:0 0 66.66667%;flex:0 0 66.66667%;max-width:66.66667%}.small-offset-7{margin-left:58.33333%}.small-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.small-offset-8{margin-left:66.66667%}.small-10{-webkit-box-flex:0;-ms-flex:0 0 83.33333%;flex:0 0 83.33333%;max-width:83.33333%}.small-offset-9{margin-left:75%}.small-11{-webkit-box-flex:0;-ms-flex:0 0 91.66667%;flex:0 0 91.66667%;max-width:91.66667%}.small-offset-10{margin-left:83.33333%}.small-12{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.small-offset-11{margin-left:91.66667%}.small-up-1{-ms-flex-wrap:wrap;flex-wrap:wrap}.small-up-1>.column,.small-up-1>.columns{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.small-up-2{-ms-flex-wrap:wrap;flex-wrap:wrap}.small-up-2>.column,.small-up-2>.columns{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.small-up-3{-ms-flex-wrap:wrap;flex-wrap:wrap}.small-up-3>.column,.small-up-3>.columns{-webkit-box-flex:0;-ms-flex:0 0 33.33333%;flex:0 0 33.33333%;max-width:33.33333%}.small-up-4{-ms-flex-wrap:wrap;flex-wrap:wrap}.small-up-4>.column,.small-up-4>.columns{-webkit-box-flex:0;-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.small-up-5{-ms-flex-wrap:wrap;flex-wrap:wrap}.small-up-5>.column,.small-up-5>.columns{-webkit-box-flex:0;-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.small-up-6{-ms-flex-wrap:wrap;flex-wrap:wrap}.small-up-6>.column,.small-up-6>.columns{-webkit-box-flex:0;-ms-flex:0 0 16.66667%;flex:0 0 16.66667%;max-width:16.66667%}.small-up-7{-ms-flex-wrap:wrap;flex-wrap:wrap}.small-up-7>.column,.small-up-7>.columns{-webkit-box-flex:0;-ms-flex:0 0 14.28571%;flex:0 0 14.28571%;max-width:14.28571%}.small-up-8{-ms-flex-wrap:wrap;flex-wrap:wrap}.small-up-8>.column,.small-up-8>.columns{-webkit-box-flex:0;-ms-flex:0 0 12.5%;flex:0 0 12.5%;max-width:12.5%}.small-collapse>.column,.small-collapse>.columns{padding-left:0;padding-right:0}.small-uncollapse>.column,.small-uncollapse>.columns{padding-left:.625rem;padding-right:.625rem}@media screen and (min-width:40em){.medium-1{-webkit-box-flex:0;-ms-flex:0 0 8.33333%;flex:0 0 8.33333%;max-width:8.33333%}.medium-offset-0{margin-left:0}.medium-2{-webkit-box-flex:0;-ms-flex:0 0 16.66667%;flex:0 0 16.66667%;max-width:16.66667%}.medium-offset-1{margin-left:8.33333%}.medium-3{-webkit-box-flex:0;-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.medium-offset-2{margin-left:16.66667%}.medium-4{-webkit-box-flex:0;-ms-flex:0 0 33.33333%;flex:0 0 33.33333%;max-width:33.33333%}.medium-offset-3{margin-left:25%}.medium-5{-webkit-box-flex:0;-ms-flex:0 0 41.66667%;flex:0 0 41.66667%;max-width:41.66667%}.medium-offset-4{margin-left:33.33333%}.medium-6{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.medium-offset-5{margin-left:41.66667%}.medium-7{-webkit-box-flex:0;-ms-flex:0 0 58.33333%;flex:0 0 58.33333%;max-width:58.33333%}.medium-offset-6{margin-left:50%}.medium-8{-webkit-box-flex:0;-ms-flex:0 0 66.66667%;flex:0 0 66.66667%;max-width:66.66667%}.medium-offset-7{margin-left:58.33333%}.medium-9{-webkit-box-flex:0;-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.medium-offset-8{margin-left:66.66667%}.medium-10{-webkit-box-flex:0;-ms-flex:0 0 83.33333%;flex:0 0 83.33333%;max-width:83.33333%}.medium-offset-9{margin-left:75%}.medium-11{-webkit-box-flex:0;-ms-flex:0 0 91.66667%;flex:0 0 91.66667%;max-width:91.66667%}.medium-offset-10{margin-left:83.33333%}.medium-12{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.medium-offset-11{margin-left:91.66667%}.medium-order-1{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.medium-order-2{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}.medium-order-3{-webkit-box-ordinal-group:4;-ms-flex-order:3;order:3}.medium-order-4{-webkit-box-ordinal-group:5;-ms-flex-order:4;order:4}.medium-order-5{-webkit-box-ordinal-group:6;-ms-flex-order:5;order:5}.medium-order-6{-webkit-box-ordinal-group:7;-ms-flex-order:6;order:6}.medium-up-1{-ms-flex-wrap:wrap;flex-wrap:wrap}.medium-up-1>.column,.medium-up-1>.columns{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.medium-up-2{-ms-flex-wrap:wrap;flex-wrap:wrap}.medium-up-2>.column,.medium-up-2>.columns{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.medium-up-3{-ms-flex-wrap:wrap;flex-wrap:wrap}.medium-up-3>.column,.medium-up-3>.columns{-webkit-box-flex:0;-ms-flex:0 0 33.33333%;flex:0 0 33.33333%;max-width:33.33333%}.medium-up-4{-ms-flex-wrap:wrap;flex-wrap:wrap}.medium-up-4>.column,.medium-up-4>.columns{-webkit-box-flex:0;-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.medium-up-5{-ms-flex-wrap:wrap;flex-wrap:wrap}.medium-up-5>.column,.medium-up-5>.columns{-webkit-box-flex:0;-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.medium-up-6{-ms-flex-wrap:wrap;flex-wrap:wrap}.medium-up-6>.column,.medium-up-6>.columns{-webkit-box-flex:0;-ms-flex:0 0 16.66667%;flex:0 0 16.66667%;max-width:16.66667%}.medium-up-7{-ms-flex-wrap:wrap;flex-wrap:wrap}.medium-up-7>.column,.medium-up-7>.columns{-webkit-box-flex:0;-ms-flex:0 0 14.28571%;flex:0 0 14.28571%;max-width:14.28571%}.medium-up-8{-ms-flex-wrap:wrap;flex-wrap:wrap}.medium-up-8>.column,.medium-up-8>.columns{-webkit-box-flex:0;-ms-flex:0 0 12.5%;flex:0 0 12.5%;max-width:12.5%}}@media screen and (min-width:40em) and (min-width:40em){.medium-expand{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0px}}.row.medium-unstack>.column,.row.medium-unstack>.columns{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%}@media screen and (min-width:40em){.row.medium-unstack>.column,.row.medium-unstack>.columns{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0px}.medium-collapse>.column,.medium-collapse>.columns{padding-left:0;padding-right:0}.medium-uncollapse>.column,.medium-uncollapse>.columns{padding-left:.9375rem;padding-right:.9375rem}}@media screen and (min-width:64em){.large-1{-webkit-box-flex:0;-ms-flex:0 0 8.33333%;flex:0 0 8.33333%;max-width:8.33333%}.large-2,.large-3{-webkit-box-flex:0}.large-offset-0{margin-left:0}.large-2{-ms-flex:0 0 16.66667%;flex:0 0 16.66667%;max-width:16.66667%}.large-offset-1{margin-left:8.33333%}.large-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.large-4,.large-5{-webkit-box-flex:0}.large-offset-2{margin-left:16.66667%}.large-4{-ms-flex:0 0 33.33333%;flex:0 0 33.33333%;max-width:33.33333%}.large-offset-3{margin-left:25%}.large-5{-ms-flex:0 0 41.66667%;flex:0 0 41.66667%;max-width:41.66667%}.large-6,.large-7{-webkit-box-flex:0}.large-offset-4{margin-left:33.33333%}.large-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.large-offset-5{margin-left:41.66667%}.large-7{-ms-flex:0 0 58.33333%;flex:0 0 58.33333%;max-width:58.33333%}.large-8,.large-9{-webkit-box-flex:0}.large-offset-6{margin-left:50%}.large-8{-ms-flex:0 0 66.66667%;flex:0 0 66.66667%;max-width:66.66667%}.large-offset-7{margin-left:58.33333%}.large-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.large-offset-8{margin-left:66.66667%}.large-10{-webkit-box-flex:0;-ms-flex:0 0 83.33333%;flex:0 0 83.33333%;max-width:83.33333%}.large-offset-9{margin-left:75%}.large-11{-webkit-box-flex:0;-ms-flex:0 0 91.66667%;flex:0 0 91.66667%;max-width:91.66667%}.large-offset-10{margin-left:83.33333%}.large-12{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.large-offset-11{margin-left:91.66667%}.large-order-1{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.large-order-2{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}.large-order-3{-webkit-box-ordinal-group:4;-ms-flex-order:3;order:3}.large-order-4{-webkit-box-ordinal-group:5;-ms-flex-order:4;order:4}.large-order-5{-webkit-box-ordinal-group:6;-ms-flex-order:5;order:5}.large-order-6{-webkit-box-ordinal-group:7;-ms-flex-order:6;order:6}.large-up-1{-ms-flex-wrap:wrap;flex-wrap:wrap}.large-up-1>.column,.large-up-1>.columns{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.large-up-2{-ms-flex-wrap:wrap;flex-wrap:wrap}.large-up-2>.column,.large-up-2>.columns{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.large-up-3{-ms-flex-wrap:wrap;flex-wrap:wrap}.large-up-3>.column,.large-up-3>.columns{-webkit-box-flex:0;-ms-flex:0 0 33.33333%;flex:0 0 33.33333%;max-width:33.33333%}.large-up-4{-ms-flex-wrap:wrap;flex-wrap:wrap}.large-up-4>.column,.large-up-4>.columns{-webkit-box-flex:0;-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.large-up-5{-ms-flex-wrap:wrap;flex-wrap:wrap}.large-up-5>.column,.large-up-5>.columns{-webkit-box-flex:0;-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.large-up-6{-ms-flex-wrap:wrap;flex-wrap:wrap}.large-up-6>.column,.large-up-6>.columns{-webkit-box-flex:0;-ms-flex:0 0 16.66667%;flex:0 0 16.66667%;max-width:16.66667%}.large-up-7{-ms-flex-wrap:wrap;flex-wrap:wrap}.large-up-7>.column,.large-up-7>.columns{-webkit-box-flex:0;-ms-flex:0 0 14.28571%;flex:0 0 14.28571%;max-width:14.28571%}.large-up-8{-ms-flex-wrap:wrap;flex-wrap:wrap}.large-up-8>.column,.large-up-8>.columns{-webkit-box-flex:0;-ms-flex:0 0 12.5%;flex:0 0 12.5%;max-width:12.5%}}@media screen and (min-width:64em) and (min-width:64em){.large-expand{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0px}}.row.large-unstack>.column,.row.large-unstack>.columns{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%}@media screen and (min-width:64em){.row.large-unstack>.column,.row.large-unstack>.columns{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0px}.large-collapse>.column,.large-collapse>.columns{padding-left:0;padding-right:0}.large-uncollapse>.column,.large-uncollapse>.columns{padding-left:.9375rem;padding-right:.9375rem}}.shrink{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;max-width:100%}.align-top.columns,.column.align-top{-ms-flex-item-align:start;align-self:flex-start}.align-bottom.columns,.column.align-bottom{-ms-flex-item-align:end;align-self:flex-end}.align-middle.columns,.column.align-middle{-ms-flex-item-align:center;align-self:center}.align-stretch.columns,.column.align-stretch{-ms-flex-item-align:stretch;align-self:stretch}blockquote,dd,div,dl,dt,form,h1,h2,h3,h4,h5,h6,li,ol,p,pre,td,th,ul{margin:0;padding:0}ol,ul{margin-left:1.25rem}dl,ol,p,ul{margin-bottom:1rem}p{font-size:inherit}em,i{font-style:italic}h1,h2,h3,h4,h5,h6{font-style:normal;color:inherit;margin-top:0;margin-bottom:.5rem;line-height:1.4}code,kbd{color:#0a0a0a;font-family:Consolas,\"Liberation Mono\",Courier,monospace;background-color:#e6e6e6}h1 small,h2 small,h3 small,h4 small,h5 small,h6 small{color:#cacaca;line-height:0}h1{font-size:1.5rem}h2{font-size:1.25rem}h3{font-size:1.1875rem}h4{font-size:1.125rem}h5{font-size:1.0625rem}h6{font-size:1rem}@media screen and (min-width:40em){h1{font-size:3rem}h2{font-size:2.5rem}h3{font-size:1.9375rem}h4{font-size:1.5625rem}h5{font-size:1.25rem}h6{font-size:1rem}}a{background-color:transparent;color:#03A9F4;text-decoration:none;cursor:pointer}a:focus,a:hover{color:#0391d2}a img{border:0}hr{box-sizing:content-box;max-width:75rem;height:0;border-right:0;border-top:0;border-bottom:1px solid #9bae5a;border-left:0;margin:1.25rem auto}dl,ol,ul{list-style-position:outside}li{font-size:inherit}ul{list-style-type:disc}.accordion,.menu,.tabs{list-style-type:none}ol ol,ol ul,ul ol,ul ul{margin-left:1.25rem;margin-bottom:0}dl dt{margin-bottom:.3rem;font-weight:700}.subheader,code,label{font-weight:400}blockquote{margin:0 0 1rem;padding:.5625rem 1.25rem 0 1.1875rem;border-left:1px solid #cacaca}blockquote,blockquote p{line-height:1.6;color:#8a8a8a}cite{display:block;font-size:.8125rem;color:#8a8a8a}cite:before{content:'\\2014 \\0020'}abbr{color:#0a0a0a;cursor:help;border-bottom:1px dotted #0a0a0a}code{border:1px solid #cacaca;padding:.125rem .3125rem .0625rem}kbd{padding:.125rem .25rem 0;margin:0}.subheader{margin-top:.2rem;margin-bottom:.5rem;line-height:1.4;color:#8a8a8a}.lead{font-size:125%;line-height:1.6}.stat{font-size:2.5rem;line-height:1}p+.stat{margin-top:-1rem}.no-bullet{margin-left:0;list-style:none}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}.text-justify{text-align:justify}@media screen and (min-width:40em){.medium-text-left{text-align:left}.medium-text-right{text-align:right}.medium-text-center{text-align:center}.medium-text-justify{text-align:justify}}@media screen and (min-width:64em){.large-text-left{text-align:left}.large-text-right{text-align:right}.large-text-center{text-align:center}.large-text-justify{text-align:justify}}.badge,.input-group-button,.input-group-label,.menu-centered,.orbit-bullets{text-align:center}.show-for-print{display:none!important}@media print{blockquote,img,pre,tr{page-break-inside:avoid}*{background:0 0!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}.show-for-print{display:block!important}.hide-for-print{display:none!important}table.show-for-print{display:table!important}thead.show-for-print{display:table-header-group!important}tbody.show-for-print{display:table-row-group!important}tr.show-for-print{display:table-row!important}td.show-for-print,th.show-for-print{display:table-cell!important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}.ir a:after,a[href^='javascript:']:after,a[href^='#']:after{content:''}abbr[title]:after{content:\" (\" attr(title) \")\"}blockquote,pre{border:1px solid #8a8a8a}thead{display:table-header-group}img{max-width:100%!important}@page{margin:.5cm}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=month],[type=week],[type=email],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=color],textarea{display:block;box-sizing:border-box;width:100%;height:2.4375rem;padding:.5rem;border:1px solid #cacaca;margin:0 0 1rem;font-family:inherit;font-size:1rem;color:#0a0a0a;background-color:#fefefe;box-shadow:inset 0 1px 2px rgba(10,10,10,.1);border-radius:0;-webkit-transition:box-shadow .5s,border-color .25s ease-in-out;transition:box-shadow .5s,border-color .25s ease-in-out;-webkit-appearance:none;-moz-appearance:none}[type=text]:focus,[type=password]:focus,[type=date]:focus,[type=datetime]:focus,[type=datetime-local]:focus,[type=month]:focus,[type=week]:focus,[type=email]:focus,[type=number]:focus,[type=search]:focus,[type=tel]:focus,[type=time]:focus,[type=url]:focus,[type=color]:focus,textarea:focus{border:1px solid #8a8a8a;background-color:#fefefe;outline:0;box-shadow:0 0 5px #cacaca;-webkit-transition:box-shadow .5s,border-color .25s ease-in-out;transition:box-shadow .5s,border-color .25s ease-in-out}textarea{min-height:50px;max-width:100%}input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{color:#cacaca}input::-moz-placeholder,textarea::-moz-placeholder{color:#cacaca}input:-ms-input-placeholder,textarea:-ms-input-placeholder{color:#cacaca}input::placeholder,textarea::placeholder{color:#cacaca}input:disabled,input[readonly],textarea:disabled,textarea[readonly]{background-color:#e6e6e6;cursor:default}[type=submit],[type=button]{border-radius:0;-webkit-appearance:none;-moz-appearance:none}input[type=search]{box-sizing:border-box}[type=file],[type=checkbox],[type=radio]{margin:0 0 1rem}[type=checkbox]+label,[type=radio]+label{display:inline-block;margin-left:.5rem;margin-right:1rem;margin-bottom:0;vertical-align:baseline}[type=checkbox]+label[for],[type=radio]+label[for]{cursor:pointer}label>[type=checkbox],label>[type=radio]{margin-right:.5rem}label{display:block;margin:0;font-size:.875rem;line-height:1.8;color:#0a0a0a}label.middle{margin:0 0 1rem;padding:.5625rem 0}.help-text{margin-top:-.5rem;font-size:.8125rem;font-style:italic;color:#0a0a0a}.input-group{display:flex;margin-bottom:1rem;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.input-group-button a,.input-group-button button,.input-group-button input,fieldset{margin:0}.input-group>:first-child,.input-group>:last-child>*{border-radius:0}.input-group-button,.input-group-field,.input-group-label{margin:0;white-space:nowrap}.input-group-label{padding:0 1rem;background:#e6e6e6;color:#0a0a0a;border:1px solid #cacaca;white-space:nowrap;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.input-group-label:first-child{border-right:0}.input-group-label:last-child{border-left:0}.input-group-field{border-radius:0;-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0px;width:auto;height:auto}.fieldset,select{border:1px solid #cacaca}.input-group-button{padding-top:0;padding-bottom:0;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.input-group .input-group-button{display:table-cell}fieldset{border:0;padding:0}legend{margin-bottom:.5rem;max-width:100%}.fieldset{padding:1.25rem;margin:1.125rem 0}.fieldset legend{background:#e6e6e6;padding:0 .1875rem;margin:0 0 0 -.1875rem}select{height:2.4375rem;padding:.5rem 1.5rem .5rem .5rem;margin:0 0 1rem;font-size:1rem;font-family:inherit;line-height:normal;color:#0a0a0a;background-color:#fefefe;border-radius:0;background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='32' height='24' viewBox='0 0 32 24'><polygon points='0,0 32,0 16,24' style='fill: rgb%28138, 138, 138%29'></polygon></svg>\");background-size:9px 6px;background-position:right -1rem center;background-origin:content-box;background-repeat:no-repeat}.form-error,.is-invalid-label{color:#F44336}@media screen and (min-width:0\\0){select{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIpJREFUeNrEkckNgDAMBBfRkEt0ObRBBdsGXUDgmQfK4XhH2m8czQAAy27R3tsw4Qfe2x8uOO6oYLb6GlOor3GF+swURAOmUJ+RwtEJs9WvTGEYxBXqI1MQAZhCfUQKRzDMVj+TwrAIV6jvSUEkYAr1LSkcyTBb/V+KYfX7xAeusq3sLDtGH3kEGACPWIflNZfhRQAAAABJRU5ErkJggg==)}}select:disabled{background-color:#e6e6e6;cursor:default}select::-ms-expand{display:none}select[multiple]{background-image:none}.is-invalid-input:not(:focus){background-color:rgba(244,67,54,.1);border-color:#F44336}.form-error{display:none;margin-top:-.5rem;margin-bottom:1rem;font-size:.75rem;font-weight:700}.form-error.is-visible{display:block}.accordion{background:#fefefe;margin-left:0}.accordion-item:first-child>:first-child,.accordion-item:last-child>:last-child{border-radius:0}.accordion-title{display:block;padding:1.25rem 1rem;line-height:1;font-size:.75rem;color:#03A9F4;position:relative;border:1px solid #e6e6e6;border-bottom:0}:last-child:not(.is-active)>.accordion-title{border-radius:0;border-bottom:1px solid #e6e6e6}.accordion-title:focus,.accordion-title:hover{background-color:#e6e6e6}.accordion-title::before{content:'+';position:absolute;right:1rem;top:50%;margin-top:-.5rem}.is-active>.accordion-title::before{content:'–'}.accordion-content{padding:1rem;display:none;border:1px solid #e6e6e6;border-bottom:0;background-color:#fefefe;color:#03A9F4}:last-child>.accordion-content:last-child{border-bottom:1px solid #e6e6e6}.is-accordion-submenu-parent>a{position:relative}.is-accordion-submenu-parent>a::after{content:'';display:block;width:0;height:0;border:6px inset;border-color:#03A9F4 transparent transparent;border-top-style:solid;border-bottom-width:0;position:absolute;top:50%;margin-top:-4px;right:1rem}.menu,.menu.expanded>li:first-child:last-child{width:100%}.is-accordion-submenu-parent[aria-expanded=true]>a::after{-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-transform:scaleY(-1);transform:scaleY(-1)}.badge{display:inline-block;padding:.3em;min-width:2.1em;font-size:.6rem;border-radius:50%;background:#03A9F4;color:#fefefe}.badge.secondary{background:#777;color:#fefefe}.badge.success{background:#8BC34A;color:#fefefe}.badge.warning{background:#FFC107;color:#fefefe}.badge.alert{background:#F44336;color:#fefefe}.breadcrumbs{list-style:none;margin:0 0 1rem}.breadcrumbs::after,.breadcrumbs::before{content:' ';display:table;-ms-flex-preferred-size:0;flex-basis:0;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.button-group,.menu{display:-webkit-box;display:-ms-flexbox}.breadcrumbs li{float:left;color:#0a0a0a;font-size:.6875rem;cursor:default;text-transform:uppercase}.breadcrumbs li:not(:last-child)::after{color:#cacaca;content:\"/\";margin:0 .75rem;position:relative;top:1px;opacity:1}.breadcrumbs a{color:#03A9F4}.breadcrumbs a:hover{text-decoration:underline}.breadcrumbs .disabled{color:#cacaca;cursor:not-allowed}.button-group{margin-bottom:1rem;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.button-group::after,.button-group::before{content:' ';display:table;-ms-flex-preferred-size:0;flex-basis:0;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.button-group button{margin:0 1px 1px 0;font-size:.9rem;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.button-group button:last-child{margin-right:0}.button-group.tiny button{font-size:.6rem}.button-group.small button{font-size:.75rem}.button-group.large button{font-size:1.25rem}.button-group.tiny{line-height:24px}.button-group.small{line-height:26px}.button-group.large{line-height:44px}.button-group.expanded button{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0px}.button-group.primary button{background-color:#03A9F4;color:#fefefe}.button-group.primary button:focus,.button-group.primary button:hover{background-color:#0287c3;color:#fefefe}.button-group.secondary button{background-color:#777;color:#fefefe}.button-group.secondary button:focus,.button-group.secondary button:hover{background-color:#5f5f5f;color:#fefefe}.button-group.success button{background-color:#8BC34A;color:#fefefe}.button-group.success button:focus,.button-group.success button:hover{background-color:#70a236;color:#fefefe}.button-group.warning button{background-color:#FFC107;color:#fefefe}.button-group.warning button:focus,.button-group.warning button:hover{background-color:#d29d00;color:#fefefe}.button-group.alert button{background-color:#F44336;color:#fefefe}.button-group.alert button:focus,.button-group.alert button:hover{background-color:#e21b0c;color:#fefefe}.button-group.stacked,.button-group.stacked-for-medium,.button-group.stacked-for-small{-ms-flex-wrap:wrap;flex-wrap:wrap}.button-group.stacked button,.button-group.stacked-for-medium button,.button-group.stacked-for-small button{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%}.button-group.stacked button:last-child,.button-group.stacked-for-medium button:last-child,.button-group.stacked-for-small button:last-child{margin-bottom:0}@media screen and (min-width:40em){.button-group.stacked-for-small button{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0px;margin-bottom:0}}@media screen and (min-width:64em){.button-group.stacked-for-medium button{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0px;margin-bottom:0}}@media screen and (max-width:39.9375em){.button-group.stacked-for-small.expanded{display:block}.button-group.stacked-for-small.expanded button{display:block;margin-right:0}}.callout{margin:0 0 1rem;padding:1rem;border:1px solid rgba(10,10,10,.25);border-radius:0;position:relative;color:#0a0a0a;background-color:#fff}.callout>:last-child,.menu a,.menu button,.menu input{margin-bottom:0}.callout>:first-child{margin-top:0}.callout.primary{background-color:#d8f3ff}.callout.secondary{background-color:#ebebeb}.callout.success{background-color:#eef6e4}.callout.warning{background-color:#fff6da}.callout.alert{background-color:#fde3e1}.callout.small{padding:.5rem}.callout.large{padding:3rem}.close-button{position:absolute;color:#8a8a8a;right:1rem;top:.5rem;font-size:2em;line-height:1;cursor:pointer}[data-whatinput=mouse] .close-button{outline:0}.close-button:focus,.close-button:hover{color:#0a0a0a}.menu{margin:0;display:flex;-ms-flex-wrap:nowrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;flex-wrap:nowrap}[data-whatinput=mouse] .menu>li{outline:0}.menu>li>a{padding:.7rem 1rem;line-height:1;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap}.menu-centered>.menu,.menu.simple li{display:inline-block}.menu>li>a i,.menu>li>a img,.menu>li>a svg{margin-right:.25rem}.menu>li{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.menu.vertical{-ms-flex-wrap:wrap;flex-wrap:wrap}.menu.vertical>li{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.menu.vertical>li>a{-webkit-box-align:start;-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}@media screen and (min-width:40em){.menu.medium-horizontal{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.menu.medium-horizontal>li{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.menu.medium-vertical{-ms-flex-wrap:wrap;flex-wrap:wrap}.menu.medium-vertical>li{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.menu.medium-vertical>li>a{-webkit-box-align:start;-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}}@media screen and (min-width:64em){.menu.large-horizontal{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.menu.large-horizontal>li{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.menu.large-vertical{-ms-flex-wrap:wrap;flex-wrap:wrap}.menu.large-vertical>li{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.menu.large-vertical>li>a{-webkit-box-align:start;-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}}.menu.simple li{line-height:1;margin-right:1rem}.menu.simple a{padding:0}.menu.align-right{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.menu.expanded>li{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0px}.menu.icon-top>li>a{-ms-flex-flow:column nowrap;flex-flow:column nowrap}.menu.icon-top>li>a i,.menu.icon-top>li>a img,.menu.icon-top>li>a svg{-ms-flex-item-align:stretch;align-self:stretch;text-align:center;margin-bottom:.25rem}.menu.nested{margin-left:1rem}.menu .active>a{color:#fefefe;background:#03A9F4}.menu-text{font-weight:700;color:inherit;line-height:1;padding:.7rem 1rem}.no-js [data-responsive-menu] ul{display:none}.menu-icon{position:relative;display:inline-block;vertical-align:middle;cursor:pointer;width:20px;height:16px}.menu-icon::after{content:'';position:absolute;display:block;width:100%;height:2px;background:#fefefe;top:0;left:0;box-shadow:0 7px 0 #fefefe,0 14px 0 #fefefe}.menu-icon:hover::after{background:#cacaca;box-shadow:0 7px 0 #cacaca,0 14px 0 #cacaca}.is-drilldown{position:relative;overflow:hidden}.is-drilldown li{display:block!important}.is-drilldown-submenu{position:absolute;top:0;left:100%;z-index:-1;height:100%;width:100%;background:#fefefe;-webkit-transition:-webkit-transform .15s linear;transition:-webkit-transform .15s linear;transition:transform .15s linear;transition:transform .15s linear,-webkit-transform .15s linear}.is-drilldown-submenu.is-active{z-index:1;display:block;-webkit-transform:translateX(-100%);transform:translateX(-100%)}.is-drilldown-submenu.is-closing{-webkit-transform:translateX(100%);transform:translateX(100%)}.is-drilldown-submenu-parent>a{position:relative}.is-drilldown-submenu-parent>a::after{content:'';display:block;width:0;height:0;border:6px inset;border-color:transparent transparent transparent #03A9F4;border-left-style:solid;border-right-width:0;position:absolute;top:50%;margin-top:-6px;right:1rem}.js-drilldown-back>a::before{content:'';width:0;height:0;border:6px inset;border-color:transparent #03A9F4 transparent transparent;border-right-style:solid;border-left-width:0;display:inline-block;vertical-align:middle;margin-right:.75rem}.dropdown-pane{background-color:#e6e6e6;border:1px solid #cacaca;border-radius:0;display:block;font-size:1rem;padding:1rem;position:absolute;visibility:hidden;width:300px;z-index:10}.dropdown-pane.is-open{visibility:visible}.dropdown-pane.tiny{width:100px}.dropdown-pane.small{width:200px}.dropdown-pane.large{width:400px}.dropdown.menu>li.opens-left>.is-dropdown-submenu{left:auto;right:0;top:100%}.dropdown.menu>li.opens-right>.is-dropdown-submenu{right:auto;left:0;top:100%}.dropdown.menu>li.is-dropdown-submenu-parent>a{padding-right:1.5rem;position:relative}.dropdown.menu>li.is-dropdown-submenu-parent>a::after{content:'';display:block;width:0;height:0;border:5px inset;border-color:#03A9F4 transparent transparent;border-top-style:solid;border-bottom-width:0;right:5px;margin-top:-2px}[data-whatinput=mouse] .dropdown.menu a{outline:0}.no-js .dropdown.menu ul{display:none}.dropdown.menu.vertical>li .is-dropdown-submenu{top:0}.dropdown.menu.vertical>li.opens-left>.is-dropdown-submenu{left:auto;right:100%}.dropdown.menu.vertical>li.opens-right>.is-dropdown-submenu{right:auto;left:100%}.dropdown.menu.vertical>li>a::after{right:14px;margin-top:-3px}.dropdown.menu.vertical>li.opens-left>a::after{content:'';display:block;width:0;height:0;border:5px inset;border-color:transparent #03A9F4 transparent transparent;border-right-style:solid;border-left-width:0}.dropdown.menu.vertical>li.opens-right>a::after{content:'';display:block;width:0;height:0;border:5px inset;border-color:transparent transparent transparent #03A9F4;border-left-style:solid;border-right-width:0}@media screen and (min-width:40em){.dropdown.menu.medium-horizontal>li.opens-left>.is-dropdown-submenu{left:auto;right:0;top:100%}.dropdown.menu.medium-horizontal>li.opens-right>.is-dropdown-submenu{right:auto;left:0;top:100%}.dropdown.menu.medium-horizontal>li.is-dropdown-submenu-parent>a{padding-right:1.5rem;position:relative}.dropdown.menu.medium-horizontal>li.is-dropdown-submenu-parent>a::after{content:'';display:block;width:0;height:0;border:5px inset;border-color:#03A9F4 transparent transparent;border-top-style:solid;border-bottom-width:0;right:5px;margin-top:-2px}.dropdown.menu.medium-vertical>li .is-dropdown-submenu{top:0}.dropdown.menu.medium-vertical>li.opens-left>.is-dropdown-submenu{left:auto;right:100%}.dropdown.menu.medium-vertical>li.opens-right>.is-dropdown-submenu{right:auto;left:100%}.dropdown.menu.medium-vertical>li>a::after{right:14px;margin-top:-3px}.dropdown.menu.medium-vertical>li.opens-left>a::after{content:'';display:block;width:0;height:0;border:5px inset;border-color:transparent #03A9F4 transparent transparent;border-right-style:solid;border-left-width:0}.dropdown.menu.medium-vertical>li.opens-right>a::after{content:'';display:block;width:0;height:0;border:5px inset;border-color:transparent transparent transparent #03A9F4;border-left-style:solid;border-right-width:0}}@media screen and (min-width:64em){.dropdown.menu.large-horizontal>li.opens-left>.is-dropdown-submenu{left:auto;right:0;top:100%}.dropdown.menu.large-horizontal>li.opens-right>.is-dropdown-submenu{right:auto;left:0;top:100%}.dropdown.menu.large-horizontal>li.is-dropdown-submenu-parent>a{padding-right:1.5rem;position:relative}.dropdown.menu.large-horizontal>li.is-dropdown-submenu-parent>a::after{content:'';display:block;width:0;height:0;border:5px inset;border-color:#03A9F4 transparent transparent;border-top-style:solid;border-bottom-width:0;right:5px;margin-top:-2px}.dropdown.menu.large-vertical>li .is-dropdown-submenu{top:0}.dropdown.menu.large-vertical>li.opens-left>.is-dropdown-submenu{left:auto;right:100%}.dropdown.menu.large-vertical>li.opens-right>.is-dropdown-submenu{right:auto;left:100%}.dropdown.menu.large-vertical>li>a::after{right:14px;margin-top:-3px}.dropdown.menu.large-vertical>li.opens-left>a::after{content:'';display:block;width:0;height:0;border:5px inset;border-color:transparent #03A9F4 transparent transparent;border-right-style:solid;border-left-width:0}.dropdown.menu.large-vertical>li.opens-right>a::after{content:'';display:block;width:0;height:0;border:5px inset;border-color:transparent transparent transparent #03A9F4;border-left-style:solid;border-right-width:0}}.dropdown.menu.align-right .is-dropdown-submenu.first-sub{top:100%;left:auto;right:0}.is-dropdown-menu.vertical{width:100px}.is-dropdown-menu.vertical.align-right{float:right}.is-dropdown-submenu-parent{position:relative}.is-dropdown-submenu-parent a::after{position:absolute;top:50%;right:5px;margin-top:-2px}.is-dropdown-submenu-parent.opens-inner>.is-dropdown-submenu{top:100%;left:auto}.is-dropdown-submenu-parent.opens-left>.is-dropdown-submenu{left:auto;right:100%}.is-dropdown-submenu-parent.opens-right>.is-dropdown-submenu{right:auto;left:100%}.is-dropdown-submenu{display:none;position:absolute;top:0;left:100%;min-width:200px;z-index:1;background:#fefefe;border:1px solid #cacaca}.is-dropdown-submenu .is-dropdown-submenu-parent>a::after{right:14px;margin-top:-3px}.is-dropdown-submenu .is-dropdown-submenu-parent.opens-left>a::after{content:'';display:block;width:0;height:0;border:5px inset;border-color:transparent #03A9F4 transparent transparent;border-right-style:solid;border-left-width:0}.is-dropdown-submenu .is-dropdown-submenu-parent.opens-right>a::after{content:'';display:block;width:0;height:0;border:5px inset;border-color:transparent transparent transparent #03A9F4;border-left-style:solid;border-right-width:0}.is-dropdown-submenu .is-dropdown-submenu{margin-top:-1px}.is-dropdown-submenu>li{width:100%}.is-dropdown-submenu.js-dropdown-active{display:block}.flex-video{position:relative;height:0;padding-bottom:75%;margin-bottom:1rem;overflow:hidden}.flex-video embed,.flex-video iframe,.flex-video object,.flex-video video{position:absolute;top:0;left:0;width:100%;height:100%}.flex-video.widescreen{padding-bottom:56.25%}.flex-video.vimeo{padding-top:0}.label{display:inline-block;padding:.33333rem .5rem;font-size:.8rem;line-height:1;white-space:nowrap;cursor:default;border-radius:0;background:#03A9F4;color:#fefefe}.label.secondary{background:#777;color:#fefefe}.label.success{background:#8BC34A;color:#fefefe}.label.warning{background:#FFC107;color:#fefefe}.label.alert{background:#F44336;color:#fefefe}.media-object{margin-bottom:1rem;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap}.media-object-section>:last-child,.orbit-caption{margin-bottom:0}.media-object img{max-width:none}@media screen and (max-width:39.9375em){.media-object.stack-for-small{-ms-flex-wrap:wrap;flex-wrap:wrap}.media-object.stack-for-small .media-object-section{padding:0 0 1rem;-ms-flex-preferred-size:100%;flex-basis:100%;max-width:100%}.media-object.stack-for-small .media-object-section img{width:100%}}.media-object-section{-webkit-box-flex:0;-ms-flex:0 1 auto;flex:0 1 auto}.media-object-section:first-child{padding-right:1rem}.media-object-section:last-child:not(:nth-child(2)){padding-left:1rem}.media-object-section.main-section{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0px}.off-canvas-wrapper-inner::after,.off-canvas-wrapper-inner::before,.pagination::after,.pagination::before{content:' ';-ms-flex-preferred-size:0;-webkit-box-ordinal-group:2;order:1}body,html{height:100%}.off-canvas-wrapper{width:100%;overflow-x:hidden;position:relative;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-overflow-scrolling:auto}.off-canvas-wrapper-inner{position:relative;width:100%;-webkit-transition:-webkit-transform .5s ease;transition:-webkit-transform .5s ease;transition:transform .5s ease;transition:transform .5s ease,-webkit-transform .5s ease}.off-canvas-wrapper-inner::after,.off-canvas-wrapper-inner::before{display:table;flex-basis:0;-ms-flex-order:1}.off-canvas-content{min-height:100%;background:#e6e6e6;-webkit-transition:-webkit-transform .5s ease;transition:-webkit-transform .5s ease;transition:transform .5s ease;transition:transform .5s ease,-webkit-transform .5s ease;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1;padding-bottom:.1px;box-shadow:0 0 10px rgba(10,10,10,.5)}.js-off-canvas-exit{display:none;position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(254,254,254,.25);cursor:pointer;-webkit-transition:background .5s ease;transition:background .5s ease}.off-canvas{position:absolute;background:#e6e6e6;z-index:-1;max-height:100%;overflow-y:auto;-webkit-transform:translateX(0);transform:translateX(0)}.orbit-caption,.orbit-next:active,.orbit-next:focus,.orbit-next:hover,.orbit-previous:active,.orbit-previous:focus,.orbit-previous:hover{background-color:rgba(10,10,10,.5)}[data-whatinput=mouse] .off-canvas{outline:0}.off-canvas.position-left{left:-250px;top:0;width:250px}.is-open-left{-webkit-transform:translateX(250px);transform:translateX(250px)}.off-canvas.position-right{right:-250px;top:0;width:250px}.is-open-right{-webkit-transform:translateX(-250px);transform:translateX(-250px)}@media screen and (min-width:40em){.position-left.reveal-for-medium{left:0;z-index:auto;position:fixed}.position-left.reveal-for-medium~.off-canvas-content{margin-left:250px}.position-right.reveal-for-medium{right:0;z-index:auto;position:fixed}.position-right.reveal-for-medium~.off-canvas-content{margin-right:250px}}@media screen and (min-width:64em){.position-left.reveal-for-large{left:0;z-index:auto;position:fixed}.position-left.reveal-for-large~.off-canvas-content{margin-left:250px}.position-right.reveal-for-large{right:0;z-index:auto;position:fixed}.position-right.reveal-for-large~.off-canvas-content{margin-right:250px}}.orbit,.orbit-container{position:relative}.orbit-container{margin:0;overflow:hidden;list-style:none}.orbit-caption,.orbit-next,.orbit-previous{position:absolute;padding:1rem;color:#fefefe}.orbit-slide{width:100%;max-height:100%}.orbit-slide.no-motionui.is-active{top:0;left:0}.orbit-figure{margin:0}.orbit-image{margin:0;width:100%;max-width:100%}.orbit-caption{width:100%}.orbit-next,.orbit-previous{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:10}[data-whatinput=mouse] .orbit-next,[data-whatinput=mouse] .orbit-previous{outline:0}.orbit-previous{left:0}.orbit-next{left:auto;right:0}.orbit-bullets{position:relative;margin-top:.8rem;margin-bottom:.8rem}[data-whatinput=mouse] .orbit-bullets{outline:0}.orbit-bullets button{width:1.2rem;height:1.2rem;margin:.1rem;background-color:#cacaca;border-radius:50%}.orbit-bullets button.is-active,.orbit-bullets button:hover{background-color:#8a8a8a}.pagination{margin-left:0;margin-bottom:1rem}.pagination::after,.pagination::before{display:table;flex-basis:0;-ms-flex-order:1}.pagination li{font-size:.875rem;margin-right:.0625rem;border-radius:0;display:none}.pagination li:first-child,.pagination li:last-child{display:inline-block}@media screen and (min-width:40em){.pagination li{display:inline-block}.reveal{min-height:0}}.pagination a,.pagination button{color:#0a0a0a;display:block;padding:.1875rem .625rem;border-radius:0}.pagination a:hover,.pagination button:hover{background:#e6e6e6}.pagination .current{padding:.1875rem .625rem;background:#03A9F4;color:#fefefe;cursor:default}.pagination .disabled{padding:.1875rem .625rem;color:#cacaca;cursor:not-allowed}.pagination .disabled:hover{background:0 0}.pagination .ellipsis::after{content:'\\2026';padding:.1875rem .625rem;color:#0a0a0a}.progress-meter-text,.switch{color:#fefefe;font-weight:700}.pagination-previous a::before,.pagination-previous.disabled::before{content:'\\00ab';display:inline-block;margin-right:.5rem}.pagination-next a::after,.pagination-next.disabled::after{content:'\\00bb';display:inline-block;margin-left:.5rem}.progress{background-color:#cacaca;height:1rem;margin-bottom:1rem;border-radius:0}.progress.primary .progress-meter{background-color:#03A9F4}.progress.secondary .progress-meter{background-color:#777}.progress.success .progress-meter{background-color:#8BC34A}.progress.warning .progress-meter{background-color:#FFC107}.progress.alert .progress-meter{background-color:#F44336}.progress-meter{position:relative;display:block;width:0;height:100%;background-color:#03A9F4}.progress-meter-text{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);position:absolute;margin:0;font-size:.75rem;white-space:nowrap}.slider-fill,.slider-handle{left:0;display:inline-block}.slider{position:relative;height:.5rem;margin-top:1.25rem;margin-bottom:2.25rem;background-color:#e6e6e6;cursor:pointer;user-select:none;-ms-touch-action:none;touch-action:none}.slider-fill{position:absolute;top:0;max-width:100%;height:.5rem;background-color:#cacaca;-webkit-transition:all .2s ease-in-out;transition:all .2s ease-in-out}.slider-fill.is-dragging{-webkit-transition:all 0s linear;transition:all 0s linear}.slider-handle{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);position:absolute;z-index:1;width:1.4rem;height:1.4rem;background-color:#03A9F4;-webkit-transition:all .2s ease-in-out;transition:all .2s ease-in-out;-ms-touch-action:manipulation;touch-action:manipulation;border-radius:0}[data-whatinput=mouse] .slider-handle{outline:0}.slider-handle:hover{background-color:#0390cf}.slider-handle.is-dragging{-webkit-transition:all 0s linear;transition:all 0s linear}.slider.disabled,.slider[disabled]{opacity:.25;cursor:not-allowed}.slider.vertical{display:inline-block;width:.5rem;height:12.5rem;margin:0 1.25rem;-webkit-transform:scale(1,-1);transform:scale(1,-1)}.slider.vertical .slider-fill{top:0;width:.5rem;max-height:100%}.slider.vertical .slider-handle{position:absolute;top:0;left:50%;width:1.4rem;height:1.4rem;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.sticky-container{position:relative}.sticky{position:absolute;z-index:0;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.sticky.is-stuck{position:fixed;z-index:5}.sticky.is-stuck.is-at-top{top:0}.sticky.is-anchored{position:absolute;left:auto;right:auto}body.is-reveal-open{overflow:hidden}html.is-reveal-open,html.is-reveal-open body{height:100%;overflow:hidden;user-select:none}.table-scroll,table.scroll{overflow-x:auto}.reveal-overlay{display:none;position:fixed;top:0;bottom:0;left:0;right:0;z-index:1005;background-color:rgba(10,10,10,.45);overflow-y:scroll}.reveal{display:none;z-index:1006;padding:1rem;border:1px solid #cacaca;background-color:#fefefe;border-radius:0;position:relative;top:100px;margin-left:auto;margin-right:auto;overflow-y:auto}[data-whatinput=mouse] .reveal{outline:0}.reveal .column,.reveal .columns{min-width:0}.reveal>:last-child{margin-bottom:0}.reveal.collapse{padding:0}table caption,table tbody td,table tbody th{padding:.5rem .625rem .625rem}@media screen and (min-width:40em){.reveal{width:600px;max-width:75rem}.reveal .reveal{left:auto;right:auto;margin:0 auto}.reveal.tiny{width:30%;max-width:75rem}.reveal.small{width:50%;max-width:75rem}.reveal.large{width:90%;max-width:75rem}}.reveal.full{top:0;left:0;width:100%;height:100%;height:100vh;min-height:100vh;max-width:none;margin-left:0;border:0;border-radius:0}@media screen and (max-width:39.9375em){.reveal{top:0;left:0;width:100%;height:100%;height:100vh;min-height:100vh;max-width:none;margin-left:0;border:0;border-radius:0}}.reveal.without-overlay{position:fixed}.switch{margin-bottom:1rem;outline:0;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:.875rem}.switch-input{opacity:0;position:absolute}.switch-paddle{background:#cacaca;cursor:pointer;display:block;position:relative;width:4rem;height:2rem;-webkit-transition:all .25s ease-out;transition:all .25s ease-out;border-radius:0;color:inherit;font-weight:inherit}.has-tip,.title-bar-title,table caption{font-weight:700}input+.switch-paddle{margin:0}.switch-paddle::after{background:#fefefe;content:'';display:block;position:absolute;height:1.5rem;left:.25rem;top:.25rem;width:1.5rem;-webkit-transition:all .25s ease-out;transition:all .25s ease-out;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);border-radius:0}input:checked~.switch-paddle{background:#03A9F4}input:checked~.switch-paddle::after{left:2.25rem}[data-whatinput=mouse] input:focus~.switch-paddle{outline:0}.switch-active,.switch-inactive{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.switch-active{left:8%;display:none}input:checked+label>.switch-active{display:block}.switch-inactive{right:15%}input:checked+label>.switch-inactive{display:none}.switch.tiny .switch-paddle{width:3rem;height:1.5rem;font-size:.625rem}.switch.tiny .switch-paddle::after{width:1rem;height:1rem}.switch.tiny input:checked~.switch-paddle::after{left:1.75rem}.switch.small .switch-paddle{width:3.5rem;height:1.75rem;font-size:.75rem}.switch.small .switch-paddle::after{width:1.25rem;height:1.25rem}.switch.small input:checked~.switch-paddle::after{left:2rem}.switch.large .switch-paddle{width:5rem;height:2.5rem;font-size:1rem}.switch.large .switch-paddle::after{width:2rem;height:2rem}.switch.large input:checked~.switch-paddle::after{left:2.75rem}table{border-collapse:collapse;border-spacing:0;width:100%;margin-bottom:1rem;border-radius:0}table tbody,table tfoot,table thead{border:1px solid #f1f1f1;background-color:#fefefe}table tfoot,table thead{background:#f8f8f8;color:#0a0a0a}.tabs.primary>li>a,.title-bar,.tooltip{color:#fefefe}table tfoot tr,table thead tr{background:0 0}table tfoot td,table tfoot th,table thead td,table thead th{padding:.5rem .625rem .625rem;font-weight:700;text-align:left}table tbody tr:nth-child(even){background-color:#f1f1f1}@media screen and (max-width:63.9375em){table.stack tfoot,table.stack thead{display:none}table.stack td,table.stack th,table.stack tr{display:block}table.stack td{border-top:0}}.tabs,.tabs-content{border:1px solid #e6e6e6}table.scroll{display:block;width:100%}table.hover tr:hover{background-color:#f9f9f9}table.hover tr:nth-of-type(even):hover{background-color:#ececec}.table-scroll table{width:auto}.tabs{margin:0;background:#fefefe}.tabs::after,.tabs::before{content:' ';display:table;-ms-flex-preferred-size:0;flex-basis:0;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.tabs.vertical>li{width:auto;float:none;display:block}.tabs.simple>li>a{padding:0}.tabs.simple>li>a:hover{background:0 0}.tabs.primary{background:#03A9F4}.tabs.primary>li>a:focus,.tabs.primary>li>a:hover{background:#03a1e8}.tabs-title{float:left}.tabs-title>a{display:block;padding:1.25rem 1.5rem;line-height:1;font-size:.75rem}.tabs-title>a:hover{background:#fefefe}.tabs-title>a:focus,.tabs-title>a[aria-selected=true]{background:#e6e6e6}.tabs-content{background:#fefefe;-webkit-transition:all .5s ease;transition:all .5s ease;border-top:0}.tabs-content.vertical{border:1px solid #e6e6e6;border-left:0}.tabs-panel{display:none;padding:1rem}.tabs-panel.is-active{display:block}.thumbnail{border:4px solid #fefefe;box-shadow:0 0 0 1px rgba(10,10,10,.2);display:inline-block;line-height:0;max-width:100%;-webkit-transition:box-shadow .2s ease-out;transition:box-shadow .2s ease-out;border-radius:0;margin-bottom:1rem}.thumbnail:focus,.thumbnail:hover{box-shadow:0 0 6px 1px rgba(3,169,244,.5)}.title-bar{background:#0a0a0a;padding:.5rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.menu-icon.dark,.title-bar-title{display:inline-block;vertical-align:middle}.title-bar .menu-icon{margin-left:.25rem;margin-right:.25rem}.title-bar-left,.title-bar-right{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0px}.title-bar-right{text-align:right}.menu-icon.dark{position:relative;cursor:pointer;width:20px;height:16px}.menu-icon.dark::after{content:'';position:absolute;display:block;width:100%;height:2px;background:#0a0a0a;top:0;left:0;box-shadow:0 7px 0 #0a0a0a,0 14px 0 #0a0a0a}.menu-icon.dark:hover::after{background:#8a8a8a;box-shadow:0 7px 0 #8a8a8a,0 14px 0 #8a8a8a}.has-tip{border-bottom:dotted 1px #8a8a8a;position:relative;display:inline-block;cursor:help}.tooltip.top::before,.tooltip::before{content:'';display:block;width:0;height:0}.tooltip{background-color:#0a0a0a;font-size:80%;padding:.75rem;position:absolute;z-index:10;top:calc(100% + .6495rem);max-width:10rem!important;border-radius:0}.tooltip::before{border:.75rem inset;border-color:transparent transparent #0a0a0a;border-bottom-style:solid;border-top-width:0;bottom:100%;position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.tooltip.top::before{border:.75rem inset;border-color:#0a0a0a transparent transparent;border-top-style:solid;border-bottom-width:0;top:100%;bottom:auto}.tooltip.left::before,.tooltip.right::before{content:'';display:block;width:0;height:0;bottom:auto;top:50%}.tooltip.left::before{border:.75rem inset;border-color:transparent transparent transparent #0a0a0a;border-left-style:solid;border-right-width:0;left:100%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.tooltip.right::before{border:.75rem inset;border-color:transparent #0a0a0a transparent transparent;border-right-style:solid;border-left-width:0;left:auto;right:100%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.top-bar{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding:.5rem;-ms-flex-wrap:wrap;flex-wrap:wrap}.top-bar,.top-bar ul{background-color:#292c2f}.top-bar input{max-width:200px;margin-right:1rem}.top-bar .input-group-field{width:100%;margin-right:0}.top-bar input.button{width:auto}.top-bar .top-bar-left,.top-bar .top-bar-right{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}@media screen and (min-width:40em){.top-bar{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.top-bar .top-bar-left,.top-bar .top-bar-right{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0px}.hide-for-medium{display:none!important}}@media screen and (max-width:63.9375em){.top-bar.stacked-for-medium{-ms-flex-wrap:wrap;flex-wrap:wrap}.top-bar.stacked-for-medium .top-bar-left,.top-bar.stacked-for-medium .top-bar-right{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.show-for-large{display:none!important}}@media screen and (max-width:74.9375em){.top-bar.stacked-for-large{-ms-flex-wrap:wrap;flex-wrap:wrap}.top-bar.stacked-for-large .top-bar-left,.top-bar.stacked-for-large .top-bar-right{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}}.top-bar-title{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;margin-right:1rem}.top-bar-left,.top-bar-right{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.hide{display:none!important}.invisible{visibility:hidden}@media screen and (max-width:0em),screen and (min-width:40em){.show-for-small-only{display:none!important}}@media screen and (max-width:39.9375em){.hide-for-small-only,.show-for-medium{display:none!important}}@media screen and (min-width:40em) and (max-width:63.9375em){.hide-for-medium-only{display:none!important}}@media screen and (max-width:39.9375em),screen and (min-width:64em){.show-for-medium-only{display:none!important}}@media screen and (min-width:64em){.hide-for-large{display:none!important}}@media screen and (min-width:64em) and (max-width:74.9375em){.hide-for-large-only{display:none!important}}@media screen and (max-width:63.9375em),screen and (min-width:75em){.show-for-large-only{display:none!important}}.show-for-sr,.show-on-focus{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}.show-on-focus:active,.show-on-focus:focus{position:static!important;height:auto;width:auto;overflow:visible;clip:auto}.hide-for-portrait,.show-for-landscape{display:block!important}@media screen and (orientation:landscape){.hide-for-portrait,.show-for-landscape{display:block!important}.hide-for-landscape,.show-for-portrait{display:none!important}}.hide-for-landscape,.show-for-portrait{display:none!important}@media screen and (orientation:portrait){.hide-for-portrait,.show-for-landscape{display:none!important}.hide-for-landscape,.show-for-portrait{display:block!important}}.align-right{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.align-center{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.align-justify{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.align-spaced{-ms-flex-pack:distribute;justify-content:space-around}.align-top{-webkit-box-align:start;-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start}.align-self-top{-ms-flex-item-align:start;align-self:flex-start}.align-bottom{-webkit-box-align:end;-ms-flex-align:end;-ms-grid-row-align:flex-end;align-items:flex-end}.align-self-bottom{-ms-flex-item-align:end;align-self:flex-end}.align-middle{-webkit-box-align:center;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center}.align-self-middle{-ms-flex-item-align:center;align-self:center}.align-stretch{-webkit-box-align:stretch;-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch}.align-self-stretch{-ms-flex-item-align:stretch;align-self:stretch}.small-order-1{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.small-order-2{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}.small-order-3{-webkit-box-ordinal-group:4;-ms-flex-order:3;order:3}.small-order-4{-webkit-box-ordinal-group:5;-ms-flex-order:4;order:4}.small-order-5{-webkit-box-ordinal-group:6;-ms-flex-order:5;order:5}.small-order-6{-webkit-box-ordinal-group:7;-ms-flex-order:6;order:6}@media screen and (min-width:40em){.medium-order-1{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.medium-order-2{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}.medium-order-3{-webkit-box-ordinal-group:4;-ms-flex-order:3;order:3}.medium-order-4{-webkit-box-ordinal-group:5;-ms-flex-order:4;order:4}.medium-order-5{-webkit-box-ordinal-group:6;-ms-flex-order:5;order:5}.medium-order-6{-webkit-box-ordinal-group:7;-ms-flex-order:6;order:6}}@media screen and (min-width:64em){.large-order-1{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.large-order-2{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}.large-order-3{-webkit-box-ordinal-group:4;-ms-flex-order:3;order:3}.large-order-4{-webkit-box-ordinal-group:5;-ms-flex-order:4;order:4}.large-order-5{-webkit-box-ordinal-group:6;-ms-flex-order:5;order:5}.large-order-6{-webkit-box-ordinal-group:7;-ms-flex-order:6;order:6}}.slide-in-down.mui-enter{-webkit-transition-duration:.5s;transition-duration:.5s;-webkit-transition-timing-function:linear;transition-timing-function:linear;-webkit-transform:translateY(-100%);transform:translateY(-100%);-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;-webkit-backface-visibility:hidden;backface-visibility:hidden}.slide-in-left.mui-enter,.slide-in-up.mui-enter{-webkit-transition-duration:.5s;-webkit-transition-timing-function:linear;-webkit-transition-property:opacity,-webkit-transform;-webkit-backface-visibility:hidden}.slide-in-down.mui-enter.mui-enter-active{-webkit-transform:translateY(0);transform:translateY(0)}.slide-in-left.mui-enter{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:translateX(-100%);transform:translateX(-100%);transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;backface-visibility:hidden}.slide-in-left.mui-enter.mui-enter-active{-webkit-transform:translateX(0);transform:translateX(0)}.slide-in-up.mui-enter{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:translateY(100%);transform:translateY(100%);transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;backface-visibility:hidden}.slide-in-right.mui-enter,.slide-out-down.mui-leave{-webkit-transition-duration:.5s;-webkit-transition-timing-function:linear;-webkit-transition-property:opacity,-webkit-transform;-webkit-backface-visibility:hidden}.slide-in-up.mui-enter.mui-enter-active{-webkit-transform:translateY(0);transform:translateY(0)}.slide-in-right.mui-enter{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:translateX(100%);transform:translateX(100%);transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;backface-visibility:hidden}.slide-in-right.mui-enter.mui-enter-active{-webkit-transform:translateX(0);transform:translateX(0)}.slide-out-down.mui-leave{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:translateY(0);transform:translateY(0);transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;backface-visibility:hidden}.slide-out-right.mui-leave,.slide-out-up.mui-leave{-webkit-transition-duration:.5s;-webkit-transition-timing-function:linear;-webkit-transition-property:opacity,-webkit-transform;-webkit-backface-visibility:hidden}.slide-out-down.mui-leave.mui-leave-active{-webkit-transform:translateY(100%);transform:translateY(100%)}.slide-out-right.mui-leave{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:translateX(0);transform:translateX(0);transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;backface-visibility:hidden}.slide-out-right.mui-leave.mui-leave-active{-webkit-transform:translateX(100%);transform:translateX(100%)}.slide-out-up.mui-leave{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:translateY(0);transform:translateY(0);transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;backface-visibility:hidden}.fade-in.mui-enter,.slide-out-left.mui-leave{-webkit-transition-duration:.5s;-webkit-transition-timing-function:linear}.slide-out-up.mui-leave.mui-leave-active{-webkit-transform:translateY(-100%);transform:translateY(-100%)}.slide-out-left.mui-leave{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:translateX(0);transform:translateX(0);-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;-webkit-backface-visibility:hidden;backface-visibility:hidden}.slide-out-left.mui-leave.mui-leave-active{-webkit-transform:translateX(-100%);transform:translateX(-100%)}.fade-in.mui-enter{transition-duration:.5s;transition-timing-function:linear;opacity:0;-webkit-transition-property:opacity;transition-property:opacity}.fade-out.mui-leave,.hinge-in-from-top.mui-enter{-webkit-transition-duration:.5s;-webkit-transition-timing-function:linear}.fade-in.mui-enter.mui-enter-active{opacity:1}.fade-out.mui-leave{transition-duration:.5s;transition-timing-function:linear;opacity:1;-webkit-transition-property:opacity;transition-property:opacity}.fade-out.mui-leave.mui-leave-active{opacity:0}.hinge-in-from-top.mui-enter{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:perspective(2000px) rotateX(-90deg);transform:perspective(2000px) rotateX(-90deg);-webkit-transform-origin:top;transform-origin:top;-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:0}.hinge-in-from-bottom.mui-enter,.hinge-in-from-right.mui-enter{-webkit-transition-duration:.5s;-webkit-transition-timing-function:linear;-webkit-transition-property:opacity,-webkit-transform}.hinge-in-from-top.mui-enter.mui-enter-active{-webkit-transform:perspective(2000px) rotate(0);transform:perspective(2000px) rotate(0);opacity:1}.hinge-in-from-right.mui-enter{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:perspective(2000px) rotateY(-90deg);transform:perspective(2000px) rotateY(-90deg);-webkit-transform-origin:right;transform-origin:right;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:0}.hinge-in-from-right.mui-enter.mui-enter-active{-webkit-transform:perspective(2000px) rotate(0);transform:perspective(2000px) rotate(0);opacity:1}.hinge-in-from-bottom.mui-enter{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:perspective(2000px) rotateX(90deg);transform:perspective(2000px) rotateX(90deg);-webkit-transform-origin:bottom;transform-origin:bottom;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:0}.hinge-in-from-left.mui-enter,.hinge-in-from-middle-x.mui-enter{-webkit-transition-duration:.5s;-webkit-transition-timing-function:linear;-webkit-transition-property:opacity,-webkit-transform}.hinge-in-from-bottom.mui-enter.mui-enter-active{-webkit-transform:perspective(2000px) rotate(0);transform:perspective(2000px) rotate(0);opacity:1}.hinge-in-from-left.mui-enter{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:perspective(2000px) rotateY(90deg);transform:perspective(2000px) rotateY(90deg);-webkit-transform-origin:left;transform-origin:left;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:0}.hinge-in-from-left.mui-enter.mui-enter-active{-webkit-transform:perspective(2000px) rotate(0);transform:perspective(2000px) rotate(0);opacity:1}.hinge-in-from-middle-x.mui-enter{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:perspective(2000px) rotateX(-90deg);transform:perspective(2000px) rotateX(-90deg);-webkit-transform-origin:center;transform-origin:center;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:0}.hinge-in-from-middle-y.mui-enter,.hinge-out-from-top.mui-leave{-webkit-transition-duration:.5s;-webkit-transition-timing-function:linear;-webkit-transition-property:opacity,-webkit-transform}.hinge-in-from-middle-x.mui-enter.mui-enter-active{-webkit-transform:perspective(2000px) rotate(0);transform:perspective(2000px) rotate(0);opacity:1}.hinge-in-from-middle-y.mui-enter{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:perspective(2000px) rotateY(-90deg);transform:perspective(2000px) rotateY(-90deg);-webkit-transform-origin:center;transform-origin:center;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:0}.hinge-in-from-middle-y.mui-enter.mui-enter-active{-webkit-transform:perspective(2000px) rotate(0);transform:perspective(2000px) rotate(0);opacity:1}.hinge-out-from-top.mui-leave{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:perspective(2000px) rotate(0);transform:perspective(2000px) rotate(0);-webkit-transform-origin:top;transform-origin:top;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:1}.hinge-out-from-bottom.mui-leave,.hinge-out-from-right.mui-leave{-webkit-transition-duration:.5s;-webkit-transition-timing-function:linear;-webkit-transition-property:opacity,-webkit-transform}.hinge-out-from-top.mui-leave.mui-leave-active{-webkit-transform:perspective(2000px) rotateX(-90deg);transform:perspective(2000px) rotateX(-90deg);opacity:0}.hinge-out-from-right.mui-leave{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:perspective(2000px) rotate(0);transform:perspective(2000px) rotate(0);-webkit-transform-origin:right;transform-origin:right;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:1}.hinge-out-from-right.mui-leave.mui-leave-active{-webkit-transform:perspective(2000px) rotateY(-90deg);transform:perspective(2000px) rotateY(-90deg);opacity:0}.hinge-out-from-bottom.mui-leave{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:perspective(2000px) rotate(0);transform:perspective(2000px) rotate(0);-webkit-transform-origin:bottom;transform-origin:bottom;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:1}.hinge-out-from-left.mui-leave,.hinge-out-from-middle-x.mui-leave{-webkit-transition-duration:.5s;-webkit-transition-timing-function:linear;-webkit-transition-property:opacity,-webkit-transform}.hinge-out-from-bottom.mui-leave.mui-leave-active{-webkit-transform:perspective(2000px) rotateX(90deg);transform:perspective(2000px) rotateX(90deg);opacity:0}.hinge-out-from-left.mui-leave{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:perspective(2000px) rotate(0);transform:perspective(2000px) rotate(0);-webkit-transform-origin:left;transform-origin:left;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:1}.hinge-out-from-left.mui-leave.mui-leave-active{-webkit-transform:perspective(2000px) rotateY(90deg);transform:perspective(2000px) rotateY(90deg);opacity:0}.hinge-out-from-middle-x.mui-leave{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:perspective(2000px) rotate(0);transform:perspective(2000px) rotate(0);-webkit-transform-origin:center;transform-origin:center;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:1}.hinge-out-from-middle-y.mui-leave,.scale-in-up.mui-enter{-webkit-transition-duration:.5s;-webkit-transition-timing-function:linear;-webkit-transition-property:opacity,-webkit-transform}.hinge-out-from-middle-x.mui-leave.mui-leave-active{-webkit-transform:perspective(2000px) rotateX(-90deg);transform:perspective(2000px) rotateX(-90deg);opacity:0}.hinge-out-from-middle-y.mui-leave{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:perspective(2000px) rotate(0);transform:perspective(2000px) rotate(0);-webkit-transform-origin:center;transform-origin:center;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:1}.hinge-out-from-middle-y.mui-leave.mui-leave-active{-webkit-transform:perspective(2000px) rotateY(-90deg);transform:perspective(2000px) rotateY(-90deg);opacity:0}.scale-in-up.mui-enter{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:scale(.5);transform:scale(.5);transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:0}.scale-in-down.mui-enter,.scale-out-up.mui-leave{-webkit-transition-duration:.5s;-webkit-transition-timing-function:linear;-webkit-transition-property:opacity,-webkit-transform}.scale-in-up.mui-enter.mui-enter-active{-webkit-transform:scale(1);transform:scale(1);opacity:1}.scale-in-down.mui-enter{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:scale(1.5);transform:scale(1.5);transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:0}.scale-in-down.mui-enter.mui-enter-active{-webkit-transform:scale(1);transform:scale(1);opacity:1}.scale-out-up.mui-leave{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:scale(1);transform:scale(1);transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:1}.scale-out-down.mui-leave,.spin-in.mui-enter{-webkit-transition-duration:.5s;-webkit-transition-timing-function:linear;-webkit-transition-property:opacity,-webkit-transform}.scale-out-up.mui-leave.mui-leave-active{-webkit-transform:scale(1.5);transform:scale(1.5);opacity:0}.scale-out-down.mui-leave{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:scale(1);transform:scale(1);transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:1}.scale-out-down.mui-leave.mui-leave-active{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}.spin-in.mui-enter{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:rotate(-.75turn);transform:rotate(-.75turn);transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:0}.spin-in-ccw.mui-enter,.spin-out.mui-leave{-webkit-transition-duration:.5s;-webkit-transition-timing-function:linear;-webkit-transition-property:opacity,-webkit-transform}.spin-in.mui-enter.mui-enter-active{-webkit-transform:rotate(0);transform:rotate(0);opacity:1}.spin-out.mui-leave{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:rotate(0);transform:rotate(0);transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:1}.spin-out.mui-leave.mui-leave-active{-webkit-transform:rotate(.75turn);transform:rotate(.75turn);opacity:0}.spin-in-ccw.mui-enter{transition-duration:.5s;transition-timing-function:linear;-webkit-transform:rotate(.75turn);transform:rotate(.75turn);transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:0}.spin-in-ccw.mui-enter.mui-enter-active{-webkit-transform:rotate(0);transform:rotate(0);opacity:1}.spin-out-ccw.mui-leave{-webkit-transition-duration:.5s;transition-duration:.5s;-webkit-transition-timing-function:linear;transition-timing-function:linear;-webkit-transform:rotate(0);transform:rotate(0);-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:1}.spin-out-ccw.mui-leave.mui-leave-active{-webkit-transform:rotate(-.75turn);transform:rotate(-.75turn);opacity:0}.slow{-webkit-transition-duration:750ms!important;transition-duration:750ms!important}.linear{-webkit-transition-timing-function:linear!important;transition-timing-function:linear!important;-webkit-animation-timing-function:linear!important;animation-timing-function:linear!important}.ease{-webkit-transition-timing-function:ease!important;transition-timing-function:ease!important;-webkit-animation-timing-function:ease!important;animation-timing-function:ease!important}.ease-in{-webkit-transition-timing-function:ease-in!important;transition-timing-function:ease-in!important;-webkit-animation-timing-function:ease-in!important;animation-timing-function:ease-in!important}.ease-out{-webkit-transition-timing-function:ease-out!important;transition-timing-function:ease-out!important;-webkit-animation-timing-function:ease-out!important;animation-timing-function:ease-out!important}.ease-in-out{-webkit-transition-timing-function:ease-in-out!important;transition-timing-function:ease-in-out!important;-webkit-animation-timing-function:ease-in-out!important;animation-timing-function:ease-in-out!important}.bounce-in{-webkit-transition-timing-function:cubic-bezier(.485,.155,.24,1.245)!important;transition-timing-function:cubic-bezier(.485,.155,.24,1.245)!important;-webkit-animation-timing-function:cubic-bezier(.485,.155,.24,1.245)!important;animation-timing-function:cubic-bezier(.485,.155,.24,1.245)!important}.bounce-out{-webkit-transition-timing-function:cubic-bezier(.485,.155,.515,.845)!important;transition-timing-function:cubic-bezier(.485,.155,.515,.845)!important;-webkit-animation-timing-function:cubic-bezier(.485,.155,.515,.845)!important;animation-timing-function:cubic-bezier(.485,.155,.515,.845)!important}.bounce-in-out{-webkit-transition-timing-function:cubic-bezier(.76,-.245,.24,1.245)!important;transition-timing-function:cubic-bezier(.76,-.245,.24,1.245)!important;-webkit-animation-timing-function:cubic-bezier(.76,-.245,.24,1.245)!important;animation-timing-function:cubic-bezier(.76,-.245,.24,1.245)!important}.short-delay{-webkit-transition-delay:.3s!important;transition-delay:.3s!important;-webkit-animation-delay:.3s!important;animation-delay:.3s!important}.long-delay{-webkit-transition-delay:.7s!important;transition-delay:.7s!important;-webkit-animation-delay:.7s!important;animation-delay:.7s!important}.shake{-webkit-animation-name:shake-7;animation-name:shake-7}@-webkit-keyframes shake-7{0%,10%,20%,30%,40%,50%,60%,70%,80%,90%{-webkit-transform:translateX(7%);transform:translateX(7%)}15%,25%,35%,45%,5%,55%,65%,75%,85%,95%{-webkit-transform:translateX(-7%);transform:translateX(-7%)}}@keyframes shake-7{0%,10%,20%,30%,40%,50%,60%,70%,80%,90%{-webkit-transform:translateX(7%);transform:translateX(7%)}15%,25%,35%,45%,5%,55%,65%,75%,85%,95%{-webkit-transform:translateX(-7%);transform:translateX(-7%)}}.spin-cw{-webkit-animation-name:spin-cw-1turn;animation-name:spin-cw-1turn}@-webkit-keyframes spin-cw-1turn{0%{-webkit-transform:rotate(-1turn);transform:rotate(-1turn)}100%{-webkit-transform:rotate(0);transform:rotate(0)}}.spin-ccw{-webkit-animation-name:spin-cw-1turn;animation-name:spin-cw-1turn}@keyframes spin-cw-1turn{0%,100%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.wiggle{-webkit-animation-name:wiggle-7deg;animation-name:wiggle-7deg}@-webkit-keyframes wiggle-7deg{40%,50%,60%{-webkit-transform:rotate(7deg);transform:rotate(7deg)}35%,45%,55%,65%{-webkit-transform:rotate(-7deg);transform:rotate(-7deg)}0%,100%,30%,70%{-webkit-transform:rotate(0);transform:rotate(0)}}@keyframes wiggle-7deg{40%,50%,60%{-webkit-transform:rotate(7deg);transform:rotate(7deg)}35%,45%,55%,65%{-webkit-transform:rotate(-7deg);transform:rotate(-7deg)}0%,100%,30%,70%{-webkit-transform:rotate(0);transform:rotate(0)}}.shake,.spin-ccw,.spin-cw,.wiggle{-webkit-animation-duration:.5s;animation-duration:.5s}.infinite{-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.slow{-webkit-animation-duration:750ms!important;animation-duration:750ms!important}.fast{-webkit-transition-duration:250ms!important;transition-duration:250ms!important;-webkit-animation-duration:250ms!important;animation-duration:250ms!important}button{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}button,button:active,button:hover{outline:0}"; });
define('text!pages/welcome/welcome-card.html', ['module'], function(module) { module.exports = "<template>\n  <card-content>\n    <card-background>\n      <div class=\"main-background\" css=\"background-image: url(${context.background})\"></div>\n      <div class=\"blur-background\" css=\"background-image: url(${context.background})\"></div>\n      <div class=\"shine\"></div>\n      <div class=\"layer-1\"></div>\n      <div data-offset=\"-5\" class=\"content layer-2\">\n        <slot></slot>\n      </div>\n      <!-- <div data-offset=\"-10\" class=\"layer-3\"></div> -->\n      <!-- <div data-offset=\"-10\" class=\"layer-4\"></div> -->\n      <!-- <div data-offset=\"-5\" class=\"layer-5\"></div> -->\n    </card-background>\n  </card-content>\n</template>\n"; });
define('text!resources/app-bar/app-bar.html', ['module'], function(module) { module.exports = "<template>\n  <particle name=backdrop></particle>\n\n  <nav class=\"menu\">\n    <h1 class=\"name\"><i class=\"fi-widget\"></i>Idyuh</a></h1>\n    <ul class=\"inline-list\">\n      <li class=\"active\"><a href=\"#/\">Home</a></li>\n      <li><a href=\"#\">Blog</a></li>\n      <li><a href=\"#\">Pricing</a></li>\n    </ul>\n\n    <ul class=\"inline-list hide-for-small-only account-action\" show.bind=\"!state.authorized\">\n      <li><a href=\"#/login\">Login</a></li>\n      <li><a href=\"#/signup\" click.trigger=\"activateSignup()\">Signup</a></li>\n    </ul>\n\n    <!-- <ul class=\"inline-list hide-for-small-only account-action\" show.bind=\"auth.user\">\n      <li><a href=\"javascript:;\" click.trigger=\"logout()\">Logout</a></li>\n    </ul> -->\n    <a class=\"account hide-for-medium-up\" href=\"login-signup\"></a>\n\n    <!-- <icon align=right md=more_vert click.trigger=\"gotologin()\"></icon> -->\n  </nav>\n  <auth-nav show.bind=\"state.user\"></auth-nav>\n</template>\n"; });
define('text!resources/app-bar/user-profile.html', ['module'], function(module) { module.exports = "<template>\n  <h2>${auth.user.prefix} ${auth.user.last_name}</h2>\n  <icon type=more></icon>\n\n  <container ref=\"container\">\n    <a href=\"#/users/${auth.user.id}\">Profile</a>\n    <a href=\"#/show-down\">show down</a>\n    <a href=\"#/logout\">Logout</a>\n  </container>\n</template>\n"; });
define('text!resources/app-footer/app-footer.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"row\">\n    <div class=\"small-12 medium-6 medium-push-6 columns\">\n\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"small-12 medium-6 medium-push-6 columns\">\n      <p class=\"logo show-for-small-only\"><i class=\"fi-target\"></i> Idyuh</p>\n      <form class=\"footer-form\">\n        <div class=\"row\">\n          <div class=\"medium-9 medium-push-3 columns\">\n            <label>\n              <label for=\"email\" class=\"contact\">Contact Us</label>\n              <input type=\"email\" id=\"email\" placeholder=\"Email Address\" />\n            </label>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"medium-9 medium-push-3 columns\">\n            <label>\n              <textarea rows=\"5\" id=\"message\" placeholder=\"Message\"></textarea>\n            </label>\n          </div>\n          <div class=\"medium-9 medium-push-3 columns\">\n            <button class=\"submit\" type=\"submit\" value=\"Submit\">Send</button>\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"small-12 medium-6 medium-pull-6 columns\">\n      <p class=\"logo hide-for-small-only\"><i class=\"fi-target\"></i> Idyuh</p>\n      <p class=\"footer-links\">\n        <a href=\"#\">Home</a>\n        <a href=\"#\">Blog</a>\n        <a href=\"#\">Investor relations</a>\n        <a href=\"#\">About</a>\n        <a href=\"#\">Faq</a>\n        <a href=\"#\">Contact</a>\n      </p>\n      <ul class=\"inline-list social\">\n        <a href=\"#\"><i class=\"fi-social-facebook\"></i></a>\n        <a href=\"#\"><i class=\"fi-social-twitter\"></i></a>\n        <a href=\"#\"><i class=\"fi-social-linkedin\"></i></a>\n        <a href=\"#\"><i class=\"fi-social-github\"></i></a>\n      </ul>\n      <p class=\"copyright\">Copyright © 2015</p>\n    </div>\n  </div>\n</template>\n"; });
define('text!resources/article-list/article-list.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"row column\">\n    <h4>Articles</h4>\n    <hr>\n    <div class=\"row column\">\n      <h5 class=\"subheader\">Sample Title</h5>\n      <p>This is a bunch of teaser sample content.</p>\n    </div>\n  </div>\n</template>\n"; });
define('text!resources/auth-nav/element.html', ['module'], function(module) { module.exports = "<template>\n\n<!--   <picture class=\"profile__picture\" show.bind=\"user\">\n    <img src.bind=\"user.image\">\n  </picture> -->\n  <icon type=more></icon>\n\n  <!-- <h2>${authorized.prefix} ${authorized.last_name}</h2> -->\n  <container ref=\"container\">\n    <a href=\"#/portal\">Portal</a>\n    <a href=\"#/show-down\">show down</a>\n    <a href=\"#/logout\">Logout</a>\n  </container>\n</template>\n"; });
define('text!resources/dialog/dialog-step.html', ['module'], function(module) { module.exports = "<template>\n  <slot></slot>\n\n  <footer class=\"button-group expanded small\">\n    <button light tint=\"alert\" click.trigger=\"back()\">\n      <icon type=\"close\"></icon>\n    </button>\n    <button light tint=\"success\" click.trigger=\"next()\">\n      <icon type=\"checkmark\"></icon>\n    </button>\n  </footer>\n</template>\n"; });
define('text!resources/dialog/dialog.html', ['module'], function(module) { module.exports = "<template>\n  <dialog-container>\n    <slot></slot>\n  </dialog-container>\n</template>\n"; });
define('text!resources/dialog/login-dialog.html', ['module'], function(module) { module.exports = "<template class=\"step-dialog\">\n  <dialog steps=\"2\" complete.trigger=\"complete()\" view-model.ref=\"dialog\">\n    <dialog-step step=1>\n      <header>Choose your role!</header>\n      <section>\n        <select value.bind=\"newUser.role\">\n          <option value=\"dreamer\">dreamer</option>\n          <option value=\"investor\">investor</option>\n          <option value=\"mentor\">mentor</option>\n          <option value=\"attorney\">attorney</option>\n          <option value=\"service_provider\">service provider</option>\n          <option value=\"idyuh_admin\">admin</option>\n        </select>\n      </section>\n    </dialog-step>\n    <dialog-step step=2>\n      <label> Email\n        <input type=\"text\" name=\"user_email\" placeholder=\"Email...\" value.two-way=\"newUser.email\">\n      </label>\n\n      <label> Password\n        <input type=\"password\" name=\"user_password\" placeholder=\"Password\" value.two-way=\"newUser.password\">\n      </label>\n    </dialog-step>\n  </dialog>\n</template>\n"; });
define('text!resources/elements/action.html', ['module'], function(module) { module.exports = "<template>\n  <a href.bind=\"href || 'javascript:;'\">\n    <icon if.bind=\"icon\" md.bind=\"icon\"></icon>\n    <span class=\"text\"><slot></slot></span>\n  </a>\n</template>\n"; });
define('text!resources/elements/fab.html', ['module'], function(module) { module.exports = "<template>\n  <span class=\"fab__text\"><slot></slot></span>\n</template>\n"; });
define('text!resources/elements/icon.html', ['module'], function(module) { module.exports = "<template>\n  <slot></slot>\n</template>\n"; });
define('text!resources/elements/label.html', ['module'], function(module) { module.exports = "<template class=\"control\">\n  <slot></slot>\n  <label-border></label-border>\n</template>\n"; });
define('text!resources/elements/page-title.html', ['module'], function(module) { module.exports = "<template class=\"row\">\n  <div class=\"columns\">\n    <h2><slot></slot></h2>\n  </div>\n</template>\n"; });
define('text!resources/icons/add-box.svg', ['module'], function(module) { module.exports = "<svg height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z\"/>\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n</svg>\n"; });
define('text!resources/icons/checkmark.svg', ['module'], function(module) { module.exports = "<svg height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n    <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/>\n</svg>\n"; });
define('text!resources/icons/chevron-left.svg', ['module'], function(module) { module.exports = "<svg height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n</svg>\n"; });
define('text!resources/icons/chevron-right.svg', ['module'], function(module) { module.exports = "<svg height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n</svg>\n"; });
define('text!resources/icons/close.svg', ['module'], function(module) { module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n    <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n</svg>\n"; });
define('text!resources/icons/fiber.svg', ['module'], function(module) { module.exports = "<svg  height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M24 24H0V0h24v24z\" fill=\"none\"/>\n    <g >\n        <circle cx=\"9\" cy=\"12\" r=\"8\"/>\n        <path d=\"M17 4.26v2.09c2.33.82 4 3.04 4 5.65s-1.67 4.83-4 5.65v2.09c3.45-.89 6-4.01 6-7.74s-2.55-6.85-6-7.74z\"/>\n    </g>\n</svg>\n"; });
define('text!resources/icons/more-vert.svg', ['module'], function(module) { module.exports = "<svg fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n    <path d=\"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z\"/>\n</svg>\n"; });
define('text!resources/icons/person.svg', ['module'], function(module) { module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n    <path d=\"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\"/>\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n</svg>\n"; });
define('text!resources/page-view/page-view.html', ['module'], function(module) { module.exports = "<template>\n  <slot></slot>\n</template>\n"; });
define('text!resources/portal/element.html', ['module'], function(module) { module.exports = "<template class=\"portal-${portal.config.portalContext}\">\n  <aside ref=\"portal.aside.element\">\n    <header>\n      <nav id=\"header-nav\">\n        <a href=\"#/portal\" class=\"\">\n          <icon class=\"home\" md=\"home\"></icon>\n          <icon class=\"back\" md=\"arrow-forward\"></icon>\n        </a>\n      </nav>\n    </header>\n    <nav show.bind=\"portal.config.portalContext === 'default'\">\n      <slot name=defaultNav></slot>\n    </nav>\n    <nav show.bind=\"portal.config.portalContext === 'project'\">\n      <slot name=projectNav></slot>\n    </nav>\n  </aside>\n\n  <section class=\"portal__content\">\n    <header>\n      <h4>\n        <span>${routerConfig.title}</span>\n      </h4>\n      <!-- <status-filter options.bind=\"filterOptions\"></status-filter> -->\n\n      <nav show.bind=\"portal.navAction\" class=\"right-nav\">\n        <button click.trigger=\"portal.navAction.method($event)\">${portal.navAction.title}</button>\n      </nav>\n    </header>\n    <slot></slot>\n  </section>\n</template>\n"; });
define('text!resources/project-card/project-card-list.html', ['module'], function(module) { module.exports = "<template css=\"min-height: ${clientHeight}px\">\n  <backdrop z=\"1\" show.bind=\"_element.children.length > 4\"></backdrop>\n  <backdrop z=\"2\" show.bind=\"_element.children.length > 3\"></backdrop>\n  <slot></slot>\n</template>\n"; });
define('text!resources/project-card/project-card.html', ['module'], function(module) { module.exports = "<template oncontextmenu=\"return false;\">\n  <backdrop-circle ref=\"backdrop\"></backdrop-circle>\n  <backdrop ref=\"background\"></backdrop>\n  <slot></slot>\n</template>\n"; });
define('text!resources/select/element.html', ['module'], function(module) { module.exports = "<template>\n  <select value.two-way=\"value\" multiple.bind=\"multiple\">\n    <option repeat.for=\"option of options\" value.bind=\"option\">${option}</option>\n  </select>\n</template>\n"; });
define('text!resources/status-filter/element.html', ['module'], function(module) { module.exports = "<template>\n  <select value.two-way=\"value\">\n    <option repeat.for=\"option of options\" model.bind=\"option\">${option.name}</option>\n  </select>\n</template>\n"; });
define('text!resources/tab-bar/element.html', ['module'], function(module) { module.exports = "<template>\n  <slot></slot>\n</template>\n"; });
define('text!resources/tag-input/element.html', ['module'], function(module) { module.exports = "<template>\n  <ul class=\"selected-list\" ref=\"list\">\n    <li class=\"tag__label\">${label}</li>\n    <li repeat.for=\"item of selected\" ref=\"item.tagOption.element\">\n      <span class=\"tag\">\n        ${item.tagOption.display}\n      </span>\n    </li>\n    <form submit.trigger=\"selectOption()\" class=\"tag-input-form\">\n      <input type=\"text\" name=\"\" list=\"selectList\" ref=\"control\" value.bind=\"searchValue\">\n    </form>\n  </ul>\n  <datalist id=\"selectList\">\n    <option repeat.for=\"option of options\" value.bind=\"option[display]\">\n  </datalist>\n  <!-- <span class=\"data-list\" css=\"opacity: ${searchValue ? 1 : 0}\" ref=\"list\">\n    <label repeat.for=\"option of options | filterSearch:searchValue:display\">\n      ${option[display]}\n      <input type=\"checkbox\" model.bind=\"option\" checked.bind=\"selected\">\n    </label>\n  </span> -->\n</template>\n"; });
define('text!pages/users/dreamer/groups.html', ['module'], function(module) { module.exports = "<template>\nGroups\n</template>\n"; });
define('text!pages/users/dreamer/home.html', ['module'], function(module) { module.exports = "<template>\n\n  <section id=\"portal-home\">\n    <header id=\"welcome-header\" ref=\"header\">\n    </header>\n\n    <section>\n      <p>What would you like to do?</p>\n      <ul>\n        <li>\n          <a href=\"#/dreamer/profile\">\n            View my profile\n          </a>\n        </li>\n        <li>\n          <a href=\"#/dreamer/projects\">\n            View my projects\n          </a>\n        </li>\n        <li>\n          <a href=\"#/dreamer/reviews\">\n            Read my reviews\n          </a>\n        </li>\n        <li>\n          <a href=\"#/dreamer/projects/create\">\n            Create a new project\n          </a>\n        </li>\n      </ul>\n\n      <p>Searching for something? What would you like to find?</p>\n      <ul>\n        <li>\n          <a href=\"\">\n            Find project owners\n          </a>\n        </li>\n        <li>\n          <a href=\"\">\n            Find investors\n          </a>\n        </li>\n        <li>\n          <a href=\"\">\n            Find projects\n          </a>\n        </li>\n      </ul>\n    </section>\n  </section>\n\n</template>\n"; });
define('text!pages/users/dreamer/index.html', ['module'], function(module) { module.exports = "<template>\n  <router-view containerless></router-view>\n</template>\n<!-- <profile-banner>\n  <profile-nav>\n    <tab-bar>\n      <a repeat.for=\"row of router.navigation\" href.bind=\"row.href\" class=\"${row.isActive ? 'active' : ''}\">${row.title}</a>\n    </tab-bar>\n  </profile-nav>\n</profile-banner> -->\n"; });
define('text!pages/users/dreamer/profile.html', ['module'], function(module) { module.exports = "<template>\n\n  <section id=\"user-profile\">\n\n    <header>\n      <aside>\n        <picture>\n          <img src=\"images/user@2x.png\"></picture>\n        </picture>\n      </aside>\n      <h3>\n        <span class=\"title\">${user.prefix} ${user.firstName} ${user.middle} ${user.lastName} ${user.suffix}</span>\n        <summary>${user.email}</summary>\n      </h3>\n    </header>\n    <article>\n      <label>\n        First Name\n        <input type=\"text\" name=\"first_name\" value.bind=\"user.firstName\">\n      </label>\n      <label>\n        Last Name\n        <input type=\"text\" name=\"last_name\" value.bind=\"user.lastName\">\n      </label>\n      <label>\n        Biography\n        <textarea id=\"userBio\" value.bind=\"user.bio\"></textarea>\n      </label>\n    </article>\n  </section>\n</template>\n  <!-- <div class=\"row expanded\" id=\"user-profile\">\n    <div class=\"small-12 medium-12 column\">\n      <div class=\"row\">\n        <div class=\"small-12 medium-6 column\">\n          <div class=\"row\">\n            <div class=\"small-12 medium-3 column\">\n              <div class=\"row column align-center\">\n                <img class=\"thumbnail\" src=\"images/Nikola-Tesla-200x200.png\">\n              </div>\n              <div class=\"row align-center\">\n                <div class=\"medium-4 column\">\n                  <button href=\"#\" class=\"iconic\">\n                    <i class=\"fi-wrench\"></i>\n                  </button>\n                </div>\n                <div class=\"medium-4 column\">\n                  <button href=\"#\" class=\"iconic\">\n                    <i class=\"fi-wrench\"></i>\n                  </button>\n                </div>\n              </div>\n            </div>\n            <div class=\"small-12 medium-9 column\">\n              <h4 class=\"editable\">${profile.prefix} ${profile.first_name} ${profile.middle_initial} ${profile.last_name} ${profile.suffix}</h4>\n              <hr>\n              <p class=\"editable\">${profile.bio}</p>\n            </div>\n          </div>\n        </div>\n        <div class=\"small-12 medium-6 column\">\n          <h4>Groups</h4>\n          <hr>\n          <img class=\"thumbnail\" src=\"http://placehold.it/50x50\">\n          <img class=\"thumbnail\" src=\"http://placehold.it/50x50\">\n          <img class=\"thumbnail\" src=\"http://placehold.it/50x50\">\n          <img class=\"thumbnail\" src=\"http://placehold.it/50x50\">\n        </div>\n      </div>\n    </div>\n    <div class=\"small-12 medium-12 column\">\n      <div class=\"row\">\n        <div class=\"small-12 medium-6 column\">\n          <h4>Reviews</h4>\n          <hr>\n          <div class=\"row\">\n            <div class=\"medium-2 column\">\n              <img src=\"http://placehold.it/50x50\" alt=\"\" class=\"thumbnail\">\n            </div>\n            <div class=\"medium-10 column\">\n              <p>This is a sample review paragraph for a sample review from another user.</p>\n            </div>\n          </div>\n        </div>\n        <div class=\"small-12 medium-6 column\">\n          <article-list></article-list>\n        </div>\n      </div>\n    </div>\n  </div> -->\n<!--<template>-->\n  <!--<div class=\"row expanded\" id=\"user-profile\">-->\n    <!--<div class=\"small-12 medium-6 large-6 columns\">-->\n\n      <!--<div class=\"row\">-->\n        <!--<div class=\"small-6 medium-2 large-2 columns\">-->\n\n        <!--</div>-->\n        <!--<div class=\"small-6 medium-10 large-10 columns\">-->\n\n        <!--</div>-->\n      <!--</div>-->\n      <!--<div class=\"row\">-->\n        <!--<div class=\"small-6 medium-6 large-2 columns\">-->\n          <!--<img src=\"http://placehold.it/50x50\" alt=\"\" class=\"thumbnail\">-->\n        <!--</div>-->\n        <!--<div class=\"small-6 medium-6 large-10 columns\">-->\n          <!--<p>This is a sample review paragraph for a sample review from another user.</p>-->\n        <!--</div>-->\n      <!--</div>-->\n      <!--<div class=\"row\">-->\n        <!--<div class=\"small-6 medium-2 large-2 columns\">-->\n          <!--<img src=\"http://placehold.it/50x50\" alt=\"\" class=\"thumbnail\">-->\n        <!--</div>-->\n        <!--<div class=\"small-6 medium-10 large-10 columns\">-->\n          <!--<p>This is a sample review paragraph for a sample review from another user.</p>-->\n        <!--</div>-->\n      <!--</div>-->\n      <!--<div class=\"row\">-->\n        <!--<div class=\"small-6 medium-2 large-2 columns\">-->\n          <!--<img src=\"http://placehold.it/50x50\" alt=\"\" class=\"thumbnail\">-->\n        <!--</div>-->\n        <!--<div class=\"small-6 medium-10 large-10 columns\">-->\n          <!--<p>This is a sample review paragraph for a sample review from another user.</p>-->\n        <!--</div>-->\n      <!--</div>-->\n    <!--</div>-->\n\n    <!--<div class=\"small-12 medium-6 large-6 columns\">-->\n\n      <!--<div class=\"column\">-->\n        <!--<h4 class=\"subheader\">Sample Title</h4>-->\n        <!--<p>This is a bunch of teaser sample content.</p>-->\n      <!--</div>-->\n      <!--<div class=\"column\">-->\n        <!--<h4 class=\"subheader\">Sample Title</h4>-->\n        <!--<p>This is a bunch of teaser sample content.</p>-->\n      <!--</div>-->\n      <!--<div class=\"column\">-->\n\n      <!--</div>-->\n    <!--</div>-->\n  <!--</div>-->\n<!--</template>-->\n\n\n"; });
define('text!pages/users/dreamer/reviews.html', ['module'], function(module) { module.exports = "<template>\n  <section id=\"user-reviews\">\n    <blockquote>\n      <h4>\n        Title\n        <summary>Review Summary</summary>\n      </h4>\n      <rating>\n        &#9733; &#9733; &#9733; &#9733;\n        <span class=\"value\">\n          366 Reviews\n        </span>\n      </rating>\n      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n    </blockquote>\n  </section>\n</template>\n"; });
define('text!pages/users/dreamer/settings.html', ['module'], function(module) { module.exports = "<template>\n  <form id=\"user-settings\">\n    <label>\n      First Name\n      <input type=\"text\" name=\"first_name\" id=\"first_name\" value.bind=\"authorized.first_name\" placeholder=\"First Name\">\n    </label>\n\n    <label>\n      Last Name\n      <input type=\"text\" name=\"last_name\" id=\"last_name\" value.bind=\"authorized.last_name\" placeholder=\"Last Name\">\n    </label>\n\n    <label>\n      Biography Name\n      <textarea name=\"bio\" id=\"bio\" placeholder=\"Bio...\" value.bind=\"authorized.bio\"></textarea>\n    </label>\n\n    <label>\n      Personal Bar\n      <switch value.bind=\"state.portal.config.enablePersonalTitle\" checked.two-way=\"state.portal.config.enablePersonalTitle\" change.trigger=\"enablePersonalTitle(state.portal.config)\"></switch>\n    </label>\n  </form>\n</template>\n"; });
define('text!pages/users/investor/groups.html', ['module'], function(module) { module.exports = "<template>\nGroups\n</template>\n"; });
define('text!pages/users/investor/home.html', ['module'], function(module) { module.exports = "<template>\n\n  <section id=\"portal-home\">\n    <header id=\"welcome-header\" ref=\"header\">\n    </header>\n\n    <section>\n      <p>What would you like to do?</p>\n      <ul>\n        <li>\n          <a href=\"#/dreamer/profile\">\n            View my profile\n          </a>\n        </li>\n        <li>\n          <a href=\"#/dreamer/projects\">\n            View my projects\n          </a>\n        </li>\n        <li>\n          <a href=\"#/dreamer/reviews\">\n            Read my reviews\n          </a>\n        </li>\n        <li>\n          <a href=\"#/dreamer/projects/create\">\n            Create a new project\n          </a>\n        </li>\n      </ul>\n\n      <p>Searching for something? What would you like to find?</p>\n      <ul>\n        <li>\n          <a href=\"\">\n            Find project owners\n          </a>\n        </li>\n        <li>\n          <a href=\"\">\n            Find investors\n          </a>\n        </li>\n        <li>\n          <a href=\"\">\n            Find projects\n          </a>\n        </li>\n      </ul>\n    </section>\n  </section>\n\n</template>\n"; });
define('text!pages/users/investor/index.html', ['module'], function(module) { module.exports = "<template>\n  <router-view containerless></router-view>\n</template>\n<!-- <profile-banner>\n  <profile-nav>\n    <tab-bar>\n      <a repeat.for=\"row of router.navigation\" href.bind=\"row.href\" class=\"${row.isActive ? 'active' : ''}\">${row.title}</a>\n    </tab-bar>\n  </profile-nav>\n</profile-banner> -->\n"; });
define('text!pages/users/investor/profile.html', ['module'], function(module) { module.exports = "<template>\n\n  <section id=\"user-profile\">\n\n    <header>\n      <aside>\n        <picture>\n          <img src=\"images/user@2x.png\"></picture>\n        </picture>\n      </aside>\n      <h3>\n        <span class=\"title\">${user.prefix} ${user.firstName} ${user.middle} ${user.lastName} ${user.suffix}</span>\n        <summary>${user.email}</summary>\n      </h3>\n    </header>\n    <article>\n      <label>\n        First Name\n        <input type=\"text\" name=\"first_name\" value.bind=\"user.firstName\">\n      </label>\n      <label>\n        Last Name\n        <input type=\"text\" name=\"last_name\" value.bind=\"user.lastName\">\n      </label>\n      <label>\n        Biography\n        <textarea id=\"userBio\" value.bind=\"user.bio\"></textarea>\n      </label>\n    </article>\n  </section>\n</template>\n  <!-- <div class=\"row expanded\" id=\"user-profile\">\n    <div class=\"small-12 medium-12 column\">\n      <div class=\"row\">\n        <div class=\"small-12 medium-6 column\">\n          <div class=\"row\">\n            <div class=\"small-12 medium-3 column\">\n              <div class=\"row column align-center\">\n                <img class=\"thumbnail\" src=\"images/Nikola-Tesla-200x200.png\">\n              </div>\n              <div class=\"row align-center\">\n                <div class=\"medium-4 column\">\n                  <button href=\"#\" class=\"iconic\">\n                    <i class=\"fi-wrench\"></i>\n                  </button>\n                </div>\n                <div class=\"medium-4 column\">\n                  <button href=\"#\" class=\"iconic\">\n                    <i class=\"fi-wrench\"></i>\n                  </button>\n                </div>\n              </div>\n            </div>\n            <div class=\"small-12 medium-9 column\">\n              <h4 class=\"editable\">${profile.prefix} ${profile.first_name} ${profile.middle_initial} ${profile.last_name} ${profile.suffix}</h4>\n              <hr>\n              <p class=\"editable\">${profile.bio}</p>\n            </div>\n          </div>\n        </div>\n        <div class=\"small-12 medium-6 column\">\n          <h4>Groups</h4>\n          <hr>\n          <img class=\"thumbnail\" src=\"http://placehold.it/50x50\">\n          <img class=\"thumbnail\" src=\"http://placehold.it/50x50\">\n          <img class=\"thumbnail\" src=\"http://placehold.it/50x50\">\n          <img class=\"thumbnail\" src=\"http://placehold.it/50x50\">\n        </div>\n      </div>\n    </div>\n    <div class=\"small-12 medium-12 column\">\n      <div class=\"row\">\n        <div class=\"small-12 medium-6 column\">\n          <h4>Reviews</h4>\n          <hr>\n          <div class=\"row\">\n            <div class=\"medium-2 column\">\n              <img src=\"http://placehold.it/50x50\" alt=\"\" class=\"thumbnail\">\n            </div>\n            <div class=\"medium-10 column\">\n              <p>This is a sample review paragraph for a sample review from another user.</p>\n            </div>\n          </div>\n        </div>\n        <div class=\"small-12 medium-6 column\">\n          <article-list></article-list>\n        </div>\n      </div>\n    </div>\n  </div> -->\n<!--<template>-->\n  <!--<div class=\"row expanded\" id=\"user-profile\">-->\n    <!--<div class=\"small-12 medium-6 large-6 columns\">-->\n\n      <!--<div class=\"row\">-->\n        <!--<div class=\"small-6 medium-2 large-2 columns\">-->\n\n        <!--</div>-->\n        <!--<div class=\"small-6 medium-10 large-10 columns\">-->\n\n        <!--</div>-->\n      <!--</div>-->\n      <!--<div class=\"row\">-->\n        <!--<div class=\"small-6 medium-6 large-2 columns\">-->\n          <!--<img src=\"http://placehold.it/50x50\" alt=\"\" class=\"thumbnail\">-->\n        <!--</div>-->\n        <!--<div class=\"small-6 medium-6 large-10 columns\">-->\n          <!--<p>This is a sample review paragraph for a sample review from another user.</p>-->\n        <!--</div>-->\n      <!--</div>-->\n      <!--<div class=\"row\">-->\n        <!--<div class=\"small-6 medium-2 large-2 columns\">-->\n          <!--<img src=\"http://placehold.it/50x50\" alt=\"\" class=\"thumbnail\">-->\n        <!--</div>-->\n        <!--<div class=\"small-6 medium-10 large-10 columns\">-->\n          <!--<p>This is a sample review paragraph for a sample review from another user.</p>-->\n        <!--</div>-->\n      <!--</div>-->\n      <!--<div class=\"row\">-->\n        <!--<div class=\"small-6 medium-2 large-2 columns\">-->\n          <!--<img src=\"http://placehold.it/50x50\" alt=\"\" class=\"thumbnail\">-->\n        <!--</div>-->\n        <!--<div class=\"small-6 medium-10 large-10 columns\">-->\n          <!--<p>This is a sample review paragraph for a sample review from another user.</p>-->\n        <!--</div>-->\n      <!--</div>-->\n    <!--</div>-->\n\n    <!--<div class=\"small-12 medium-6 large-6 columns\">-->\n\n      <!--<div class=\"column\">-->\n        <!--<h4 class=\"subheader\">Sample Title</h4>-->\n        <!--<p>This is a bunch of teaser sample content.</p>-->\n      <!--</div>-->\n      <!--<div class=\"column\">-->\n        <!--<h4 class=\"subheader\">Sample Title</h4>-->\n        <!--<p>This is a bunch of teaser sample content.</p>-->\n      <!--</div>-->\n      <!--<div class=\"column\">-->\n\n      <!--</div>-->\n    <!--</div>-->\n  <!--</div>-->\n<!--</template>-->\n\n\n"; });
define('text!pages/users/investor/project-search.html', ['module'], function(module) { module.exports = "<template>\n  <header class=\"search-bar\">\n    <input type=\"search\" name=\"search\" value.bind=\"searchValue\">\n  </header>\n  <project-card-list class=\"user-projects\">\n    <project-card repeat.for=\"row of projects | searchFilter:searchValue\">\n      <header>\n        <h3>\n          <a href.bind=\"row.href\">${row.model.title}</a>\n        </h3>\n      </header>\n      <section>\n        <template if.bind=\"row.overview\">\n          <h5>Overview</h5>\n          <p>${row.overview}</p>\n        </template>\n        <template if.bind=\"row.mission\">\n          <h5>Mission</h5>\n          <p>${row.mission}</p>\n        </template>\n        <h5>Funding Goal</h5>\n        <p>$650,000</p>\n      </section>\n    </project-card>\n  </project-card-list>\n</template>\n"; });
define('text!pages/users/investor/reviews.html', ['module'], function(module) { module.exports = "<template>\n  <section id=\"user-reviews\">\n    <blockquote>\n      <h4>\n        Title\n        <summary>Review Summary</summary>\n      </h4>\n      <rating>\n        &#9733; &#9733; &#9733; &#9733;\n        <span class=\"value\">\n          366 Reviews\n        </span>\n      </rating>\n      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n    </blockquote>\n  </section>\n</template>\n"; });
define('text!pages/users/investor/settings.html', ['module'], function(module) { module.exports = "<template>\n  <form id=\"user-settings\">\n    <label>\n      First Name\n      <input type=\"text\" name=\"first_name\" id=\"first_name\" value.bind=\"authorized.first_name\" placeholder=\"First Name\">\n    </label>\n\n    <label>\n      Last Name\n      <input type=\"text\" name=\"last_name\" id=\"last_name\" value.bind=\"authorized.last_name\" placeholder=\"Last Name\">\n    </label>\n\n    <label>\n      Biography Name\n      <textarea name=\"bio\" id=\"bio\" placeholder=\"Bio...\" value.bind=\"authorized.bio\"></textarea>\n    </label>\n\n    <label>\n      Personal Bar\n      <switch value.bind=\"state.portal.config.enablePersonalTitle\" checked.two-way=\"state.portal.config.enablePersonalTitle\" change.trigger=\"enablePersonalTitle(state.portal.config)\"></switch>\n    </label>\n  </form>\n</template>\n"; });
define('text!pages/users/project/create.html', ['module'], function(module) { module.exports = "<template>\n\n  <form id=\"project-form\" submit.trigger=\"submit()\">\n    <label>\n      Title\n      <input type=\"text\" id=\"title\" name=\"title\" value.bind=\"project.title\">\n    </label>\n\n    <label>\n      Teaser\n      <input type=\"text\" id=\"teaser\" name=\"teaser\" value.bind=\"project.teaser\">\n    </label>\n\n    <label>\n      Overview\n      <input type=\"text\" id=\"overview\" name=\"overview\" value.bind=\"project.overview\">\n    </label>\n\n    <footer>\n      <button type=\"submit\" class=\"success\">Submit</button>\n      <a class=\"button alert\" href=\"#/portal/projects\">Cancel</a>\n    </footer>\n  </form>\n\n</template>\n"; });
define('text!pages/users/project/list.html', ['module'], function(module) { module.exports = "<template>\n  <project-card-list class=\"user-projects\">\n    <project-card repeat.for=\"row of user.projects\">\n      <header>\n        <h3>\n          <a href=\"javascript:;\" click.trigger=\"selectProject(row)\">${row.title}</a>\n        </h3>\n      </header>\n      <section>\n        <template if.bind=\"row.overview\">\n          <h5>Overview</h5>\n          <p>${row.overview}</p>\n        </template>\n        <template if.bind=\"row.mission\">\n          <h5>Mission</h5>\n          <p>${row.mission}</p>\n        </template>\n        <h5>Funding Goal</h5>\n        <p>$650,000</p>\n      </section>\n    </project-card>\n  </project-card-list>\n</template>\n"; });
define('text!pages/users/project/members.html', ['module'], function(module) { module.exports = "<template>\n  <section id=\"project-members\">\n    <header>\n      <h3>${project.title}</h3>\n    </header>\n    <article>\n\n      <table>\n        <thead>\n          <tr>\n            <th>Last Name</th>\n            <th>First Name</th>\n            <th>Email</th>\n            <th></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>${user.lastName}</td>\n            <td>${user.firstName}</td>\n            <td>${user.email}</td>\n            <td>\n              <icon md=\"edit\"></icon>\n            </td>\n          </tr>\n          <tr repeat.for=\"user of projectUsers\">\n            <td>${user.lastName}</td>\n            <td>${user.firstName}</td>\n            <td>${user.email}</td>\n            <td>\n              <icon md=\"edit\"></icon>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </article>\n    <footer>\n\n    </footer>\n  </section>\n</template>\n"; });
define('text!pages/users/project/overview.html', ['module'], function(module) { module.exports = "<template>\n  <section id=\"project-overview\">\n    <header>\n      <h3 tint=\"light-blue\">${project.title}</h3>\n    </header>\n    <article>\n\n      <table>\n        <thead>\n          <tr>\n            <th>Funcding Goal</th>\n            <th>Current Funding</th>\n            <th>Remaining</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>$650</td>\n            <td>$350</td>\n            <td>$300</td>\n          </tr>\n        </tbody>\n      </table>\n    </article>\n    <footer>\n\n    </footer>\n  </section>\n</template>\n"; });
define('text!pages/users/project/profile.html', ['module'], function(module) { module.exports = "<template>\n  <section id=\"project-profile\">\n    <header>\n      <h3>${project.title}</h3>\n    </header>\n\n    <article>\n      <label>\n        Title\n        <input type=\"text\" name=\"project_title\" value.bind=\"project.title\" placeholder=\"Title\">\n      </label>\n\n      <label>\n        Teaser\n        <textarea name=\"project_teaser\" value.bind=\"project.teaser\" placeholder=\"Teaser\"></textarea>\n      </label>\n\n      <label>\n        Overview\n        <textarea name=\"project_overview\" value.bind=\"project.overview\" placeholder=\"Overview\"></textarea>\n      </label>\n    </article>\n\n    <h5>Fields</h5>\n\n    <article repeat.for=\"field of project.fields\">\n      <fieldset>\n        <legend>\n          ${field.title || 'New Field'}\n          <button class=\"remove-field\" click.trigger=\"project.removeField(field)\">\n            Archive\n          </button>\n        </legend>\n        <label>\n          Title\n          <input type=\"text\" value.bind=\"field.title\" placeholder=\"Title\" ref=\"field.titleRef\">\n        </label>\n\n        <label show.bind=\"!field.hasSummary\" click.trigger=\"field.addSummary()\" class=\"field-summary\">\n          Summary\n          <div class=\"new-point\">\n            Add summary\n            <icon md=\"add\"></icon>\n          </div>\n        </label>\n\n        <label show.bind=\"field.hasSummary\" class=\"field-summary\">\n          Summary\n          <textarea value.bind=\"field.summary\" placeholder=\"Summary\" ref=\"field.summaryRef\"></textarea>\n        </label>\n\n        <label>\n          points\n          <div class=\"new-point\" click.trigger=\"field.addPoint()\" show.bind=\"!field.points.length\">\n            Add point\n            <icon md=\"add\"></icon>\n          </div>\n        </label>\n\n        <label repeat.for=\"point of field.points\" class=\"field-point\">\n          <icon click.trigger=\"field.removePoint(point)\" md=\"remove_circle\" class=\"remove\"></icon>\n          <textarea value.bind=\"point.text\" ref=\"point.nodeRef\"></textarea>\n        </label>\n\n        <label class=\"add-point\" click.trigger=\"field.addPoint()\" show.bind=\"field.points.length\">\n          points\n          <div class=\"new-point\">\n            Add point <icon md=\"add\"></icon>\n          </div>\n        </label>\n      </fieldset>\n    </article>\n  </section>\n</template>\n"; });
define('text!pages/users/user/groups.html', ['module'], function(module) { module.exports = "<template>\nGroups\n</template>\n"; });
define('text!pages/users/user/home.html', ['module'], function(module) { module.exports = "<template>\n\n  <section id=\"portal-home\">\n    <header id=\"welcome-header\" ref=\"header\">\n    </header>\n\n    <section>\n      <p>What would you like to do?</p>\n      <ul>\n        <li>\n          <a href=\"#/portal/profile\">\n            View my profile\n          </a>\n        </li>\n        <li>\n          <a href=\"#/portal/projects\">\n            View my projects\n          </a>\n        </li>\n        <li>\n          <a href=\"#/portal/reviews\">\n            Read my reviews\n          </a>\n        </li>\n        <li>\n          <a href=\"#/portal/projects/create\">\n            Create a new project\n          </a>\n        </li>\n      </ul>\n\n      <p>Searching for something? What would you like to find?</p>\n      <ul>\n        <li>\n          <a href=\"\">\n            Find project owners\n          </a>\n        </li>\n        <li>\n          <a href=\"\">\n            Find investors\n          </a>\n        </li>\n        <li>\n          <a href=\"\">\n            Find projects\n          </a>\n        </li>\n      </ul>\n    </section>\n  </section>\n\n</template>\n"; });
define('text!pages/users/user/index.html', ['module'], function(module) { module.exports = "<template>\n  <router-view containerless></router-view>\n</template>\n<!-- <profile-banner>\n  <profile-nav>\n    <tab-bar>\n      <a repeat.for=\"row of router.navigation\" href.bind=\"row.href\" class=\"${row.isActive ? 'active' : ''}\">${row.title}</a>\n    </tab-bar>\n  </profile-nav>\n</profile-banner> -->\n"; });
define('text!pages/users/user/profile.html', ['module'], function(module) { module.exports = "<template>\n\n  <section id=\"user-profile\">\n\n    <header>\n      <aside>\n        <picture>\n          <img src=\"images/user@2x.png\"></picture>\n        </picture>\n      </aside>\n      <h3>\n        <span class=\"title\">${user.prefix} ${user.firstName} ${user.middle} ${user.lastName} ${user.suffix}</span>\n        <summary>${user.email}</summary>\n      </h3>\n    </header>\n    <article>\n      <label>\n        First Name\n        <input type=\"text\" name=\"first_name\" value.bind=\"user.firstName\">\n      </label>\n      <label>\n        Last Name\n        <input type=\"text\" name=\"last_name\" value.bind=\"user.lastName\">\n      </label>\n      <label>\n        Biography\n        <textarea id=\"userBio\" value.bind=\"user.bio\"></textarea>\n      </label>\n    </article>\n  </section>\n</template>\n  <!-- <div class=\"row expanded\" id=\"user-profile\">\n    <div class=\"small-12 medium-12 column\">\n      <div class=\"row\">\n        <div class=\"small-12 medium-6 column\">\n          <div class=\"row\">\n            <div class=\"small-12 medium-3 column\">\n              <div class=\"row column align-center\">\n                <img class=\"thumbnail\" src=\"images/Nikola-Tesla-200x200.png\">\n              </div>\n              <div class=\"row align-center\">\n                <div class=\"medium-4 column\">\n                  <button href=\"#\" class=\"iconic\">\n                    <i class=\"fi-wrench\"></i>\n                  </button>\n                </div>\n                <div class=\"medium-4 column\">\n                  <button href=\"#\" class=\"iconic\">\n                    <i class=\"fi-wrench\"></i>\n                  </button>\n                </div>\n              </div>\n            </div>\n            <div class=\"small-12 medium-9 column\">\n              <h4 class=\"editable\">${profile.prefix} ${profile.first_name} ${profile.middle_initial} ${profile.last_name} ${profile.suffix}</h4>\n              <hr>\n              <p class=\"editable\">${profile.bio}</p>\n            </div>\n          </div>\n        </div>\n        <div class=\"small-12 medium-6 column\">\n          <h4>Groups</h4>\n          <hr>\n          <img class=\"thumbnail\" src=\"http://placehold.it/50x50\">\n          <img class=\"thumbnail\" src=\"http://placehold.it/50x50\">\n          <img class=\"thumbnail\" src=\"http://placehold.it/50x50\">\n          <img class=\"thumbnail\" src=\"http://placehold.it/50x50\">\n        </div>\n      </div>\n    </div>\n    <div class=\"small-12 medium-12 column\">\n      <div class=\"row\">\n        <div class=\"small-12 medium-6 column\">\n          <h4>Reviews</h4>\n          <hr>\n          <div class=\"row\">\n            <div class=\"medium-2 column\">\n              <img src=\"http://placehold.it/50x50\" alt=\"\" class=\"thumbnail\">\n            </div>\n            <div class=\"medium-10 column\">\n              <p>This is a sample review paragraph for a sample review from another user.</p>\n            </div>\n          </div>\n        </div>\n        <div class=\"small-12 medium-6 column\">\n          <article-list></article-list>\n        </div>\n      </div>\n    </div>\n  </div> -->\n<!--<template>-->\n  <!--<div class=\"row expanded\" id=\"user-profile\">-->\n    <!--<div class=\"small-12 medium-6 large-6 columns\">-->\n\n      <!--<div class=\"row\">-->\n        <!--<div class=\"small-6 medium-2 large-2 columns\">-->\n\n        <!--</div>-->\n        <!--<div class=\"small-6 medium-10 large-10 columns\">-->\n\n        <!--</div>-->\n      <!--</div>-->\n      <!--<div class=\"row\">-->\n        <!--<div class=\"small-6 medium-6 large-2 columns\">-->\n          <!--<img src=\"http://placehold.it/50x50\" alt=\"\" class=\"thumbnail\">-->\n        <!--</div>-->\n        <!--<div class=\"small-6 medium-6 large-10 columns\">-->\n          <!--<p>This is a sample review paragraph for a sample review from another user.</p>-->\n        <!--</div>-->\n      <!--</div>-->\n      <!--<div class=\"row\">-->\n        <!--<div class=\"small-6 medium-2 large-2 columns\">-->\n          <!--<img src=\"http://placehold.it/50x50\" alt=\"\" class=\"thumbnail\">-->\n        <!--</div>-->\n        <!--<div class=\"small-6 medium-10 large-10 columns\">-->\n          <!--<p>This is a sample review paragraph for a sample review from another user.</p>-->\n        <!--</div>-->\n      <!--</div>-->\n      <!--<div class=\"row\">-->\n        <!--<div class=\"small-6 medium-2 large-2 columns\">-->\n          <!--<img src=\"http://placehold.it/50x50\" alt=\"\" class=\"thumbnail\">-->\n        <!--</div>-->\n        <!--<div class=\"small-6 medium-10 large-10 columns\">-->\n          <!--<p>This is a sample review paragraph for a sample review from another user.</p>-->\n        <!--</div>-->\n      <!--</div>-->\n    <!--</div>-->\n\n    <!--<div class=\"small-12 medium-6 large-6 columns\">-->\n\n      <!--<div class=\"column\">-->\n        <!--<h4 class=\"subheader\">Sample Title</h4>-->\n        <!--<p>This is a bunch of teaser sample content.</p>-->\n      <!--</div>-->\n      <!--<div class=\"column\">-->\n        <!--<h4 class=\"subheader\">Sample Title</h4>-->\n        <!--<p>This is a bunch of teaser sample content.</p>-->\n      <!--</div>-->\n      <!--<div class=\"column\">-->\n\n      <!--</div>-->\n    <!--</div>-->\n  <!--</div>-->\n<!--</template>-->\n\n\n"; });
define('text!pages/users/user/reviews.html', ['module'], function(module) { module.exports = "<template>\n  <section id=\"user-reviews\">\n    <blockquote>\n      <h4>\n        Title\n        <summary>Review Summary</summary>\n      </h4>\n      <rating>\n        &#9733; &#9733; &#9733; &#9733;\n        <span class=\"value\">\n          366 Reviews\n        </span>\n      </rating>\n      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n    </blockquote>\n  </section>\n</template>\n"; });
define('text!pages/users/user/settings.html', ['module'], function(module) { module.exports = "<template>\n  <form id=\"user-settings\">\n    <label>\n      First Name\n      <input type=\"text\" name=\"first_name\" id=\"first_name\" value.bind=\"authorized.first_name\" placeholder=\"First Name\">\n    </label>\n\n    <label>\n      Last Name\n      <input type=\"text\" name=\"last_name\" id=\"last_name\" value.bind=\"authorized.last_name\" placeholder=\"Last Name\">\n    </label>\n\n    <label>\n      Biography Name\n      <textarea name=\"bio\" id=\"bio\" placeholder=\"Bio...\" value.bind=\"authorized.bio\"></textarea>\n    </label>\n\n    <label>\n      Personal Bar\n      <switch value.bind=\"state.portal.config.enablePersonalTitle\" checked.two-way=\"state.portal.config.enablePersonalTitle\" change.trigger=\"enablePersonalTitle(state.portal.config)\"></switch>\n    </label>\n  </form>\n</template>\n"; });
define('text!pages/users/investor/project/profile.html', ['module'], function(module) { module.exports = "<template>\n  <section id=\"public-project-profile\">\n\n    <header>\n      <h2>${profile.title}</h2>\n      <button-group>\n        <button>Contact</button>\n        <button>Members</button>\n        <button>Reviews</button>\n      </button-group>\n    </header>\n\n    <article class=\"overview\">\n      <blockquote>\n        <h4>Overview</h4>\n      </blockquote>\n      <p>${profile.overview}</p>\n    </article>\n\n    <article repeat.for=\"point of profile.points\">\n      <blockquote>\n        <h4>${point.title}</h4>\n      </blockquote>\n      <p if.bind=\"point.content\">${point.content}</p>\n\n      <ul if.bind=\"point.points.length\">\n        <li repeat.for=\"row of point.points\">\n          <p>${row.text}</p>\n        </li>\n      </ul>\n    </article>\n\n  </section>\n</template>\n"; });
define('text!pages/users/investor/project/search.html', ['module'], function(module) { module.exports = "<template>\n  <header class=\"search-bar\">\n    <input type=\"search\" name=\"search\" value.bind=\"searchValue\">\n  </header>\n  <project-card-list class=\"user-projects\">\n    <project-card repeat.for=\"row of projects | searchFilter:searchValue\">\n      <header>\n        <h3>\n          <a href.bind=\"row.href\">${row.model.title}</a>\n        </h3>\n      </header>\n      <section>\n        <template if.bind=\"row.overview\">\n          <h5>Overview</h5>\n          <p>${row.overview}</p>\n        </template>\n        <template if.bind=\"row.mission\">\n          <h5>Mission</h5>\n          <p>${row.mission}</p>\n        </template>\n        <h5>Funding Goal</h5>\n        <p>$650,000</p>\n      </section>\n    </project-card>\n  </project-card-list>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map