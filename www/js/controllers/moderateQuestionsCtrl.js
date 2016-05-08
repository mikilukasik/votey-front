app.controller('moderateQuestionsCtrl', function($rootScope, $scope, apiService, errorService) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.getQuestionsToReview();
  });
  
  $scope.getQuestionsToReview = function() {
    $rootScope.spinIt = true;
    apiService.getQuestionsToReview().then(function(res) {
      $rootScope.spinIt = false;
      $rootScope.questions = res.data;
    }, function(err) {
      $rootScope.spinIt = false;
      errorService.dealWithError(err);
    });
  };
  


})