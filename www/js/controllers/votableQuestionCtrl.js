app.controller('votableQuestionCtrl', function($rootScope, $scope, $stateParams, apiService, errorService) {

  $scope.postCommentObj = {};
  $scope.question = {};
  //$scope.question.comments = [];

  $scope.questionId = $stateParams.votableId;
  $rootScope.toConsole('$scope.questionId', $stateParams.votableId);
  $rootScope.spinIt = true;
  apiService.getQuestion($scope.questionId).then(function(result) {
    var question = result.data;
    $rootScope.spinIt = false;
    $rootScope.toConsole('question received', question)
    $scope.question = question;
    //if(!$scope.question.comments) $scope.question.comments = [];
  }, function(err) {
    $rootScope.spinIt = false;
    errorService.dealWithError(err);
  });

  $scope.postComment = function (){
    $scope.postCommentObj.comment && apiService.postComment($scope.question, $scope.postCommentObj.comment).then(function(result){
      $scope.question.comments.push($scope.postCommentObj.comment)
      $scope.postCommentObj.comment = '';
    })
  };
  
})