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
  $scope.currentOrder = [];

  $scope.data = [{id: 1, name: 'Mocha Latte', price: 5, photourl: "http://globalassets.starbucks.com/assets/219b313a91c4402cbacfb01754a50998.jpg"}, {id: 2, name: 'Mocha Latte', price: 5, photourl: "http://globalassets.starbucks.com/assets/219b313a91c4402cbacfb01754a50998.jpg"}, {id: 3, name: 'Mocha Latte', price: 5, photourl: "http://globalassets.starbucks.com/assets/219b313a91c4402cbacfb01754a50998.jpg"}]

  function openOptionsModal(){
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
    console.log(drinkDetails);
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
});
