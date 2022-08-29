var app = angular.module('myApp',["userService"]);
// var app = angular.module('myApp',["userService","ui.bootstrap","ui.utils"]);


app.controller('userController',['$scope','userService',function($scope,userService){
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
                    console.log(responce.data.error);
                    $scope.model.loggedInUser = null;
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

        $scope.model.getUserData = function(){
            var loggedInUser = localStorage.getItem('loggedInUser');
            
            // return console.log(loggedInUser);
            if(loggedInUser == null || loggedInUser == undefined){
                return window.location = ("../Login/login.html");
            }

            userService.getUserData(loggedInUser,
                function(responce){
                    if(responce.data.success){
                        $scope.model.loggedInUserData = responce.data.user;
                        $scope.model.users = responce.data.users;
                        $scope.model.greeting = $scope.model.loggedInUserData.first_name + ' ' + $scope.model.loggedInUserData.last_name ;
                        console.log($scope.model.loggedInUserData)
                    }
                },
                function(responce){

                })

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
            var role = $scope.model.sign_up.role;
    
            var data = {}
            data.first_name = first_name;
            data.last_name = last_name;
            data.email = email;
            data.password = password;
            data.role = role;
            // console.log(data, "check")

            userService.registerUser(data,
                function(responce){
                    $scope.model.userData = responce.data;
                    console.log($scope.model.userData)
                    $scope.model.welcome = 'Welcome '+$scope.model.userData.user.first_name;
                    console.log($scope.model.userData );
                    if(localStorage.getItem("loggedInUser")){
                        window.location = ("../Dashboard/Dashborad.html")
                    }else{
                        localStorage.setItem("loggedInUser", $scope.model.userData.user.id);
                        $scope.model.loggedInUser = localStorage.getItem('loggedInUser');
                        window.location = ("../Dashboard/Dashborad.html")
                    }
                    
                },
                function(responce){
                    $scope.model.message = responce.data.error;
                    console.log(responce.data.error);
                    $scope.model.loggedInUser = null;
                })
        }

        $scope.dataTableOpt = {
            //custom datatable options 
           // or load data through ajax call also
           "aLengthMenu": [[5,10, 25, 50, 100,-1], [5,10, 25,50, 100,'All']],
           "sPaginationType": "full_numbers"
           };

           $scope.model.getEditData = function(){
            $scope.model.sign_up.id = localStorage.getItem("editUserID");
            $scope.model.sign_up.first_name = localStorage.getItem("editUserFN");
            $scope.model.sign_up.last_name = localStorage.getItem("editUserLN");
            $scope.model.sign_up.role = localStorage.getItem("editUserRL");
            $scope.model.sign_up.email = localStorage.getItem("editUserEM");
            // console.log(data)
           }

           $scope.model.editUser = function(){
        
            var first_name = $scope.model.sign_up.first_name;
            var last_name = $scope.model.sign_up.last_name;
            var email = $scope.model.sign_up.email;
            var role = $scope.model.sign_up.role;
            var id = $scope.model.sign_up.id;

    
            var data = {}
            data.first_name = first_name;
            data.last_name = last_name;
            data.email = email;
            data.role = role;
            data.id = id;

            // console.log(data, "check")

            userService.editUser(data,
                function(responce){
                    $scope.model.userData = responce.data;
                    // console.log($scope.model.userData)
                    // $scope.model.welcome = 'Welcome '+$scope.model.userData.user.first_name;
                    // console.log($scope.model.userData );
                    // localStorage.setItem("loggedInUser", $scope.model.userData.user.id);
                    // $scope.model.loggedInUser = localStorage.getItem('loggedInUser');
                    window.location = ("../Dashboard/Dashborad.html")
                },
                function(responce){
                    $scope.model.message = responce.data.error;
                    // console.log(responce.data.error);
                })
        }

    }]);