angular.module('allOrdersFactory', [])

  .factory('allOrders', allOrders);

  allOrders.$inject = ['$http'];

  function allOrders($http){

    function getOrders(){
      return $http({
        method: "GET"
        ,url: 'http://192.168.0.10:3000/orders'
      })
    }
    return getOrders;
  }
