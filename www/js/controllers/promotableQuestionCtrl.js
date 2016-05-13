app.controller('promotableQuestionCtrl', function($rootScope, $scope, $stateParams, $ionicPopup, $location, $filter, modalService, apiService, errorService, classesService) {
  $scope.questionId = $stateParams.promotableId;

  $scope.postCommentObj = {};
  $scope.question = {};

  $rootScope.toConsole('$scope.questionId', $stateParams.promotableId);
  

  $scope.init = function(){

    $scope.updateQuestions();

  };

  $scope.updateQuestions = function (){

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
            $location.path( "/app/promoteQuestion" );
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