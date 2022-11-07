app.factory('authInterceptorService', ['$q', '$injector','$location', function ($q, $injector,$location) {

    var authInterceptorServiceFactory = {};
    var $http;

    var _request = function (config) {

        config.headers = config.headers || {};
       
        var authData = localStorage.getItem('token');
        // console.log(authData)
        // var authData = localStorage.getItem('token');
        if (authData) {
            // console.log(authData,'uhafuhfaeuhwjenew')
            // config.headers.Authorization = 'Bearer ' + authData;
            // console.log(config.headers.Authorization)
        }

        return config;
    }

    var _responseError = function (rejection) {
        var deferred = $q.defer();
        if (rejection.status === 401) {
            var authService = $injector.get('authService');
            authService.refreshToken().then(function (response) {
                _retryHttpRequest(rejection.config, deferred);
            }, function () {
                authService.logOut();
                $location.path('#/login');
                deferred.reject(rejection);
            });
        } else {
            deferred.reject(rejection);
        }
        return deferred.promise;
    }

    var _retryHttpRequest = function (config, deferred) {
        $http = $http || $injector.get('$http');
        $http(config).then(function (response) {
            deferred.resolve(response);
        }, function (response) {
            deferred.reject(response);
        });
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);