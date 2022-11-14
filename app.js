var myApp = angular.module('myApp', [
    'ngMaterial',
    'ngRoute',
    'ngMessages',
    'LocalStorageModule',
    'md.data.table',
]);


myApp.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/views/home.html",
        controller: 'appController'
    })

    .when("/login", {
        templateUrl : "/views/login.html",
        controller: 'loginController'
    })

    .when("/register", {
        templateUrl : "/views/register.html",
        controller: 'registerController'
    })

    .otherwise({ redirectTo: "/" });
});

myApp.component('navigation', {
templateUrl: 'components/navigation.html'
});