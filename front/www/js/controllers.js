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
  $scope.totalShots   = 0;

  $scope.data = [{id: 1, name: 'mocha latte', price: 5, photourl: "https://ardyssrecipes.files.wordpress.com/2012/12/mocha.jpg"}, {id: 2, name: 'mocha latte', price: 5, photourl: "https://ardyssrecipes.files.wordpress.com/2012/12/mocha.jpg"}, {id: 3, name: 'mocha latte', price: 5, photourl: "https://ardyssrecipes.files.wordpress.com/2012/12/mocha.jpg"}];

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
    if($(evt.currentTarget).hasClass('sizeSmall')){
      console.log('small');
      $(evt.currentTarget).css({
        backgroundColor: 'gray'
      })
    }
    else if($(evt.currentTarget).hasClass('sizeMedium')){
      console.log('med');
      $(evt.currentTarget).css({
        backgroundColor: 'gray'
      })
    }
    else if($(evt.currentTarget).hasClass('sizeLarge')){
      console.log('large');
      $(evt.currentTarget).css({
        backgroundColor: 'gray'
      })
    }
  }
  $scope.choseSize = choseSize;

  function submitDrinkOptions() {

  }




//////end client side controller
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
