app.controller('votablesCtrl', function($rootScope, $scope, $http, apiService, errorService) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.getVotableQuestions()
  });
  $scope.getVotableQuestions = function() {
    $rootScope.spinIt = true;
    return apiService.getVotables().then(function(res) {
      $rootScope.spinIt = false;
      $rootScope.votables = res.data;
    }, function(err) {
      $rootScope.spinIt = false;
      errorService.dealWithError(err);
    });
  };

  $scope.doRefresh = function() {
    $scope.getVotableQuestions()
     .then(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
   };
  

})