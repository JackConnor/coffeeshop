angular.module('vendorController', ['allOrdersFactory'])

  .controller('vendorCtrl', vendorCtrl);

  vendorCtrl.$inject = ['$http', 'allOrders'];

  function vendorCtrl($http, allOrders){
    var vm = this;
    vm.slideHappening = false;

    allOrders()
    .then(function(yaa){
      console.log(yaa)
      vm.orderList = yaa.data.data;
      console.log(vm.orderList);
      vm.allItems = [];
      var orderLength = vm.orderList.length;
      for (var i = 0; i < orderLength; i++) {
        for (var j = 0; j < vm.orderList[i].items.length; j++) {
          vm.allItems.push({item: vm.orderList[i].items[j], name: vm.orderList[i].name});
        }
      }
    })

    vm.orderList = ['hi'];
    vm.socket = io.connect('http://localhost:3000/');
    vm.socket.on('orderForVendor', function(data){
      console.log('raw order');
      console.log(data);
      vm.orderList.push(data.order);
      var orderId = data.order.data._id;
      /////function to get an individual order
      $http({
        method: "PATCH"
        ,url: "http://192.168.0.3:3000/orders"
        ,data: {orderId: orderId}
      })
      .then(function(orderData){
        addOrder(orderData.data.data.items, data.orderData, data.order.data.name);
      })
      // $('.ordersList').prepend(
      //   "<div class='orderCell'>"+
      //     +data.order+
      //   "</div>"
      // );
    });

    //////animations
    function addOrder(orderItems, orderSpecs, customerName){
      var name = customerName.toString();
      console.log(customerName);
      /////these are the items, as pulled from db
      var rawItems = orderItems;
      /////these are the speicifcations for the items
      var orderSpecs = orderSpecs;
      console.log(orderSpecs);
      console.log('orderItem coming');
      console.log(orderItems);
      var ordLength = orderItems.length;
      for (var i = 0; i < ordLength; i++) {
        vm.allItems.reverse();
        vm.allItems.push();
        vm.allItems.reverse();
        $('.orderContainer').prepend(
          "<div class='orderCell'>"+
            "<div orderCellTitle>"+orderItems[i].name+"  ||  "+name+"</div>"+
            "<div class='vendorCellShots'>|| Shots: "+orderSpecs[i].shots+"</div>"+
            "<div class='vendorCellFlavours'>|| "+orderSpecs[i].flavours+"</div>"+
          "</div>"
        );
        if(orderSpecs[i].shots === 0){
          $('.vendorCellShots').remove();
        }
        if(orderSpecs[i].flavours.length === 0){
          $('.vendorCellFlavours').remove();
        }
      }
    }

    function goToClientView(){
      window.location.hash = "#/tab/dash"
    }
    vm.goToClientView = goToClientView;

    ///animations
    function cellSwipeLeft(evt){
      console.log('left');
      var target = $(evt.currentTarget);
      console.log(target);
      if(!vm.slideHappening){
        if (target.hasClass('center')){
          vm.slideHappening = true;
          target.animate({
            width: '70%'
            ,backgroundColor: '#FCF5EB'
          }, 180);
          setTimeout(function(){
            vm.slideHappening = false;
          }, 180);
          target.addClass('left');
          target.removeClass('center');
        }
        else if(target.hasClass('left')){
          return;
        }
        else if(target.hasClass('right')){
          vm.slideHappening = true;
          target.animate({
            width: '100%'
            ,marginLeft: '-2px'
            ,backgroundColor: 'translucent'
          }, 180);
          setTimeout(function(){
            vm.slideHappening = false;
          }, 180);
          target.addClass('center');
          target.removeClass('right');
        }
        else {
          return;
        }
      }
      else {
        console.log('slide is happpppppening');
      }
    }
    vm.cellSwipeLeft = cellSwipeLeft;

    function cellSwipeRight(evt){
      var target = $(evt.currentTarget);
      if(!vm.slideHappening){
        if (target.hasClass('center')){
          vm.slideHappening = true;
          target.animate({
            width: '70%'
            ,marginLeft: '30%'
            ,backgroundColor: '#FCF5EB'
          }, 180);
          setTimeout(function(){
            vm.slideHappening = false;
          }, 180);
          target.addClass('right');
          target.removeClass('center');
        }
        else if(target.hasClass('left')){
          console.log('left to right');
          vm.slideHappening = true;
          target.animate({
            width: '100%'
            ,backgroundColor: 'translucent'
          }, 180);
          setTimeout(function(){
            vm.slideHappening = false;
          }, 180);
          target.addClass('center');
          target.removeClass('left');
        }
        else if(target.hasClass('right')){
          return;
        }
      }
      else {
        console.log('slide is happpppppening');
      }
    }
    vm.cellSwipeRight = cellSwipeRight;

    //
    // vm.socket.on('new order', function(data){
    //   console.log('new order', data);
    // })

    //     $ionicModal.fromTemplateUrl('templates/my-modal.html', {
    //         scope: $scope,
    //         animation: 'slide-in-up'
    //     }).then(function(modal) {
    //         $scope.modal = modal;
    //     });
    //     $scope.openModal = function() {
    //         $scope.modal.show();
    //     };
    //     $scope.closeModal = function() {
    //         $scope.modal.hide();
    //     };
    //     //Cleanup the modal when we're done with it!
    //     $scope.$on('$destroy', function() {
    //         $scope.modal.remove();
    //     });
    //     // Execute action on hide modal
    //     $scope.$on('modal.hidden', function() {
    //         // Execute action
    //     });
    //     // Execute action on remove modal
    //     $scope.$on('modal.removed', function() {
    //         // Execute action
    //     });
    //
    //   console.log('yooooooo');
    //
    //
    //
    //
    //   function getSize(order){
    //
    //     if(order.size == 'medium'){
    //       return 'M'
    //     }
    //     else if(order.size == 'small'){
    //       return 'S'
    //     }
    //     else if(order.size == 'large'){
    //       return 'L'
    //     }
    //   }
    //   $scope.getSize = getSize;
    //
    //   $scope.addItem = function() {
    //       $scope.openModal()
    //   }
    //
    //
    //
    // $scope.addNewItem =function(){
    //   var vm = this
    //   console.log(vm.data.product)
    //   $http({
    //     method: "POST",
    //     url: "http://192.168.0.3:3000/items/one",
    //     data: {
    //
    //         name: vm.data.product,
    //         price: vm.data.price,
    //         token: window.localStorage.token
    //
    //   //                       name : { type: String, unique: false },
    //   // type : { type: String },
    //   // quantity: { type: Number, default: 0 },
    //   // price: { type: Number },
    //   // description: { type: String }
    //
    //
    //                 }
    //             }).then(function(response){
    //                 console.log(response.data)
    //               })
    // }
    //
    // function getOrders(){
    //   console.log( 'TOKEN', window.localStorage.token )
    //   $http({
    //     method: "get",
    //     url: "http://192.168.0.3:3000/orders",
    //     headers: {'x-access-token': window.localStorage.token}
    //
    //
    //             }).then(function(response){
    //                 console.log('all the orders', response.data)
    //                 $scope.orders = response.data.data
    //                 console.log(response);
    //                 for (more in response.data.data)
    //                   // { console.log('hello', response.data.data[more].items[0])
    //                 {
    //                     $scope.orders = response.data.data[more].items[0]
    //                     // var hello = response.data.data[more].items[0]
    //                     console.log($scope.orders)
    //
    //                   }
    //                     // console.log($scope.orders.name)
    //                 // console.log($scope.orders)
    //
    //               })
    //
    //
    // }
    // getOrders()
    //
    // })
    //


  //////////////////////////////////
  ////////end vendor controller/////  //////////////////////////////////
  }
