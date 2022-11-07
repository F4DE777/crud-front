app.factory('userService', ['$http',function($http){

    function login(email, password,onSuccess, onError){
        var params = {
            email: email,
            password: password
        }
        $http.get('http://127.0.0.1:8000/api/login',{params : params})

        .then( 
            function(responce){
                if(responce.data.success){
                    onSuccess(responce)
                }else{
                    onError(responce)   
                }
            }, 

            function(responce){
                onError(responce)
            }
        )
    }

    function getUserData (user_id, onSuccess,onError){
        var params = {
            user_id: user_id
        }

        $http.get('http://127.0.0.1:8000/api/auth/get-user-data',{params:params})

        .then( 
            function(responce){
                if(responce.data.success){
                    onSuccess(responce)
                }else{
                    onError(responce)
                }
            }, 

            function(responce){
                onError(responce)
            }
        )
    }
    
    function getAllUsers (user_id, onSuccess,onError){
        var params = {
            user_id: user_id
        }

        $http.get('http://127.0.0.1:8000/api/auth/get-all-users',{params:params})

        .then( 
            function(responce){
                if(responce.data.success){
                    onSuccess(responce)
                }else{
                    onError(responce)
                }
            }, 

            function(responce){
                onError(responce)
            }
        )
    }


    function registerUser (data, onSuccess, onError){
       var params = {
           data: data,
       }

       $http.post('http://127.0.0.1:8000/api/auth/sign-up',JSON.stringify(params))

       .then( 
        function(responce){
            if(responce.data.success){
                onSuccess(responce)
            }else{
                onError(responce)
            }
        }, 

        function(responce){
            onError(responce)
        }
    )
    }

    function editUser (data, onSuccess, onError){
        var params = {
            data: data,
        }
 
        $http.post('http://127.0.0.1:8000/api/auth/edit',JSON.stringify(params))
 
        .then( 
         function(responce){
             if(responce.data.success){
                 onSuccess(responce)
             }else{
                 onError(responce)
             }
         }, 
 
         function(responce){
             onError(responce)
         }
     )
     }

     function deleteUser (id, onSuccess, onError){
        var params = {
            id: id,
        }
 
        $http.post('http://127.0.0.1:8000/api/auth/delete',JSON.stringify(params))
 
        .then( 
         function(responce){
             if(responce.data.success){
                 onSuccess(responce)
             }else{
                 onError(responce)
             }
         }, 
 
         function(responce){
             onError(responce)
         }
     )
     }


    return {
        login:login,
        getUserData:getUserData,
        registerUser:registerUser,
        editUser:editUser,
        deleteUser:deleteUser,
    }


}])



