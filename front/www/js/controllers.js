angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {


})

.controller('vendorCtrl', function($http, $scope, Chats) {
  console.log('yooooooo');
  $scope.allOrders =
    [
      {flavours: 'almond', photo:"http://globalassets.starbucks.com/assets/219b313a91c4402cbacfb01754a50998.jpg", price:5, shots:0, size:"small", title:"Mocha Latte",toppings:'chocolate', name: 'susie'},
      {flavours: 'almond', photo:"http://globalassets.starbucks.com/assets/219b313a91c4402cbacfb01754a50998.jpg", price:5, shots:0, size:"medium", title:"Mocha Latte",toppings:'chocolate', name: 'susie'},
      {flavours: 'almond', photo:"http://globalassets.starbucks.com/assets/219b313a91c4402cbacfb01754a50998.jpg", price:5, shots:0, size:"large", title:"Mocha Latte",toppings:'chocolate', name: 'susie'},
      {flavours: 'almond', photo:"http://globalassets.starbucks.com/assets/219b313a91c4402cbacfb01754a50998.jpg", price:5, shots:0, size:"medium", title:"Mocha Latte",toppings:'chocolate', name: 'susie'},
      {flavours: 'almond', photo:"http://globalassets.starbucks.com/assets/219b313a91c4402cbacfb01754a50998.jpg", price:5, shots:0, size:"medium", title:"Mocha Latte",toppings:'chocolate', name: 'susie'},
      {flavours: 'almond', photo:"http://globalassets.starbucks.com/assets/219b313a91c4402cbacfb01754a50998.jpg", price:5, shots:0, size:"medium", title:"Mocha Latte",toppings:'chocolate', name: 'susie'}
  ];

  $http({
    method: 'GET'
    ,url: "http://192.168.0.21:3000/items"
  })
  .then(function(items){
    console.log(items);
  })

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

  $scope.checkout = function(){
    console.log($scope.currentOrder);
  }

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
                url: "http://192.168.0.21:3000/authenticate",
                data: {
                    user: {
                        email: $scope.data.username,
                        password: $scope.data.password
                    }
                }
            }).then(function(response){
                console.log(response)
                if (response.data.vendor === true ){
                    window.localStorage.admin = true
                    // $location.path('/tab/vendor')
                }
                window.localStorage.token = response.data.data
                $location.path('/tab/dash')
            })
        }
    }
} )
