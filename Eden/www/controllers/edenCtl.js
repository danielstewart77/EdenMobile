﻿angular.module('eden', ['ngMaterial']).controller('edenCtl', function ($scope) {

    $scope.menuVisible = false;
    $scope.template = 'dashboard';

    $scope.showMenu = () => {
        //toggle
        if ($scope.menuVisible == true) {
            $scope.menuVisible = false;
        }
        else {
            $scope.menuVisible = true;
        }
    };

    $scope.show = (template) => {
        if (template) {
            $scope.template = template;
            $scope.menuVisible = false;
        }

        if ($scope.template == 'dashboard') {
            $scope.refreshCharts();
        }
    };

    $scope.refreshCharts = () => {

        var promise = $.getJSON("https://edengreen.ddns.net/moisture");
        promise.done(function (reading) {

            moistGauge('#channel0', reading.channel0, 'Basil 0');
            moistGauge('#channel1', reading.channel1, 'Habanero');
            moistGauge('#channel2', reading.channel2, 'Basil 2');
            moistGauge('#channel3', reading.channel3, 'Basil 3');

        }).fail(function (err) {
            // send error to api
        });
    };

    if ($scope.template == 'dashboard') {
        $scope.refreshCharts();
    }

}).config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('customTheme')
        .primaryPalette('grey')
        .accentPalette('orange')
        .warnPalette('red');
});