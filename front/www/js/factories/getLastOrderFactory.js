angular.module('getLastOrderFactory', [])

  .factory('getLastOrder', getLastOrder);

  getLastOrder.$inject = ['$http'];

  function getLastOrder($http){

    function getAllOrs(orderId){
      console.log('yowza');
      return $http({
        method: "GET"
        ,url: "http://52.39.40.7/orders/one/"+orderId
      })
    }
    return getAllOrs;
  }
