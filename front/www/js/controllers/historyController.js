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
      if(window.localStorage.hasOwnProperty('lastOrder')){
        vm.lastOrder = window.localStorage.lastOrder.split('-&-').reverse();
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
              ,url: "http://192.168.0.3:3000/orders/one/"+vm.lastOrder[i]
            })
            .then(function(lastOrderObj){
              console.log(lastOrderObj);
              console.log(lastOrderObj.data.data);
              // for (var j = 0; j < lastOrderObj.data.data.menuitems.length; j++) {
              //   $http({
              //     method: "GET"
              //     ,url: 'http://192.168.0.3:3000/menuitems/full/'+lastOrderObj.data.data.menuitems[j]._id
              //   })
              //   .then(function(menuItem){
              //     console.log(menuItem);
              //     console.log(lastOrderObj);
              //     console.log(lastOrderObj.data.data);
              //     lastOrderObj.data.data.menuitems[j] = menuItem.data.data;
              //     console.log(lastOrderObj);
              //   })
              // }
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
