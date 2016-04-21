angular.module('braintreeProcessFactory', [])

  .factory('braintreeProcess', braintreeProcess);

  braintreeProcess.$inject = [];

  function braintreeProcess($http, price, nonce){
    console.log(price);
    console.log(nonce);
    console.log($http);
    function processPayment(price, nonce){
      console.log(price);
      console.log(nonce);
      return $http({
        method: 'POST',
        url: 'http://192.168.0.3:3000/payments/process',
        data: {
          amount: price,
          payment_method_nonce: nonce
        }
      })
    }
    return processPayment;

  }
