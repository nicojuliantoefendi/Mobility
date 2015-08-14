angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, User, $state){
	$scope.signIn = function(user) {
		 $scope.loginResult = User.login(user,
		  function(res) {
			console.log('Login success');
			console.log(res);
			$state.go('tab.dash');
			// success
		  }, function(res) {
			// error
		  });
	}
})

.filter('duration', function() {
  return function(input) {
	var diff = new Date(input.End_date).getTime() - new Date(input.Start_date).getTime();
    return (diff/(60*60*24*1000))+1;
  };
})

.controller('TripCtrl', function($scope, Trip, $ionicModal){
	$ionicModal.fromTemplateUrl('templates/new-trip.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
	$scope.openModal = function(){
		$scope.modal.show();
	}
	$scope.closeModal = function(){
		$scope.modal.hide();
	}
	$scope.save = function(trip){
		$scope.modal.hide();
		trip.created = Date.now();
		Trip.create(trip).$promise
        .then(function(trip) {
			console.log(trip);
			$scope.trip = {};
			$scope.trips = Trip.find();
	        });
	}
	$scope.trips = Trip.find();
})

.controller('AccountDetailsCtrl', function($scope) {

})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
