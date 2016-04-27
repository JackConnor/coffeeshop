angular.module('menuItemsFactory', [])

  .factory('menuItems', menuItems);

  menuItems.$inject = ['$http'];

  function menuItems($http){
    console.log('in factory');
    function returnItems(){
      return $http({
        method: "GET"
        ,url: "http://52.39.40.7/items"
      });
    }
    return returnItems;
  }
