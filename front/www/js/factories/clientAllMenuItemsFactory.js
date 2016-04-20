angular.module('menuItemsFactory', [])

  .factory('menuItems', menuItems);

  menuItems.$inject = ['$http'];

  function menuItems($http){

    function returnItems(){
      return $http({
        method: "GET"
        ,url: "http://192.168.0.18:3000/items"
      });
    }

    return returnItems;
  }
