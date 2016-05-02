app.controller('votableQuestionCtrl', function($rootScope, $scope, $stateParams, apiService, errorService) {
  $scope.questionId = $stateParams.votableId;
  $rootScope.toConsole('$scope.questionId', $stateParams.votableId);
  $rootScope.spinIt = true;
  apiService.getQuestion($scope.questionId).then(function(result) {
    var question = result.data;
    $rootScope.spinIt = false;
    $rootScope.toConsole('question received', question)
    $scope.question = question;
  }, function(err) {
    $rootScope.spinIt = false;
    errorService.dealWithError(err);
  })
  
})