angular.module('allMenuitemsFactory', [])

  .factory('allMenuitems', allMenuitems);

  allMenuitems.$inject = ["$http"];

  function allMenuitems($http){

    function getAll(){
      return $http({
        method: "GET"
        ,url: "http://52.39.40.7/menuitems"
      });
    }

    return getAll;
  }
