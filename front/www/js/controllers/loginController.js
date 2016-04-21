angular.module('loginController', [])

  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = [];

  function loginCtrl(){
    var vm = this;

    vm.data = {}


    vm.login = function() {
        console.log("here")
        if((vm.data.username !== undefined) && (vm.data.password !== undefined)){
            $http({
                method: "POST",
                url: "http://192.168.0.10:3000/authenticate",
                data: {
                    user: {
                        email: vm.data.username,
                        password: vm.data.password
                    }
                }
            }).then(function(response){
                console.log(response)
                if (response.data.vendor === true ){
                    window.localStorage.admin = true
                    $location.path('/vendor')
                }
                window.localStorage.token = response.data.token
                $location.path('/tab/dash')
            })
        }
    }


  ////////////////////////////////
  //////end login controller//////
  ////////////////////////////////
  }
