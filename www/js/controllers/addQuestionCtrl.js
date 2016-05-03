app.controller('addQuestionCtrl', function($rootScope, $scope, $filter, toastr, apiService, errorService) {
  $scope.addQuestionObj = {
    questionInput: ''
  }
  $scope.addQuestion = function() {
    $scope.question = $scope.addQuestionObj.body;
    $rootScope.spinIt = true;
    apiService.postQuestion($scope.addQuestionObj.header, $scope.addQuestionObj.question).then(function(res) {
        $rootScope.spinIt = false;
        $scope.addQuestionObj.body = ''; //clears input in view
        $scope.addQuestionObj.header = ''; //clears input in view
      },
      function(err) {
        $rootScope.spinIt = false;
        errorService.dealWithError(err);
      })
  }
});