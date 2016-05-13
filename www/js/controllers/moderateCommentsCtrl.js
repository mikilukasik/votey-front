app.controller('moderateCommentsCtrl', function($rootScope, $scope, apiService, errorService) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.getCommentsToReview();
  });
  
  $scope.getCommentsToReview = function() {
    $rootScope.spinIt = true;
    apiService.getCommentsToReview().then(function(res) {
      $rootScope.spinIt = false;
      $rootScope.comments = res.data;
      console.log(res.data)
    }, function(err) {
      $rootScope.spinIt = false;
      errorService.dealWithError(err);
    });
  };

  $scope.moderateComment = {
    approve: function(comment) {
      apiService.approveComment(comment.questionId, comment.id).then($scope.getCommentsToReview, function(err) {
        errorService.dealWithError(err);
      });
    },

    disapprove: function(comment) {
      apiService.disapproveComment(comment.questionId, comment.id).then($scope.getCommentsToReview, function(err) {
        errorService.dealWithError(err);
      });
    }
  }


})