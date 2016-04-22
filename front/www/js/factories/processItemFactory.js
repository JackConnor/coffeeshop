angular.module('processItemFactory', [])

  .factory('processItem', processItem);

  processItem.$inject = ['$http'];

  function processItem($http){

    function addStatus(itemId, status){
      return $http({
        method: "PUT"
        ,url: 'http://192.168.0.3:3000/items'
        ,data: {itemId: itemId, status: status}
      })
    }
    return addStatus;
  }
