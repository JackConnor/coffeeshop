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


//////end client side controller
  function expandModal(){
    // $('.optionsModal').height(450px)
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
