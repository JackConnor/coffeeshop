angular.module('vendorController', [])

  .controller('vendorCtrl', vendorCtrl);

  vendorCtrl.$inject = [];

  function vendorCtrl(){
    var vm = this;
    console.log(vm);
    // vm.socket = io( "http://192.168.0.10:3000" )
    //   vm.socket.on('test', function(t){
    //     console.log('working', t)
    //   })
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
    //     url: "http://192.168.0.10:3000/items/one",
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
    //     url: "http://192.168.0.10:3000/orders",
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
