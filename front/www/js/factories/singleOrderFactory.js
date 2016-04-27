angular.module('singleOrderFactory', [])

  .factory('singleOrder', singleOrder);

  singleOrder.$inject = ['$http'];

  function singleOrder($http){
    function getSingleOrder(orderId){
      console.log(orderId);
      return $http({
        method: "GET"
        ,url: "http://192.168.0.9:3000/orders/one/"+orderId
      })
    }
    return getSingleOrder;
  }
