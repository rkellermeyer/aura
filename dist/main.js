'use strict';

System.register(['foundation-sites'], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_foundationSites) {}],
    execute: function () {
      function configure(aurelia) {
        aurelia.use.standardConfiguration().developmentLogging();

        aurelia.start().then(function () {
          return aurelia.setRoot();
        }).then($(document).foundation());
      }

      _export('configure', configure);
    }
  };
});
//# sourceMappingURL=main.js.map
