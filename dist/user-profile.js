'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', 'fetch'], function (_export, _context) {
  "use strict";

  var inject, HttpClient, _dec, _class, UserProfile;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_fetch) {}],
    execute: function () {
      _export('UserProfile', UserProfile = (_dec = inject(HttpClient), _dec(_class = function () {
        function UserProfile(http) {
          _classCallCheck(this, UserProfile);

          this.heading = 'User Profile';
          this.users = [];

          http.configure(function (config) {
            config.useStandardConfiguration().withBaseUrl('http://api.api.dev/');
          });

          this.http = http;
        }

        UserProfile.prototype.activate = function activate(params) {
          var _this = this;

          return this.http.fetch('user_profiles/' + params.id).then(function (response) {
            return response.json();
          }).then(function (user) {
            return _this.user = user;
          });
        };

        return UserProfile;
      }()) || _class));

      _export('UserProfile', UserProfile);
    }
  };
});
//# sourceMappingURL=user-profile.js.map
