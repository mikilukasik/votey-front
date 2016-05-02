app.controller('promotableQuestionCtrl', function($rootScope, $scope, $stateParams, apiService, errorService) {
  $scope.questionId = $stateParams.promotableId;
  $rootScope.toConsole('$scope.questionId', $stateParams.promotableId);
  $rootScope.spinIt = true;
  apiService.getQuestion($scope.questionId).then(function(result) {
    var question = result.data;
    $rootScope.spinIt = false;
    $rootScope.toConsole('question received', question)
    $scope.question = question;
  }, function(err) {
    errorService.dealWithError(err);
    $rootScope.spinIt = false;
  })
  
})