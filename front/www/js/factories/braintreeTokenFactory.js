angular.module('braintreeTokenFactory', [])

  .factory('braintreeToken', braintreeToken);

  braintreeToken.$inject = ['$http'];

  function braintreeToken($http){
    function getBrToken() {
       return $http({
        method: 'POST'
        ,url: 'http://52.39.40.7/payments/token'
        ,data: {}
      })
    }

    return getBrToken;
  }
