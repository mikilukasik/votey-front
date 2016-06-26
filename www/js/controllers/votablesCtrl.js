app.controller('votablesCtrl', function($rootScope, $scope, $http, apiService, errorService) {
  $scope.$on('$ionicView.beforeEnter', function(e) {
    $scope.getVotableQuestions()
  });
  
  // TODO: use below to refresh next view during swipe, not after
  // $scope.$on('$ionicView.beforeLeave', function(e) {
  //   //$scope.getVotableQuestions()
  //   console.log('most')
  // });
  
  
  
  $scope.getVotableQuestions = function() {
    $rootScope.showLoading();
    apiService.getVotables().then(function(res) {
      $rootScope.hideLoading();
      $rootScope.votables = res.data;
    }, function(err) {
      $rootScope.hideLoading();
      errorService.dealWithError(err);
    });
  };

  

})