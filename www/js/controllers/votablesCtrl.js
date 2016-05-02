app.controller('votablesCtrl', function($rootScope, $scope, $http, apiService, errorService) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.getVotableQuestions()
  });
  $scope.getVotableQuestions = function() {
    $rootScope.spinIt = true;
    apiService.getVotables().then(function(res) {
      $rootScope.spinIt = false;
      $scope.votables = res.data;
    }, function(err) {
      $rootScope.spinIt = false;
      errorService.dealWithError(err);
    });
  };

  $rootScope.vote = {
    up: function(question) {
      $rootScope.spinIt = true;
      apiService.postVote({
        clientMongoId: $rootScope.clientMongoId,
        questionId: question._id,
        voting: true
      }).then(function(res) {
        $rootScope.spinIt = false;

        if(res.success){
          if(question.previousVote === 'no') question.voteDown--;
          question.voteUp++;
          question.previousVote = 'yes';
        }

        $rootScope.toConsole(res)
      }, function(err) {
        $rootScope.spinIt = false;
        errorService.dealWithError(err);
      })
    },
    down: function(question) {
      $rootScope.spinIt = true;
      apiService.postVote({
        clientMongoId: $rootScope.clientMongoId,
        questionId: question._id,
        voting: false
      }).then(function(res) {
        $rootScope.spinIt = false;

        if(res.success){
          if(question.previousVote === 'yes') question.voteUp--;
          question.voteDown++;
          question.previousVote = 'no';
        }

        $rootScope.toConsole(res)
      }, function(err) {
        $rootScope.spinIt = false;
        errorService.dealWithError(err);
      })
    }
  };

})