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
  $scope.chat = Chats.get($stateParams.chatId);
  console.log('yooooo');


  $scope.data = [{id: 1, name: 'mocha latte', price: 5, photourl: "https://ardyssrecipes.files.wordpress.com/2012/12/mocha.jpg"}, {id: 2, name: 'mocha latte', price: 5, photourl: "https://ardyssrecipes.files.wordpress.com/2012/12/mocha.jpg"}, {id: 3, name: 'mocha latte', price: 5, photourl: "https://ardyssrecipes.files.wordpress.com/2012/12/mocha.jpg"}]
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
