app.controller('addQuestionCtrl', function($rootScope, $scope, $filter, toastr, apiService, errorService) {
  $scope.addQuestionObj = {
    questionInput: ''
  }
  $scope.addQuestion = function() {
    $scope.question = $scope.addQuestionObj.questionInput;
    $rootScope.spinIt = true;
    apiService.postQuestion($scope.addQuestionObj.questionHeader, $scope.addQuestionObj.question).then(function(res) {
        $rootScope.spinIt = false;
        $scope.addQuestionObj.question = ''; //clears input in view
        $scope.addQuestionObj.questionHeader = ''; //clears input in view
      },
      function(err) {
        $rootScope.spinIt = false;
        errorService.dealWithError(err);
      })
  }
});