angular.module('vendorController', [])

  .controller('vendorCtrl', vendorCtrl);

  vendorCtrl.$inject = ['$http'];

  function vendorCtrl($http){
    var vm = this;

    vm.orderList = ['hi'];
    console.log(vm);
    vm.socket = io.connect('http://localhost:3000/');
    console.log(vm.socket);
    vm.socket.on('orderForVendor', function(data){
      console.log(data);
      vm.orderList.push(data.order);
      console.log('working');
      console.log(vm.orderList);
      var orderId = data.order.data._id;
      console.log(orderId);
      $http({
        method: "PATCH"
        ,url: "http://192.168.0.18:3000/orders"
        ,data: {orderId: orderId}
      })
      .then(function(data){
        console.log('order info callback');
        console.log(data.data.data);
        console.log(data.data.data.items);
        addOrder(data.data.data.items);
      })
      // $('.ordersList').prepend(
      //   "<div class='orderCell'>"+
      //     +data.order+
      //   "</div>"
      // );
    });

    //////animations
    function addOrder(orderItems){
      console.log(orderItems);
      var ordLength = orderItems.length;
      for (var i = 0; i < ordLength; i++) {
        console.log(orderItems[i]);
        console.log(orderItems[i].name);
        var name = orderItems[i].name.toString();
        console.log(name);
        $('.ordersList').prepend(
          "<div class='orderVendorCell'>"+
          name+
          "</div>"
        );
      }
    }
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
    //     url: "http://192.168.0.18:3000/items/one",
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
    //     url: "http://192.168.0.18:3000/orders",
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
