angular.module('allMenuitemsFactory', [])

  .factory('allMenuitems', allMenuitems);

  allMenuitems.$inject = ["$http"];

  function allMenuitems($http){

    function getAll(){
      return $http({
        method: "GET"
        ,url: "http://192.168.0.11:3000/menuitems"
      });
    }

    return getAll;
  }
