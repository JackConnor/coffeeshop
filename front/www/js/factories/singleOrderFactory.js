angular.module('singleOrderFactory', [])

  .factory('singleOrder', singleOrder);

  singleOrder.$inject = ['$http'];

  function singleOrder($http){
    function getSingleOrder(orderId){
      console.log(orderId);
      return $http({
        method: "GET"
        ,url: "http://52.39.40.7/orders/one/"+orderId
      })
    }
    return getSingleOrder;
  }
