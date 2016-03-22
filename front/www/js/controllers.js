angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('vendorCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('clientCtrl', function($scope, $stateParams, Chats) {
  // $scope.chat = Chats.get($stateParams.chatId);
  $scope.optionsModal = false;
  $scope.moreOptions  = false;
  $scope.cartModal    = false;
  $scope.totalShots   = 0;
  $scope.currentDrink = {}
  $scope.currentOrder = [];

  $scope.data = [{id: 1, name: 'Mocha Latte', price: 5, photourl: "http://globalassets.starbucks.com/assets/219b313a91c4402cbacfb01754a50998.jpg"}, {id: 2, name: 'Mocha Latte', price: 5, photourl: "http://globalassets.starbucks.com/assets/219b313a91c4402cbacfb01754a50998.jpg"}, {id: 3, name: 'Mocha Latte', price: 5, photourl: "http://globalassets.starbucks.com/assets/219b313a91c4402cbacfb01754a50998.jpg"}]

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
      backgroundColor: 'white'
    })
    $('.sizeMedium').removeClass('selected');
    $('.sizeMedium').css({
      backgroundColor: 'white'
    })
    $('.sizeLarge').removeClass('selected');
    $('.sizeLarge').css({
      backgroundColor: 'white'
    })
    if($(evt.currentTarget).hasClass('sizeSmall')){
      if($(evt.currentTarget).hasClass('selected')){
        $(evt.currentTarget).css({
          backgroundColor: 'white'
        })
        $(evt.currentTarget).removeClass('selected')
      }
      else {
        console.log('med');
        $(evt.currentTarget).css({
          backgroundColor: 'gray'
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
          backgroundColor: 'gray'
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
          backgroundColor: 'gray'
        })
        $(evt.currentTarget).addClass('selected')
      }
    }
  }
  $scope.choseSize = choseSize;

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
    }
    drinkDetails.flavours = $('.flavourDropdown').val();
    drinkDetails.toppings = $('.toppingDropdown').val();
    drinkDetails.shots = $scope.totalShots;
    drinkDetails.photo = $scope.currentDrink.photourl;
    drinkDetails.price = $scope.currentDrink.price;
    drinkDetails.title = $scope.currentDrink.name;
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
    $scope.cartModal = true;
    setTimeout(function(){
      $('.shoppingCartModal').animate({
        marginLeft: '0px'
      }, 300);
    }, 5);
  }
  $scope.openCart = openCart;

  function closeCart(){
    console.log('clising');
    $('.shoppingCartModal').animate({
      marginLeft: '110%'
    }, 300);
    setTimeout(function(){
      $scope.cartModal = false;
    }, 300);
  }
  $scope.closeCart = closeCart;


//////end client side controller
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller( 'LoginCtrl' , function( $scope, $http, $location, $ionicPopup ) {

    $scope.data = {}
    
    $scope.login = function() {
        console.log("here")
        if(($scope.data.username !== undefined) && ($scope.data.password !== undefined)){
            $http({
                method: "POST",
                url: "http://192.168.0.21:3000/authenticate",
                data: {
                    user: {
                        email: $scope.data.username,
                        password: $scope.data.password
                    }
                }
            }).then(function(response){
                console.log(response)
                window.localStorage.token = response.data.data
                $location.path('/tab/dash')
            })
        }
    }
} )

.controller('paymentCtrl', function($scope, $http){

  var vm = this
    $scope.message = 'Please use the form below to pay:';


    
    $scope.isError = false;
    $scope.isPaid = false;

    $scope.getToken = function () {
      $http({
        method: 'POST',
        url: 'http://localhost:3000/payments/token'
      }).success(function (data) {

        console.log(data.client_token);


        braintree.setup(data.client_token, 'dropin', {
          container: 'checkout' ,
          // Form is not submitted by default when paymentMethodNonceReceived is implemented
          paymentMethodNonceReceived: function (event, nonce) {

            $scope.message = 'Processing your payment...';
            

            $http({
              method: 'POST',
              url: 'http://localhost:3000/payments/process',
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
              $scope.message = 'Error: cannot connect to server. Please make sure your server is running.';
        
              $scope.isError = true;
            });

          }
        });

      }).error(function (error) {
        $scope.message = 'Error: cannot connect to server. Please make sure your server is running.';
        
        $scope.isError = true;
      });

    };

    $scope.getToken();

})