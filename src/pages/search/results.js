import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class SearchResults {
  heading = 'Search Results';
  users = [];

  constructor(http) {
    http.configure(config => {
      config
          .useStandardConfiguration()
          .withBaseUrl('https://api.github.com/');
    });

    this.http = http;
  }

  activate() {
    // return this.http.fetch('users')
    //     .then(response => response.json())
    //     .then(users => this.users = users);

    $(document).ready(function() {
      $('ul.menu.search-tabs li a').bind('click', function(e) {
        var tab = $(e.toElement.parentElement);
        if (tab.hasClass('active')) {
          return
        } else {
          toogleResults(tab);
        }
      });

      var toogleResults = function(tab) {
        $('ul.menu.search-tabs li').removeClass('active');
        tab.addClass('active');

        $('.search-results').toggleClass('hidden');
      }
    });
  }
}
