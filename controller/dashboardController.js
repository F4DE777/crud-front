// var app = angular.module('myApp',["userService"]);
var app = angular.module('myApp',["userService",'ngMaterial','md.data.table'])
.config(['$mdThemingProvider', function ($mdThemingProvider) 
            {
                'use strict';
                
                $mdThemingProvider.theme('default')
                .primaryPalette('blue');
            }]);


app.controller('dashboardController',['$mdEditDialog','$scope','userService','$q','$http','$timeout',function($mdEditDialog,$scope,userService,$q,$http,$timeout){
    'use strict';
    var searchDefer = null;
        $scope.model = {};
        $scope.model.login = {};
        $scope.model.welcome = null;
        $scope.model.sign_up = {};

        
  
        

        $scope.model.submitLogin = function(){
        
            var email = $scope.model.login.email;
            var password = $scope.model.login.password;
            if (password.length < 6){
                $scope.model.login.passwordError = "password must be greater that 6";
                return;
            }else{
                $scope.model.login.passwordError = ""
            }
            // console.log(password,email, "check")

            userService.login(email, password, 
                function (responce){
                $scope.model.userData = responce.data;
                console.log($scope.model.userData)

                if(responce.data.success){
                    $scope.model.welcome = 'Welcome '+$scope.model.userData.user.first_name;
                    console.log($scope.model.userData );
                    localStorage.setItem("loggedInUser", $scope.model.userData.user.id);
                    $scope.model.loggedInUser = localStorage.getItem('loggedInUser');
                    window.location = ("../Dashboard/Dashborad.html")
                }else if(responce.data.error){

                    $scope.model.welcome = responce.data.error;
                    $scope.model.loggedInUser = null;
                    console.log(responce.data.error);

                }
                },
                function(responce){
                    
                    $scope.model.welcome = responce.data.error;
                    console.log(responce.data.error)
                    $scope.model.loggedInUser = null;
                    window.location = ("../SignUp/signUp.html")


                }
                )

        }

        $scope.model.getAllUsers = function ( pageNumber = 1 , limit = 5, searchText = '' )
        {
            searchDefer = $q.defer();

            var url = 'http://admin-manager.test/get-all-users' + "?";

            url = url + '&page='+ pageNumber;

            url = url + '&limit=' + limit;
            
            if(searchText)
                url = url + '&searchText=' + searchText;

            $http.get(url)
                .then(function(data) 
                {
                    searchDefer.resolve(data.data);
                }, function(response) 
                {
                    console.log('Something Went Wrong!', response);
                });

            return searchDefer.promise;

        }
        

        $scope.model.getUserData = function(){
            $scope.model.users={};
            var loggedInUser = localStorage.getItem('loggedInUser');
            
            $scope.limitOptions = [5, 10, 15, 25, 50];

            $scope.query = {
                order: 'name',
                limit: 5,
                page: 1,
                search: ''
            };

            $scope.model.getAllUsers ( 1 , 5, '' )
                    .then(function(data) 
                    {
                        $scope.model.users =  data; 
                    }); 

            if(loggedInUser == null || loggedInUser == undefined){
                return window.location = ("../Login/login.html");
            }


            userService.getUserData(loggedInUser,
                function(responce){
                    if(responce.data.success){
                        $scope.model.loggedInUserData = responce.data.user;
                        // console.log(responce.data)
                        // $scope.model.users = responce.data.users;
                        // console.log($scope.model.users)
                        $scope.model.greeting = $scope.model.loggedInUserData.first_name + ' ' + $scope.model.loggedInUserData.last_name ;
                        // console.log($scope.model.loggedInUserData)
                        
                    }
                },
                function(responce){

                })

               
               

        }

        $scope.model.getUserData();

        

        
        // $scope.model.getAllUsers(1,5,'')
        // .then(function(data) 
        //             {
        //                 $scope.model.users =  data; 
        //                 console.log($scope.model.users.total);
        //             }); 
        

        $scope.logPagination = function (page, limit) 
                    {
                        var searchInput =  $scope.query.search;
                        $scope.model.getAllUsers ( page , limit, searchInput )
                        .then(function ( data )
                        {
                            $scope.model.users = data;
                        });
                    }
                    
        $scope.searchFilter = function()
                    {
                        var page = $scope.query.page;
                        var limit = $scope.query.limit;
                        var searchInput =  $scope.query.search;
                        console.log($scope.query)

                        $scope.model.getAllUsers( page , limit, searchInput )
                        .then(function ( data )
                        {
                            $scope.model.users =  data; 
                            // console.log($scope.model.users);
                        });
                    }

                     //Refresh
        $scope.loadStuff = function () 
                {
                   $timeout(function () 
                    {
                        $scope.model.getAllUsers(1,15)
                .then(function(data) 
                    {
                        $scope.model.users =  data; 
                        console.log($scope.model.users);
                    }); 
                    }, 500);
                }


        $scope.model.logOut = function(){
            localStorage.removeItem('loggedInUser');
            $scope.model.loggedInUser = null;
            window.location = ("../Login/login.html")

        }

        $scope.model.checkFirst = function() {
            var loggedInUser = localStorage.getItem('loggedInUser');
            if(loggedInUser != null || loggedInUser != undefined){
                return window.location = ("../Dashboard/Dashborad.html");
            }
        }


        $scope.model.registerUser = function(){
        
            var first_name = $scope.model.sign_up.first_name;
            var last_name = $scope.model.sign_up.last_name;
            var email = $scope.model.sign_up.email;
            var password = $scope.model.sign_up.password;
            
    
            var data = {}
            data.first_name = first_name;
            data.last_name = last_name;
            data.email = email;
            data.password = password;
            // console.log(data, "check")

            userService.registerUser(data,
                function(responce){
                    $scope.model.userData = responce.data;
                    console.log($scope.model.userData)
                    $scope.model.welcome = 'Welcome '+$scope.model.userData.user.first_name;
                    console.log($scope.model.userData );
                    localStorage.setItem("loggedInUser", $scope.model.userData.user.id);
                    $scope.model.loggedInUser = localStorage.getItem('loggedInUser');
                    window.location = ("../Dashboard/Dashborad.html")
                },
                function(responce){
                    $scope.model.message = responce.data.error;
                    console.log(responce.data.error);
                    $scope.model.loggedInUser = null;
                })
        }

        $scope.model.editUser = function(user){
            
            // return console.log('edit',user);
            localStorage.setItem("editUserID", user.id);
            localStorage.setItem("editUserFN", user.first_name);
            localStorage.setItem("editUserLN", user.last_name);
            localStorage.setItem("editUserRL", user.role_pivot.role_id);
            localStorage.setItem("editUserEM", user.email);
            window.location = ("../Edit/editData.html") 
            
        }
      

        $scope.model.deleteUser = function(id){
            
            userService.deleteUser(id,
                function(responce){
                    $scope.model.userData = responce.data;
                    localStorage.removeItem("editUserID");
                    localStorage.removeItem("editUserFN");
                    localStorage.removeItem("editUserLN");
                    localStorage.removeItem("editUserRL");
                    localStorage.removeItem("editUserEM");
                    window.location.reload();
                },
                function(responce){
                    $scope.model.message = responce.data.error;
                    // console.log(responce.data.error);
                    
                })

            // return console.log('edit',user);
           
        }
        $scope.dataTableOpt = {
           "aLengthMenu": [[5,10, 25, 50, 100,-1], [5,10, 25,50, 100,'All']],
           "sPaginationType": "full_numbers"
           };

           $scope.model.add = function(){
            window.location = ("../SignUp/signUp.html")

           }


    }]);