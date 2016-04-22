angular.module('getLastOrderFactory', [])

  .factory('getLastOrder', getLastOrder);

  getLastOrder.$inject = ['$http'];

  function getLastOrder($http){

    function getAllOrs(orderId){
      console.log('yowza');
      return $http({
        method: "GET"
        ,url: "http://192.168.0.11:3000/orders/one/"+orderId
      })
    }
    return getAllOrs;
  }
