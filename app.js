var myApp = angular.module("myApp",[
            'ui.router',
            // 'ngMaterial',
            // 'md.data.table', 
            // 'fixed.table.header', 
        'ngRoute',  
        'LocalStorageModule',
        // 'fixed.table.header',
        'angular-loading-bar',
        // 'md.data.table',
        // 'ngMaterial',
        'ngMessages',
        'myAppHomeCtrl',
        'myAppUserCtrl'
    ]);

// angular.injector(['myApp', 'ngMaterial']);


    myApp.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/view/home.html",
        controller: 'demoController'
    })

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

myApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

myApp.controller('demoController', function($scope) {});

