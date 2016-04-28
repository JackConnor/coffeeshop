angular.module('loginController', [])

  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$http'];

  function loginCtrl($http){

    var vm = this;

    vm.login = function() {
      var BTNonce = window.location.hash.split('/')[3];
      console.log(BTNonce);
      $http({
        url: 'http://192.168.0.3:3000/payments/new_customer/'+BTNonce
        ,method: "GET"
        // ,data: 'rawr'
      })
      .then(function(data){
        console.log("data");
        console.log(data);
      })

    //     console.log("here")
    //     if((vm.data.username !== undefined) && (vm.data.password !== undefined)){
    //         $http({
    //             method: "POST",
    //             url: "http://52.39.40.7/authenticate",
    //             data: {
    //                 user: {
    //                     email: vm.data.username,
    //                     password: vm.data.password
    //                 }
    //             }
    //         }).then(function(response){
    //             console.log(response)
    //             if (response.data.vendor === true ){
    //                 localStorage.admin = true
    //                 $location.path('/vendor')
    //             }
    //             localStorage.token = response.data.token
    //             $location.path('/tab/dash')
    //         })
    //     }
    }


  ////////////////////////////////
  //////end login controller//////
  ////////////////////////////////
  }
