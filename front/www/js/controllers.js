angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {


})

.controller('vendorCtrl', function($http, $scope, Chats, $ionicModal) {
    var vm = this
    // console.log(io)
    vm.socket = io( "52.39.40.7" )
      vm.socket.on('test', function(t){
        console.log('working', t)
      })

    vm.socket.on('new order', function(data){
      console.log('new order', data);
    })

    $ionicModal.fromTemplateUrl('templates/my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

  console.log('yooooooo');




  function getSize(order){

    if(order.size == 'medium'){
      return 'M'
    }
    else if(order.size == 'small'){
      return 'S'
    }
    else if(order.size == 'large'){
      return 'L'
    }
  }
  $scope.getSize = getSize;

  $scope.addItem = function() {
      $scope.openModal()
  }



$scope.addNewItem =function(){
  var vm = this
  console.log(vm.data.product)
  $http({
    method: "POST",
    url: "52.39.40.7/items/one",
    data: {

        name: vm.data.product,
        price: vm.data.price,
        token: localStorage.token

  //                       name : { type: String, unique: false },
  // type : { type: String },
  // quantity: { type: Number, default: 0 },
  // price: { type: Number },
  // description: { type: String }


                }
            }).then(function(response){
                console.log(response.data)
              })
}

function getOrders(){
  console.log( 'TOKEN', localStorage.token )
  $http({
    method: "get",
    url: "52.39.40.7/orders",
    headers: {'x-access-token': localStorage.token}


            }).then(function(response){
                console.log('all the orders', response.data)
                $scope.orders = response.data.data
                console.log(response);
                for (more in response.data.data)
                  // { console.log('hello', response.data.data[more].items[0])
                {
                    $scope.orders = response.data.data[more].items[0]
                    // var hello = response.data.data[more].items[0]
                    console.log($scope.orders)

                  }
                    // console.log($scope.orders.name)
                // console.log($scope.orders)

              })


}
getOrders()

})
}
.controller('clientCtrl', function($scope, $stateParams, $location, $http, $rootScope, $timeout) {
  // $scope.chat = Chats.get($stateParams.chatId);
  $scope.optionsModal = false;
  $scope.moreOptions  = false;
  $scope.cartModal    = false;
  $scope.totalShots   = 0;
  $scope.currentDrink = {}
  $scope.currentOrder = [];
  var vm = this

  $http({
    method: 'GET'
    ,url: "52.39.40.7/items"
  })
  .then(function(items){
    console.log('y');
    console.log(items);
    $scope.data = items.data.data;
  })

  // $scope.data = [{id: 1, name: 'Mocha Latte', price: 5, photourl: "http://globalassets.starbucks.com/assets/219b313a91c4402cbacfb01754a50998.jpg"}, {id: 2, name: 'Mocha Latte', price: 5, photourl: "http://globalassets.starbucks.com/assets/219b313a91c4402cbacfb01754a50998.jpg"}, {id: 3, name: 'Mocha Latte', price: 5, photourl: "http://globalassets.starbucks.com/assets/219b313a91c4402cbacfb01754a50998.jpg"}]

  //function to create a translucent layer to block all background clicks
  function addLayer(zIndex, jqEl){
    jqEl.prepend(
      "<div class='clearLayer'></div>"
    );
    $('.clearLayer').css({
      zIndex: zIndex
    });
  }
  function addBlackLayer(zIndex, jqEl, opacity){
    jqEl.prepend(
      "<div class='blackLayer'></div>"
    );
    $('.blackLayer').css({
      zIndex: zIndex
      ,opacity: opacity
    });
  }

  function openOptionsModal(currentDrink){
    $scope.currentDrink = currentDrink;
    $scope.optionsModal = true;
  }
  $scope.openOptionsModal = openOptionsModal;

  function openMoreOptions(){
    if(!$scope.moreOptions){
      $scope.moreOptions = true;
    }
    else {
      $scope.moreOptions = false;
    }
  }
  $scope.openMoreOptions = openMoreOptions;

  function closeModal(){
    $scope.optionsModal = false;
    $scope.moreOptions  = false;
    $scope.totalShots   = 0;
  }
  $scope.closeModal = closeModal;

  function addShot(){
    $scope.totalShots++;
  }
  $scope.addShot = addShot;

  function subtractShot(){
    $scope.totalShots--;
  }
  $scope.subtractShot = subtractShot;

  function choseSize(evt){
    $('.sizeSmall').removeClass('selected');
    $('.sizeSmall').css({
      backgroundColor: 'transparent'
    })
    $('.sizeMedium').removeClass('selected');
    $('.sizeMedium').css({
      backgroundColor: 'transparent'
    })
    $('.sizeLarge').removeClass('selected');
    $('.sizeLarge').css({
      backgroundColor: 'transparent'
    })
    if($(evt.currentTarget).hasClass('sizeSmall')){
      if($(evt.currentTarget).hasClass('selected')){
        $(evt.currentTarget).css({
          backgroundColor: 'transparent'
        })
        $(evt.currentTarget).removeClass('selected')
      }
      else {
        console.log('med');
        $(evt.currentTarget).css({
          backgroundColor: '#dddddd'
        })
        $(evt.currentTarget).addClass('selected')
      }
    }
    else if($(evt.currentTarget).hasClass('sizeMedium')){
      if($(evt.currentTarget).hasClass('selected')){
        $(evt.currentTarget).css({
          backgroundColor: 'white'
        })
        $(evt.currentTarget).removeClass('selected')
      }
      else {
        console.log('med');
        $(evt.currentTarget).css({
          backgroundColor: '#dddddd'
        })
        $(evt.currentTarget).addClass('selected')
      }
    }
    else if($(evt.currentTarget).hasClass('sizeLarge')){
      if($(evt.currentTarget).hasClass('selected')){
        $(evt.currentTarget).css({
          backgroundColor: 'white'
        })
        $(evt.currentTarget).removeClass('selected')
      }
      else {
        console.log('med');
        $(evt.currentTarget).css({
          backgroundColor: '#dddddd'
        })
        $(evt.currentTarget).addClass('selected')
      }
    }
  }
  $scope.choseSize = choseSize;

  $scope.removeItem = function(something, index) {
      console.log(something)
      console.log("this is the index", index)
      $scope.currentOrder.splice(index, 1)
      console.log($scope.currentOrder)
  }

  function submitDrinkOptions() {
    var drinkDetails = {size: '', flavours: '', toppings: '', shots: 0}
    var sizeEl = $('.selected');
    if(sizeEl.hasClass('sizeSmall')){
      drinkDetails.size = 'small';
    }
    else if(sizeEl.hasClass('sizeMedium')){
      drinkDetails.size = 'medium';
    }
    else if(sizeEl.hasClass('sizeLarge')){
      drinkDetails.size = 'large';
    } else {
        console.log("no size selected")
    }

    drinkDetails.flavours = $('.flavourDropdown').val();
    drinkDetails.toppings = $('.toppingDropdown').val();
    drinkDetails.shots = $scope.totalShots;
    drinkDetails.photo = $scope.currentDrink.photourl;
    drinkDetails.price = $scope.currentDrink.price;
    drinkDetails.title = $scope.currentDrink.name;
    drinkDetails.itemId = $scope.currentDrink._id
    console.log(drinkDetails);
    ///////put all settings back to zero
    $scope.optionsModal = false;
    $scope.moreOptions  = false;
    $scope.totalShots   = 0;
    $scope.currentOrder.push(drinkDetails)
  }
  $scope.submitDrinkOptions = submitDrinkOptions;

  //////function to open shopping cart
  function openCart(){
    console.log('ipeing');
    $('.drinkRepeatContainer').animate({
      opacity: 0.0
    }, 350);
    setTimeout(function(){
      $('.cartHolder i').animate({
        fontSize: 60+"px"
        ,paddingTop: 0+'px'
        ,paddingRight: 5+'px'
        ,color: 'black'
      }, 850);
      $('.cartModalHolder').animate({
        width: 90+"%"
        ,marginLeft: 0+'%'
        ,marginTop: 30+'px'
        ,paddingTop: 10+'px'
        ,height: 450+"px"
        ,marginRight: 5+"%"
      }, 850);
    }, 250);
    setTimeout(function(){
      $('.cartModalHolder').prepend(
        "<div class='cartTitle'>Your Order</div>"
      );
      $(".cartTitle").animate({
        opacity: 1
      }, 350);
      $('.cartModalHolder').animate({
        borderWidth: 5
      }, 350);
    }, 1250);
    $timeout(function(){
      $scope.cartModal = true;
      console.log('wot?');
      addLayer(28, $('.drinkRepeatContainer'));
      // addBlackLayer(29, $('.navContainer'), .1);
    }, 1500);
  }
  $scope.openCart = openCart;

  function closeCart(){
    console.log('clising');
    $('.cartModalHolder').animate({
      borderWidth: 0
    }, 200);
    setTimeout(function(){
      $('.cartHolder i').animate({
        fontSize: 30+"px"
        ,paddingTop: 0+'px'
        ,paddingRight: 0+'px'
      }, 450);
      $('.cartModalHolder').animate({
        width: "auto"
        ,marginLeft: 0+'%'
        ,marginTop: 0+'px'
        ,paddingTop: 25+'px'
        ,height: 100+"%"
        ,marginRight: 0+"%"
      }, 450);
    }, 400);
    $('.clearLayer').remove();
    $('.blackLayer').remove();
    $('.cartTitle').remove();
    setTimeout(function(){
      $('.drinkRepeatContainer').animate({
        opacity: 1
      }, 350);
    }, 850);
    $scope.cartModal = false
  }
  $scope.closeCart = closeCart;

  function checkout(order){
      $rootScope.currentOrder = $scope.currentOrder
      $location.path('tab/payment');
  }
  $scope.checkout = checkout;
  vm.socket = io.connect('52.39.40.7/api')
  vm.socket.on('test', function(data){
    console.log('it works', data);
  })



//////end client side controller
})

