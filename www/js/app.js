angular.module('gspreadsheet-report', ['ngRoute', 'gspreadsheet-report.services', 'gspreadsheet-report.directives', 
    'gspreadsheet-report.controllers'])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            controller: 'MainCtrl',
            templateUrl: 'partials/main.html'
        })
        .when('/view', {
            controller: 'ViewCtrl',
            templateUrl: 'partials/view.html'
        })
        .otherwise({redirectTo: '/'});
    });
