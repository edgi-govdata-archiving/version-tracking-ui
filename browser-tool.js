'use strict';

// @see https://github.com/chriszarate/bookmarkleter/blob/master/browser-tool.js

var angular = require('angular');
var bookmarkleter = require('bookmarkleter');

var app = angular.module('myApp', []);

app.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/./);
}]);

app.controller('myController', ['$scope', function ($scope) {
  // This is the bookmarklet's source code.
  $scope.input = `
  // How far back to go, in milliseconds (7 days).
  var threshold = new Date() - 604800000;

  $('#siteView tbody tr').filter(function () {
    // Only add click handlers on the links to pages that have previous versions and that have changed recently.
    return parseInt($('td:eq(6)', this).text()) > 1 && new Date($('td:eq(8)', this).text()) >= threshold;
  }).find('td:eq(3)').css('background-color', '#ff0').end().each(function () {
    // Change the behavior of the link in the "URL" column.
    var a = $('a:eq(1)', this);

    a.click(function (event) {
      // Stop the original link from opening.
      event.preventDefault();

      // Download the page at the original link.
      var url = 'https://versionista.com' + a.attr('href');
      $.get(url, function (data) {
        // The timestamps and version IDs are stored in the HTML. We collect each
        // separately, as they may not appear in a predictable order.

        var timestamps = [];
        var timestamp_regex = /"fst":"(\d+)"/g;
        while ((match = timestamp_regex.exec(data)) !== null) {
          timestamps.push(parseInt(match[1]) * 1000);
        }

        var versions = [];
        var version_regex = /"cid":"(\d+)"/g;
        while ((match = version_regex.exec(data)) !== null) {
          versions.push(match[1]);
        }

        var compare_to_version = '0';
        timestamps.slice(2).forEach(function (timestamp, i) {
          if (timestamp >= threshold) {
            compare_to_version = versions[i + 2];
          }
        });

        window.open(url + versions[0] + ':' + compare_to_version + '/', '_blank').focus();
      })
    });
  });`;

  $scope.options = {
    days: 7,
    name: ''
  }

  $scope.error = null;

  $scope.updateBookmarklet = function (options) {
    var code = $scope.input;

    if (options.days && !isNaN(options.days)) {
      code = code.replace('604800000', parseInt(options.days) * 86400000);
    }

    // Make a bookmarklet. Capture parse errors.
    try {
      // @see https://github.com/chriszarate/bookmarkleter#options
      $scope.output = bookmarkleter(code, {anonymize: true, mangleVars: true});
      $scope.error = null;
    } catch (err) {
      $scope.output = null;
      $scope.error = err.message;
      return;
    }
  };

  $scope.updateBookmarklet($scope.options);
}]);
