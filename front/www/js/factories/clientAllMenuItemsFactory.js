angular.module('menuItemsFactory', [])

  .factory('menuItems', menuItems);

  menuItems.$inject = ['$http'];

  function menuItems($http){
    console.log('in factory');
    function returnItems(){
      return $http({
        method: "GET"
        ,url: "http://192.168.0.7:3000/items"
      });
    }
    return returnItems;
  }
