angular.module('processItemFactory', [])

  .factory('processItem', processItem);

  processItem.$inject = ['$http'];

  function processItem($http){

    function addStatus(itemId, status){
      return $http({
        method: "POST"
        ,url: 'http://52.39.40.7/menuitems/updatestatus'
        ,data: {itemId: itemId, status: status}
      })
    }
    return addStatus;
  }
