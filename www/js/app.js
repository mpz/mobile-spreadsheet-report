angular.module('gspreadsheet-report', ['ngRoute', 'gspreadsheet-report.services', 'gspreadsheet-report.directives', 
    'gspreadsheet-report.controllers'])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/dashboard/:id', {
            controller: 'MainCtrl',
            templateUrl: 'partials/main.html'
        })
        .when('/add', {
            controller: 'AddDashboardCtrl',
            templateUrl: 'partials/add_dashboard.html'
        })
        .otherwise({redirectTo: '/dashboard/1'});
    });
