angular.module('braintreeProcessFactory', [])

  .factory('braintreeProcess', braintreeProcess);

  braintreeProcess.$inject = ["$http"];

  function braintreeProcess($http){
    function processPayment(price, nonce){
      console.log(price);
      console.log(nonce);
      return price;
      return $http({
        method: 'POST',
        url: 'http://52.39.40.7/payments/process',
        data: {
          amount: price,
          payment_method_nonce: nonce
        }
      })
    }
    return processPayment;

  }
