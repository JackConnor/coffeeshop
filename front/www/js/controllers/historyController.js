angular.module('historyController', ['getLastOrderFactory'])

  .controller('historyCtrl', historyCtrl);

  historyCtrl.$inject = ['getLastOrder', '$http'];

  function historyCtrl(getLastOrder, $http){
    var vm = this;
    vm.lastOrderObj;
    vm.lastMenuItemHistory = [];
    vm.lastOrderHistory = [];
    vm.lastOrder    = [];

    function getHistory(){
      if(localStorage.hasOwnProperty('lastOrder')){
        vm.lastOrder = localStorage.lastOrder.split('-&-');
      }
      else {
        vm.lastOrder = [];
      }
    }

    function getLast(){
      getHistory();
      var lastOrderLength = vm.lastOrder.length;
      if(lastOrderLength > 0){
        for (var i = 0; i < lastOrderLength; i++) {
          if(vm.lastOrder[i] !== ''){
            $http({
              method: "GET"
              ,url: "http://52.39.40.7/orders/one/"+vm.lastOrder[i]
            })
            .then(function(lastOrderObj){
              vm.lastOrderHistory.push(lastOrderObj.data.data);
            });
          }
        }
      }
    }
    getLast();


  //////////////////////////
  /////End Controller///////
  //////////////////////////
  }
