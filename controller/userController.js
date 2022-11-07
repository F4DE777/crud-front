app.controller('userController',['$scope','userService',function($scope,userService){
        $scope.model = {};
        $scope.model.login = {};
        $scope.model.welcome = null;
        $scope.model.sign_up = {};
        $scope.model.setId = false;

   


        $scope.model.submitLogin = function(){
        
            var email = $scope.model.login.email;
            var password = $scope.model.login.password;

            // var data = "grant_type=password&email=" + email + "&password=" + password;


            if (password.length < 6){
                $scope.model.login.passwordError = "password must be greater that 6";
                return;
            }else{
                $scope.model.login.passwordError = ""
            }

            
            userService.login(email, password, 
                
                function (responce){
                    
                    $scope.model.userData = responce.data;

                    if(responce.data.success){
                        console.log(responce.data);

                        localStorage.setItem('token', responce.data.token)

                        $scope.model.welcome = 'Welcome '+$scope.model.userData.user.first_name;
                        localStorage.setItem("loggedInUser", $scope.model.userData.user.id);
                        $scope.model.loggedInUser = localStorage.getItem('loggedInUser');
                        if ($scope.model.loggedInUser != null) {
                            $scope.model.setId = true;
                        }
                        console.log( $scope.model.setId, "checking here")
                        // window.location = ("#/Dashborad.html")
                        window.open("#/dashboard","_self");
                        location.reload();


                    }else if(responce.data.error){

                        $scope.model.welcome = responce.data.error;
                        console.log(responce.data.error);
                        $scope.model.loggedInUser = null;
                    }
                    
                    },
                function(responce){
                    
                    $scope.model.welcome = responce.data.error;
                
                    console.log( "denied")

                    // $scope.model.loggedInUser = null;
                    // window.location = ("../SignUp/signUp.html")

                }
                )

        }

       

        // $scope.model.getUserData = function(){
        //     var loggedInUser = localStorage.getItem('loggedInUser');
            
        //     // return console.log(loggedInUser);
        //     if(loggedInUser == null || loggedInUser == undefined){
        //         return window.location = ("../Login/login.html");
        //     }

        //     userService.getUserData(loggedInUser,
        //         function(responce){
        //             if(responce.data.success){
        //                 $scope.model.loggedInUserData = responce.data.user;
        //                 $scope.model.users = responce.data.users;
        //                 $scope.model.greeting = $scope.model.loggedInUserData.first_name + ' ' + $scope.model.loggedInUserData.last_name ;
        //                 console.log($scope.model.loggedInUserData)
        //             }
        //         },
        //         function(responce){

        //         })

        // }
      

        $scope.model.checkFirst = function() {
            var loggedInUser = localStorage.getItem('loggedInUser');
            if(loggedInUser != null || loggedInUser != undefined){
                return window.location = ("#/dashboard");
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
                        window.open("#/dashboard","_self");
                    }else{
                        localStorage.setItem("loggedInUser", $scope.model.userData.user.id);
                        $scope.model.loggedInUser = localStorage.getItem('loggedInUser');
                        window.open("#/dashboard","_self");
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
                    $scope.model.welcome = 'Welcome '+$scope.model.userData.user.first_name;
                    // console.log($scope.model.userData );
                    localStorage.setItem("loggedInUser", $scope.model.userData.user.id);
                    $scope.model.loggedInUser = localStorage.getItem('loggedInUser');
                    window.open("#/dashboard","_self");
                },
                function(responce){
                    $scope.model.message = responce.data.error;
                    // console.log(responce.data.error);
                })
        }

    }]);