var app = angular.module('InnoTmapp', ['ngRoute', 'LocalStorageModule', 'oitozero.ngSweetAlert']);

app.config(function ($routeProvider) {
    $routeProvider.when('/Home', {
        templateUrl: 'App/View/home.html',
        controller: 'homeController'
    })

    $routeProvider.when('/Contact', {
        templateUrl: 'App/View/contactus.html',
        controller: 'contactController'
    })

    $routeProvider.when('/Dashboard', {
        templateUrl: 'App/View/dashboard.html',
        controller: 'dashboardController'
    })

    $routeProvider.otherwise({
        redirectTo: "/Home",
    });
});