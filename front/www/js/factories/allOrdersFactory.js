angular.module('allOrdersFactory', [])

  .factory('allOrders', allOrders);

  allOrders.$inject = ['$http'];

  function allOrders($http){

    function getOrders(){
      return $http({
        method: "GET"
        ,url: 'http://52.39.40.7/orders'
      })
    }
    return getOrders;
  }