.controller('AccountCtrl', function($scope) {
    $scope.whole = 40
  $scope.percent = $scope.whole / 10
    $(function(){
        var $ppc = $('.progress-pie-chart'),
            percent = parseInt($scope.whole),
            deg = 360*percent/100;
        if (percent > 50) {
            $ppc.addClass('gt-50');
        }
        $('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
        $('.ppc-percents span').html(percent+'%');
    });
})


.controller( 'LoginCtrl' , function( $scope, $http, $location, $ionicPopup ) {

    $scope.data = {}


    $scope.login = function() {
        console.log("here")
        if(($scope.data.username !== undefined) && ($scope.data.password !== undefined)){
            $http({
                method: "POST",
                url: "52.39.40.7/authenticate",
                data: {
                    user: {
                        email: $scope.data.username,
                        password: $scope.data.password
                    }
                }
            }).then(function(response){
                console.log(response)
                if (response.data.vendor === true ){
                    localStorage.admin = true
                    $location.path('/vendor')
                }
                localStorage.token = response.data.token
                $location.path('/tab/dash')
            })
        }
    }
} )


.controller('paymentCtrl', function($scope, $rootScope, $http){

  var vm = this
    vm.message = 'Please use the form below to pay:';

    console.log("sjdlfjlasdjfalsdf-=========================")
    var token = localStorage.token;
    var itemIds = [];
    var totalPrice = 0;
    console.log($rootScope.currentOrder);
    $scope.makeOrder = function() {
    for (var i = 0; i < $scope.currentOrder.length; i++) {
      itemIds.push($scope.currentOrder[i].itemId);
      totalPrice += $scope.currentOrder[i].price;
    }
    $http({
      method: "POST"
      ,url: "52.39.40.7/orders"
      ,data: {token: token, order: {items: itemIds, price: totalPrice}}
    })
    .then(function(orderResponse){
      console.log(orderResponse);
    })
    }

    $scope.isError = false;
    $scope.isPaid = false;

    $scope.getToken = function () {
      $http({
        method: 'POST'
        ,url: '52.39.40.7/payments/token'
        ,data: {}
      }).success(function (data) {

        console.log(data.client_token);


        braintree.setup(data.client_token, 'dropin', {
          container: 'checkout' ,
          // Form is not submitted by default when paymentMethodNonceReceived is implemented
          paymentMethodNonceReceived: function (event, nonce) {

            $scope.message = 'Processing your payment...';


            $http({
              method: 'POST',
              url: '52.39.40.7/payments/process',
              data: {
                amount: vm.amount,
                payment_method_nonce: nonce
              }
            }).success(function (data) {
              console.log(vm.amount)
              console.log(data.success);

              if (data.success) {
                $scope.message = 'Payment authorized, thanks.';
                $scope.isError = false;
                $scope.isPaid = true;

              } else {
                // implement your solution to handle payment failures
                console.log(vm.amount)
                $scope.message = 'Payment failed: ' + data.message + ' Please refresh the page and try again.';
                $scope.isError = true;
              }

            }).error(function (error) {
              $scope.message = 'Error: cannot connect to server. Please make sure your server is running431.';

              $scope.isError = true;
            });

          }
        });

      }).error(function (error) {
        $scope.message = 'Error: cannot connect to server. Please make sure your server is running440.';

        $scope.isError = true;
      });

    };

    $scope.getToken();

})

.controller('HistoryCtrl', function($scope, $rootScope, $http){

})

.controller('ProfileCtrl', function($scope, $rootScope, $http){

})
