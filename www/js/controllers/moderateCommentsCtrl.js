app.controller('moderateCommentsCtrl', function($rootScope, $scope, apiService, errorService) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.getCommentsToReview();
  });
  
  $scope.getCommentsToReview = function() {
    $rootScope.spinIt = true;
    apiService.getCommentsToReview().then(function(res) {
      $rootScope.spinIt = false;
      $rootScope.comments = res.data;
    }, function(err) {
      $rootScope.spinIt = false;
      errorService.dealWithError(err);
    });
  };


})