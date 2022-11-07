var app = angular.module('myApp',['ngRoute', 'LocalStorageModule', 'angular-loading-bar'])

app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/view/home.html",
        controller: 'demoController'
    })
    // .when("/home", {
    //     templateUrl : "/view/home2.html",
    //     controller: 'demoController'
    // })
    .when("/login", {
        templateUrl : "/view/Login/login.html",
        controller: 'userController'
    })
    .when("/dashboard", {
        templateUrl : "/view/Dashboard/Dashborad.html",
        controller: 'dashboardController'
    })
    .when("/signup", {
        templateUrl : "/view/SignUp/signUp.html",
        controller: 'userController'
    })
    .when("/edit", {
        templateUrl : "/view/Edit/edit.html",
        controller: 'dashboardController'
    })
    
    .otherwise({ redirectTo: "/" });
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.controller('demoController', function($scope) {});

// app.config(['$mdThemingProvider', function ($mdThemingProvider) {
//         $mdThemingProvider.theme('default')
//         .primaryPalette('blue');
//     }]);