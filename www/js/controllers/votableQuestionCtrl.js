app.controller('votableQuestionCtrl', function($rootScope, $scope, $stateParams, $ionicPopup, $filter, $location, apiService, errorService, classesService) {

  $scope.postCommentObj = {};
  $scope.question = {};
  //$scope.question.comments = [];

  $scope.questionId = $stateParams.votableId;
  $rootScope.toConsole('$scope.questionId', $stateParams.votableId);

  $scope.updateQuestions= function() {
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
  };
    

  $scope.init = function(){

    $scope.updateQuestions();

  };

  $scope.postComment = function (){
    $scope.postCommentObj.comment && apiService.postComment($scope.question, $scope.postCommentObj.comment).then(function(result){
      $scope.question.comments.push($scope.postCommentObj.comment)
      $scope.postCommentObj.comment = '';
    })
  };

  $scope.postComment = function (){

    var newComment = new classesService.comment({
      text: $scope.postCommentObj.comment,
      questionId: $scope.question._id
    })

    $scope.postCommentObj.comment && apiService.postComment($scope.question, newComment).then(function(result){
      // $scope.question.comments.push(newComment);
      return apiService.getQuestion($scope.questionId);
      
    }).then(function(result){
      $scope.question = result.data;
      $scope.postCommentObj.comment = '';
    });
  };

  $scope.questionOptions = {

    report: function(question){
      
      $ionicPopup.confirm({
        title: $filter('translate')('Are you sure you want to report this question for being inappropriate?', 'popUps'),
        cancelText: $filter('translate')('Cancel','labels'),
        okText: $filter('translate')('OK','labels')        
      }).then(function(confirmed){
        if(confirmed){

          apiService.reportQuestion(question).then(function(apiRes){
            $location.path( "/app/votables" );
          });

        }
      });

    },
  };

  $scope.commentOptions = {

    remove: function(question, comment){
      
      $ionicPopup.confirm({
        title: $filter('translate')('Are you sure you want to remove this comment?','popUps'),
        cancelText: $filter('translate')('Cancel','labels'),
        okText: $filter('translate')('OK','labels')         
      }).then(function(confirmed){
        if(confirmed){

          apiService.deleteComment(question, comment).then(function(apiRes){
            $scope.updateQuestions();
          })

        }
      });

    },

    edit: function(question, comment){
      comment.isEditing = true;
    },

    cancelEdit: function(question, comment){
      comment.isEditing = false;
    },

    save: function(question, comment){
      
          comment.isEditing = undefined;
          apiService.putComment(question, comment).then(function(apiRes){
            $scope.updateQuestions();
          })

    },

    report: function(question, comment){
      
      $ionicPopup.confirm({
        title: $filter('translate')('Are you sure you want to report this comment for being inappropriate?', 'popUps'),
        cancelText: $filter('translate')('Cancel','labels'),
        okText: $filter('translate')('OK','labels')        
      }).then(function(confirmed){
        if(confirmed){

          apiService.reportComment(question, comment).then(function(apiRes){
            $scope.updateQuestions();
          })


        }
      });

    },

  };

  $scope.init();
  
})