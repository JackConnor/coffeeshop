angular.module('braintreeTokenFactory', [])

  .factory('braintreeToken', braintreeToken);

  braintreeToken.$inject = ['$http'];

  function braintreeToken($http){
    function getBrToken() {
       return $http({
        method: 'POST'
        ,url: 'http://192.168.0.7:3000/payments/token'
        ,data: {}
      })
    }

    return getBrToken;
  }
