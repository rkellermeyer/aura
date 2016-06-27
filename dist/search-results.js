'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', 'fetch'], function (_export, _context) {
  "use strict";

  var inject, HttpClient, _dec, _class, SearchResults;

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
      _export('SearchResults', SearchResults = (_dec = inject(HttpClient), _dec(_class = function () {
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
      }()) || _class));

      _export('SearchResults', SearchResults);
    }
  };
});
//# sourceMappingURL=search-results.js.map
