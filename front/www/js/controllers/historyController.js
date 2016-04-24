angular.module('historyController', ['getLastOrderFactory'])

  .controller('historyCtrl', historyCtrl);

  historyCtrl.$inject = ['getLastOrder', '$http'];

  function historyCtrl(getLastOrder, $http){
    var vm = this;
    // console.log(getLastOrder());
    console.log('in history...');

    if(window.localStorage.hasOwnProperty('lastOrder')){
      vm.lastOrder = window.localStorage.lastOrder;
    }
    else {
      vm.lastOrder = 0;
    }
    function getLast(){
      if(vm.lastOrder.length > 1){
        console.log('running');
        $http({
          method: "GET"
          ,url: "http://192.168.0.3:3000/orders/one/"+vm.lastOrder
        })
        .then(function(lastOrderObj){
          console.log(lastOrderObj);
          $http({
            method: "GET"
            ,url: 'http://192.168.0.3:3000/menuitems/full/'+lastOrderObj.data.data.menuitems[0]._id
          })
          .then(function(menuItem){
            console.log(menuItem);
            vm.lastMenuItem = menuItem.data.data
            console.log(vm.lastMenuItem);
          })
          vm.lastOrderObj = lastOrderObj.data;
        });
      }
    }
    getLast();


  //////////////////////////
  /////End Controller///////
  //////////////////////////
  }
